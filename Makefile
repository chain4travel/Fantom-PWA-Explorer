.PHONY: all
all: container

# Before build the app config has to be changed to meet the needs - e.g. change the provider url! 
.PHONY: build
build:
	docker run --rm --user $$(id -u):$$(id -g) -v $(PWD):/src -w /src node:14.19.0 bash -c \
		'export NPM_CONFIG_PREFIX=~; npm install --no-save; npm run build'

.PHONY: container
container: build
	docker build -t camino-frontend-nginx .

.PHONY: localrun
localrun: container
	docker stop camino-frontend && docker rm camino-frontend || true
	docker run --name camino-frontend -d -p 8080:80 camino-frontend-nginx 
