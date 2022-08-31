package teststore

import (
	"Backend/internal/app/model"
	"Backend/internal/app/store"
)

type UserRepository struct {
	store *Store
	users map[int]*model.User
}

func (r *UserRepository) Create(u *model.User) error {
	if err := u.Validate(); err != nil {
		return err
	}

	if err := u.BeforeCreate(); err != nil {
		return err
	}

	u.ID = len(r.users) + 1
	r.users[u.ID] = u
	
	return nil
}

func (r *UserRepository) FindByCredentials(credentialString string) (*model.User, error) {
	for _, u := range r.users {
		if u.Email == credentialString || u.Login == credentialString {
			return u, nil
		}
	}

	return nil, store.ErrRecordNotFound

}

func (r *UserRepository) FindById(id int) (*model.User, error) {
	u, ok := r.users[id]
	if !ok {
		return nil, store.ErrRecordNotFound
	}

	return u, nil

}
