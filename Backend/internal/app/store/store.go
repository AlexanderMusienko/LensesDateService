package store

import (
	"database/sql"

	_ "github.com/go-sql-driver/mysql"
)

type Store struct {
	config *Config
	db     *sql.DB
}

func New(config *Config) *Store {
	return &Store{
		config: config,
		
	}
}

func Open(s *Store) error {
	db, err := sql.Open("mysql", s.config.DatabaseURL)
	if err != nil {
		return err
	}

	if err := db.Ping(); err != nil {
		return err
	}

	s.db = db

	return nil
}

func Close(s *Store) {
	s.db.Close()
}