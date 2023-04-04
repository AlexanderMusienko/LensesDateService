.PHONY: build
build:
	go build -v -o ../ ../cmd/apiserver

.PHONY: test
test:
	go test -v -race -timeout 40s ./...


.DEFAULT_GOAL := build	


