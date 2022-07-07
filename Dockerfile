# Specify a base image
FROM node:18.3.0 as build

# Create working directory and copy the app before running yarn install as the artifactory
# credentials can be inside .npmrc
WORKDIR /usr/src/app
COPY . ./
# Run yarn install
RUN yarn config set network-timeout 600000 -g

RUN yarn install
# Start the application
RUN yarn build


FROM golang:1.18-alpine as server
WORKDIR /app
COPY ./backend/  /app/
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -ldflags '-extldflags "-static"' -o server /app/


FROM golang:1.18-alpine  as production
# Copy application binary from build/dev stage to the distroless container
WORKDIR /app/
COPY --from=server /app/server /app/server
COPY --from=build /usr/src/app/build /app/build

# Application port (optional)
EXPOSE 8080

# Container start command for production
CMD ["/app/server"]
