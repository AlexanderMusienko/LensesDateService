package apiserver

import (
	"Backend/internal/app/store/sqlstore"
	"database/sql"
	"net/http"
	"os"
	"strings"

	"github.com/gorilla/sessions"
)

func Start(config *Config) error {
	if host:= os.Getenv("HOST"); host != "" {
		config.DatabaseURL = strings.Replace(config.DatabaseURL,"localhost:3306",host +":3350",1) 
	}

	db, err := newDB(config.DatabaseURL)
	if err != nil {
		return err
	}
	
	defer db.Close()
	store := sqlstore.New(db)
	sessionStore := sessions.NewCookieStore([]byte(config.SessionsKey))
	srv:= newServer(store, sessionStore)
	srv.logger.Info("server is up")

	return http.ListenAndServe(config.BindAddr, srv)
}

func newDB(databaseURL string) (*sql.DB, error) {
	db, err := sql.Open("mysql", databaseURL)
	if err != nil {
		return nil, err
	}

	if err := db.Ping(); err != nil {
		return nil, err
	}

	return db, nil
}