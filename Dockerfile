# Stage 1: Budowanie aplikacji w Angularze
FROM node:20.10.0-alpine as build
WORKDIR /app
COPY package*.json ./
COPY . .
RUN npm ci
RUN npm run build --prod

# Stage 2: Serwowanie aplikacji za pomocą Nginx
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/easyrent /usr/share/nginx/html
COPY --from=build /app/dist/easyrent/browser /usr/share/nginx/html
EXPOSE 80
