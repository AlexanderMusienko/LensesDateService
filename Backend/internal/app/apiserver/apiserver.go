package apiserver

import (
	"Backend/internal/app/store"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/sirupsen/logrus"
)

type APIServer struct {
	config *Config
	logger *logrus.Logger
	router *mux.Router
	store  *store.Store
}

func New(config *Config) *APIServer {
	return &APIServer{
		config: config,
		logger: logrus.New(),
		router: mux.NewRouter(),
		store: store.New(store.NewConfig()),
	}
}

func (s *APIServer) Start() error {

	if err := s.configureLogger(); err != nil {
		return err
	}

	s.configureRouter()

	if err := s.configureStore(); err != nil {
		return err
	}

	s.logger.Info("starting api server")

	return http.ListenAndServe(s.config.BindAddr, s.router)
}

func (s *APIServer) configureLogger() error {

	level, err := logrus.ParseLevel(s.config.LogLevel)

	if err != nil {
		return err
	}

	s.logger.SetLevel(level)

	return nil
}

func (s *APIServer) configureStore() error {
	st := store.New(s.config.Store)
	if err := store.Open(st); err != nil {
		return err
	}

	s.store = st

	return nil
}

func (s *APIServer) configureRouter() {
	s.router.HandleFunc("/hello", s.handleHello())
	s.router.HandleFunc("/poster", s.handlePOST())
	

}

func (s *APIServer) handleHello() http.HandlerFunc {

	//...

	return func(w http.ResponseWriter, r *http.Request) {

		fileBytes, err := ioutil.ReadFile("test.png")
		if err != nil {
			panic(err)
		}

		w.WriteHeader(http.StatusOK)
		w.Header().Set("Content-Type", "application/octet-stream")
		w.Write(fileBytes)

		s.logger.Info("кто то хочет пива")
	}
}

func (s *APIServer) handlePOST() http.HandlerFunc {

	//...

	return func(w http.ResponseWriter, r *http.Request) {




		var p struct{
			Email string
			Login string
			Password string
		}

		// Try to decode the request body into the struct. If there is an error,
		// respond to the client with the error message and a 400 status code.
		err := json.NewDecoder(r.Body).Decode(&p)
		if err != nil {
			fmt.Println(err.Error())
			return
		}
	
		// Do something with the Person struct...
		fmt.Println("Email: "+p.Email+"\n")
		fmt.Println("Login: "+p.Login+"\n")
		fmt.Println("Password: "+p.Password+"\n")



	
	}

}
