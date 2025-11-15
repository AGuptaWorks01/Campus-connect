# ---------- Stage 1: Build Angular App ----------
FROM node:23 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build -- --configuration production

# ---------- Stage 2: Serve with NGINX ----------
FROM nginx:stable-alpine

COPY --from=build /app/dist/campus-client/browser /usr/share/nginx/html

# COPY custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
