FROM nginx:alpine

# Remove a pagina padrao do nginx
RUN rm -rf /usr/share/nginx/html/*

# Configuracao: pagina 404 do site, cache e gzip
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia o site estatico
COPY . /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
