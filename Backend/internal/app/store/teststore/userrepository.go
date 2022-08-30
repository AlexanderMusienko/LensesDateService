package teststore

import (
	"Backend/internal/app/model"
	"Backend/internal/app/store"
)

type UserRepository struct {
	store *Store
	users map[string]*model.User
}

func (r *UserRepository) Create(u *model.User) error {
	if err := u.Validate(); err != nil {
		return err
	}

	if err := u.BeforeCreate(); err != nil {
		return err
	}

	r.users[u.Email] = u
	r.users[u.Login] = u
	u.ID = len(r.users)

	return nil
}

func (r *UserRepository) FindByCredentails(credentialString string) (*model.User, error) {
	u, ok := r.users[credentialString]
	if !ok {
		return nil, store.ErrRecordNotFound
	}

	return u, nil

}
