install-frontend:
	chmod +x frontend/install.sh
	chmod +x frontend/run.sh
	cd frontend && ./install.sh

install: install-frontend

run-frontend:
	cd frontend && ./run.sh

.DEFAULT_GOAL := install
