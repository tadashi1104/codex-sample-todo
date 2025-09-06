.PHONY: dev dev-backend dev-frontend build clean

dev:
	set -e; trap 'kill 0' EXIT; \
	npm run -w @app/backend start:dev & \
	npm run -w @app/frontend dev

dev-backend:
	npm run dev:backend

dev-frontend:
	npm run dev:frontend

build:
	npm run build

clean:
	rm -rf node_modules apps/**/node_modules apps/**/dist
