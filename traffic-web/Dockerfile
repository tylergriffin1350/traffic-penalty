FROM node:23-slim as builder
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
COPY app /app
WORKDIR /app
RUN npm install
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/out /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf