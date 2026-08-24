#===========================
# BASE
#===========================
#Imagen base
FROM node:18-alpine as base
WORKDIR /app
COPY package*.json ./

#===========================
# DEV
#===========================
FROM base AS dev
RUN npm ci
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]

#===========================
# PRODUCCIÓN
#===========================
FROM base AS builder
RUN npm ci
COPY . .
RUN npm run build

#===========================
# ETAPA FINAL
#===========================
FROM nginx:alpine AS prod
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["ngnix", "-g", "daemon off;"]