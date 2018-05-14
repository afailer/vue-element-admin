FROM nginx
EXPOSE 80
ENV UAA_URL http://ms-uaa-srv-new.hiacloud-security:8089
COPY dist/ /opt/apps/hiacloud-authorization-ui
COPY nginx.conf /etc/nginx/nginx-template.conf
CMD envsubst '$UAA_URL ' < /etc/nginx/nginx-template.conf > /etc/nginx/nginx.conf && nginx -g 'daemon off;'
