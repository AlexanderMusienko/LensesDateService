package model

import (
	validation "github.com/go-ozzo/ozzo-validation"
	"github.com/go-ozzo/ozzo-validation/is"
	"golang.org/x/crypto/bcrypt"
)

type User struct {
	ID                int    `json:"id"`
	Login             string `json:"login"`
	Email             string `json:"email"`
	Password          string `json:"password,omitempty"`
	EncryptedPassword string `json:"-"`
}

func (u *User) Validate() error {
	return validation.ValidateStruct(
		u,
		validation.Field(&u.Email, validation.Required, is.Email),
		validation.Field(&u.Password, validation.By(requiredIf(u.EncryptedPassword == "")), validation.Length(6, 50)),
		validation.Field(&u.Login, validation.Required, validation.Length(4, 30)),
	)
}

func (u *User) BeforeCreate() error {
	if len(u.Password) > 0 {
		enc, err := encryptString(u.Password)
		if err != nil {
			return err
		}

		u.EncryptedPassword = enc

	}

	return nil

}

func (u *User) Sanitize() {
	u.Password = ""
}

func (u *User) ComparePasswords(password string) bool {
	return bcrypt.CompareHashAndPassword([]byte(u.EncryptedPassword),[]byte(password)) == nil
}

func encryptString(s string) (string, error) {
	b, err := bcrypt.GenerateFromPassword([]byte(s), bcrypt.MinCost)
	if err != nil {
		return "", nil
	}

	return string(b), nil
}
