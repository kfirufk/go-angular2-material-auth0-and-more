package cert

import (
	"crypto/tls"
	"log"
	"crypto/x509"
	"io/ioutil"
	"../config"
)

var TlsConfig *tls.Config;

func init() {
	certpool := x509.NewCertPool()
	for _, crFile := range config.CfgIni.OtherCertificates {
		pem, err := ioutil.ReadFile(crFile)
		if err != nil {
			log.Fatalf("Failed to read client certificate authority: %v", err)
		}
		if !certpool.AppendCertsFromPEM(pem) {
			log.Fatalf("Can't parse client certificate authority")
		}
	}

	TlsConfig = &tls.Config{
		ClientCAs:    certpool,
	}
	TlsConfig.BuildNameToCertificate()
}
