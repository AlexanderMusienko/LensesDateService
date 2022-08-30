package sqlstore

import (
	"Backend/internal/app/model"
	"Backend/internal/app/store"
	"database/sql"
)

type UserRepository struct {
	store *Store
}

func (r *UserRepository) Create(u *model.User) error {
	if err := u.Validate(); err != nil {
		return err
	}

	if err := u.BeforeCreate(); err != nil {
		return err
	}

	res, err := r.store.db.Exec(
		"INSERT INTO users(login,email,encrypted_password) VALUES(?,?,?)",
		u.Login,
		u.Email,
		u.EncryptedPassword,
	)	
	if err != nil {
		return err
	}

	lastID, err := res.LastInsertId()
	if err != nil {
		return err
	}
	u.ID = int(lastID)

	return nil
}

func (r *UserRepository) FindByCredentails(credentialString string) (*model.User, error) {
	u := &model.User{}
	if err := r.store.db.QueryRow(
		"SELECT id, email, login, encrypted_password FROM users WHERE email = ? OR login = ?",
		credentialString,
		credentialString,
	).
		Scan(
		&u.ID,
		&u.Email,
		&u.Login,
		&u.EncryptedPassword,
	); err != nil {
		if err == sql.ErrNoRows {
			return nil, store.ErrRecordNotFound
		}

		return nil, err
	}

	return u, nil
}
