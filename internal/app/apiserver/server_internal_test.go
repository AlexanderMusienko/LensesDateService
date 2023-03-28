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

	"github.com/gorilla/securecookie"
	"github.com/gorilla/sessions"
	"github.com/stretchr/testify/assert"
)

func TestServer_AuthenticateUser(t *testing.T) {
	store := teststore.New()
	u := model.TestUser(t)
	store.User().Create(u)


	testCases := []struct{
		name string
		cookieValue map[interface{}]interface{} 
		expectedCode int
	}{
		{
			name: "authenticated",
			cookieValue: map[interface{}]interface{}{
				"user_id": u.ID,

			},
			expectedCode: http.StatusOK,

		},
		{
			name: "not authenticated",
			cookieValue: nil,
			expectedCode: http.StatusUnauthorized,

		},
	}

	secretKey := []byte("secret")
	s:= newServer(store, sessions.NewCookieStore(secretKey))
	sc := securecookie.New(secretKey, nil)
	handler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
	})

	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			rec := httptest.NewRecorder()
			req, _ := http.NewRequest(http.MethodGet, "/", nil)
			cookieStr, _ := sc.Encode(sessionName, tc.cookieValue)
			req.Header.Set("Cookie", fmt.Sprintf("%s=%s", sessionName, cookieStr))
			s.authenticateUser(handler).ServeHTTP(rec, req)
			assert.Equal(t, tc.expectedCode, rec.Code)
		})
	}
}

func TestServer_handleUsersCreate(t *testing.T) {
	s := newServer(teststore.New(), sessions.NewCookieStore([]byte("secret")))
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
	s := newServer(store, sessions.NewCookieStore([]byte("secret")))

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