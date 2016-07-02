package config

import (
	"log"
	"github.com/go-ini/ini"
)

const (
	configIniPath string = "config/config.ini"
)

type SslCert struct {
	CertificateFile string
	PrivateKeyFile string
}

type Server struct {
	IsProduction bool
	ServerName string
}

type NewRelic struct {
	Licensekey string
	AppName string
	AccountDomain string
}

type WebServer struct {
	HttpsPort uint64
	ReadTimeout uint
	WriteTimeout uint
}

type ConfigIni struct {
	SslCert
	Server
	NewRelic
	WebServer
}

var CfgIni *ConfigIni

func parseIni(configIniPath string) (*ConfigIni) {
	cfg, err := ini.Load(configIniPath);
	if (err != nil) {
		log.Fatalf("error loading config.ini: %v", err);
	}
	cfgIni := new(ConfigIni);
	err = cfg.MapTo(cfgIni);
	if (err != nil) {
		log.Fatalf("error parsing config.ini: %v", err);
	}
	return cfgIni
}

func init() {
	CfgIni = parseIni(configIniPath);
}
