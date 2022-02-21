FROM nginx
COPY dist /usr/share/nginx/html
COPY nginx-config/default.conf /etc/nginx/conf.d/
