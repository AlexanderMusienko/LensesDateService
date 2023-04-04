package apiserver

import (
	"Backend/internal/app/store/sqlstore"
	"database/sql"
	"errors"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/gorilla/sessions"
	"github.com/sirupsen/logrus"
)

func Start(config *Config) error {
	if host := os.Getenv("HOST"); host != "" {
		config.DatabaseURL = strings.Replace(config.DatabaseURL, "localhost:3350", host+":3306", 1)
	}

	db, err := newDB(config.DatabaseURL)
	if err != nil {
		return err
	}

	defer db.Close()
	store := sqlstore.New(db)
	sessionStore := sessions.NewCookieStore([]byte(config.SessionsKey))
	srv := newServer(store, sessionStore)
	srv.logger.Info("server is up")

	return http.ListenAndServe(config.BindAddr, srv)
}

func newDB(databaseURL string) (*sql.DB, error) {
	db, err := sql.Open("mysql", databaseURL)
	if err != nil {
		return nil, err
	}

	maxRetries := 10
	retryInterval := time.Second * 3

	for i := 0; i < maxRetries; i++ {
		err := db.Ping()
		if err == nil {
			return db, nil
		}
		logrus.Info(err.Error() + " Trying again")

		time.Sleep(retryInterval)
	}

	return nil, errors.New("failed to connect to database after several retries")

}
