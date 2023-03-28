package store

import "Backend/internal/app/model"

type UserRepository interface {
	Create(*model.User) error
	FindByCredentials(string) (*model.User, error)
	FindById(int) (*model.User, error)
	GetAvatarURL(string) (string, error)
}
