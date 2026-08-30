FROM nginx:alpine

# Remove a pagina padrao do nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia o site. O nginx.conf precisa vir junto no contexto do build,
# por isso ele NAO pode entrar no .dockerignore.
COPY . /usr/share/nginx/html

# Move a config para o lugar certo e tira os arquivos de build do diretorio publico
RUN mv /usr/share/nginx/html/nginx.conf /etc/nginx/conf.d/default.conf && rm -f /usr/share/nginx/html/Dockerfile /usr/share/nginx/html/.dockerignore

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
