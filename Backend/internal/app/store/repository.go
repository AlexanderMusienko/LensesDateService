package store

import "Backend/internal/app/model"

type UserRepository interface {
	Create(*model.User) error
	FindByCredentails(string) (*model.User, error)
}
