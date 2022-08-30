package apiserver

import (
	"Backend/internal/app/model"
	"Backend/internal/app/store/teststore"
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestServer_handleUsersCreate(t *testing.T) {
	s := newServer(teststore.New())
	testCases := []struct {
		name string
		payload interface{}
		exceptedCode int
	}{
		{
			name: "valid",
			payload: map[string]string{
				"email": "user@example.ru",
				"login": "testUser",
				"password": "password",
			},
			exceptedCode: http.StatusCreated,
		},
		{
			name: "invalid payload",
			payload: "invalid",
			exceptedCode: http.StatusBadRequest,
		},
		{
			name: "valid",
			payload: map[string]string{
				"email": "invalid",
				"login": "testUser",
			},
			exceptedCode: http.StatusUnprocessableEntity,
		},
	}

	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			rec := httptest.NewRecorder()
			b := &bytes.Buffer{}
			json.NewEncoder(b).Encode(tc.payload)
			req, _ := http.NewRequest(http.MethodPost, "/users", b)
			s.ServeHTTP(rec, req)
			assert.Equal(t, tc.exceptedCode, rec.Code)
		})
	}
}

func TestServer_handleSessionCreate(t *testing.T) {
	u := model.TestUser(t)
	store := teststore.New()
	store.User().Create(u)
	s := newServer(store)

	fmt.Println(u.Email)
	fmt.Println(u.Password)

	testCases := []struct {
		name string
		payload interface{}
		expectedCode int
	}{
		{
			name: "valid with email",
			payload: map[string]string{
				"login": u.Email,
				"password": u.Password,
			},
			expectedCode: http.StatusOK,			
		},
		{
			name: "valid with login",
			payload: map[string]string{
				"login": u.Login,
				"password": u.Password,
			},
			expectedCode: http.StatusOK,	
		},
	}

	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			rec := httptest.NewRecorder()
			b := &bytes.Buffer{}
			json.NewEncoder(b).Encode(tc.payload)
			req, _ := http.NewRequest(http.MethodPost, "/sessions", b)
			s.ServeHTTP(rec, req)
			assert.Equal(t, tc.expectedCode, rec.Code)
		})
	}
}