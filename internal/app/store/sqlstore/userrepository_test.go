package sqlstore_test

import (
	"Backend/internal/app/model"
	"Backend/internal/app/store"
	"Backend/internal/app/store/sqlstore"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestUserRepository_Create(t *testing.T) {
	db, teardown := sqlstore.TestDB(t, databaseURL)
	defer teardown("users")
	s := sqlstore.New(db)

	u := model.TestUser(t)
	assert.NoError(t, s.User().Create(u))
	assert.NotNil(t, u)
}

func TestUserRepository_FindByCredentials(t *testing.T) {
	db, teardown := sqlstore.TestDB(t, databaseURL)
	defer teardown("users")
	s := sqlstore.New(db)

	email := "user@test.ru"
	_, err := s.User().FindByCredentials(email)
	assert.EqualError(t, err, store.ErrRecordNotFound.Error())

	u := model.TestUser(t)
	u.Email = email
	s.User().Create(u)

	u, err = s.User().FindByCredentials(email)
	assert.NoError(t, err)
	assert.NotNil(t, u)

}

func TestUserRepository_FindById(t *testing.T) {
	db, teardown := sqlstore.TestDB(t, databaseURL)
	defer teardown("users")
	s := sqlstore.New(db)

	id := 9999
	_, err := s.User().FindById(id)
	assert.EqualError(t, err, store.ErrRecordNotFound.Error())

	u := model.TestUser(t)
	s.User().Create(u)

	u, err = s.User().FindById(u.ID)
	assert.NoError(t, err)
	assert.NotNil(t, u)

}