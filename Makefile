
install:
	yarn install

run:
	yarn dev


docker-build:
	docker build -t appliq-frontend .

docker-run:
	docker run -p 8080:80 appliq-frontend

docker-up:
	docker-compose up

docker-down:
	docker-compose down

.DEFAULT_GOAL := install
