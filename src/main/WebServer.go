package main

import (
	"log"
	"strconv"
	"../config"
	"net/http"
	"github.com/urfave/negroni"
	"github.com/phyber/negroni-gzip/gzip"
	"github.com/unrolled/secure"
	"time"
	"github.com/gorilla/mux"
	"github.com/jingweno/negroni-gorelic"
)

var secureMiddleware *secure.Secure = secure.New(secure.Options{
	IsDevelopment: !config.CfgIni.IsProduction,
	SSLRedirect:           true,
	SSLHost:               config.CfgIni.ServerName,
	SSLProxyHeaders:       map[string]string{"X-Forwarded-Proto": "https"},
	STSSeconds:            315360000,
	STSIncludeSubdomains:  true,
	STSPreload:            true,
	FrameDeny:             true,
	ContentTypeNosniff:    true,
	BrowserXssFilter:      true,
	ContentSecurityPolicy: "default-src 'self'; img-src 'self' cdn.auth0.com; connect-src 'self' " + config.CfgIni.AccountDomain + ";style-src 'self' 'unsafe-inline' fonts.googleapis.com; font-src 'self' fonts.gstatic.com;script-src 'self' 'unsafe-eval' cdn.auth0.com;",
	PublicKey:             `pin-sha256="base64+primary=="; pin-sha256="base64+backup=="; max-age=5184000; includeSubdomains; report-uri="https://www.example.com/hpkp-report"`,
})

func notFound(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "client/www/index.html")
}

func main() {
	log.Print("started web server...");
	httpsPortStr := ":" + strconv.FormatUint(config.CfgIni.HttpsPort, 10)
	log.Printf("starting https web server at port %v", config.CfgIni.HttpsPort)
	r := mux.NewRouter()
	r.PathPrefix("/node_modules/").Handler(http.StripPrefix("/node_modules", http.FileServer(http.Dir(("node_modules")))))
	r.PathPrefix("/dist/").Handler(http.StripPrefix("/dist", http.FileServer(http.Dir(("dist")))))
	r.PathPrefix("/ts/").Handler(http.StripPrefix("/ts", http.FileServer(http.Dir(("client/ts")))))
	r.PathPrefix("/www/").Handler(http.StripPrefix("/www",http.FileServer(http.Dir("client/www"))))
	r.PathPrefix("/").HandlerFunc(notFound)
	n := negroni.New()
	n.Use(gzip.Gzip(gzip.DefaultCompression))
	n.UseHandler(r)
	n.Use(negroni.HandlerFunc(secureMiddleware.HandlerFuncWithNext))
	if config.CfgIni.IsProduction {
		n.Use(negronigorelic.New(config.CfgIni.Licensekey, config.CfgIni.AppName, true))
	}
	n.Use(negroni.NewLogger())
	n.Use(negroni.NewRecovery())
	srv := &http.Server{
		Addr: httpsPortStr,
		Handler: n,
		ReadTimeout: time.Duration(config.CfgIni.ReadTimeout) * time.Second,
		WriteTimeout: time.Duration(config.CfgIni.WriteTimeout) * time.Second,
	}
	err := srv.ListenAndServeTLS(config.CfgIni.CertificateFile,config.CfgIni.PrivateKeyFile)
	if err != nil {
		log.Fatalf("https server stopped with the following error: %v", err)
	} else {
		log.Print("https server stopped with no error")
	}

}
