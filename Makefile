.PHONY: help install build run test lint clean migrate seed

PYTHON = python
PIP = pip
NPM = npm
DOCKER_COMPOSE = docker-compose

help:
	@echo "FloraGuard Platform Management Commands:"
	@echo "  make install       - Install backend and frontend dependencies"
	@echo "  make build         - Build Docker images and frontend assets"
	@echo "  make run           - Run full stack using docker-compose"
	@echo "  make run-backend   - Run FastAPI development server"
	@echo "  make run-frontend  - Run Vite frontend development server"
	@echo "  make test          - Run Pytest test suite with coverage"
	@echo "  make lint          - Run linters and type checkers"
	@echo "  make migrate       - Apply database migrations"
	@echo "  make seed          - Seed plant disease knowledge database"
	@echo "  make clean         - Clean temporary cache and build artifacts"

install:
	$(PIP) install -r requirements.txt
	cd frontend && $(NPM) install

build:
	$(DOCKER_COMPOSE) build
	cd frontend && $(NPM) run build

run:
	$(DOCKER_COMPOSE) up -d

run-backend:
	uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload

run-frontend:
	cd frontend && $(NPM) run dev

test:
	pytest --cov=backend --cov=ml_engine tests/ -v

lint:
	flake8 backend ml_engine tests
	mypy backend ml_engine

migrate:
	alembic upgrade head

seed:
	$(PYTHON) backend/database/seed_data.py

clean:
	find . -type d -name __pycache__ -exec rm -rf {} +
	find . -type f -name "*.pyc" -delete
	rm -rf .pytest_cache .coverage htmlcov frontend/dist
