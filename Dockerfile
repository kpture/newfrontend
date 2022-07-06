# Specify a base image
FROM node:18.3.0 as build-deps

# Create working directory and copy the app before running yarn install as the artifactory
# credentials can be inside .npmrc
WORKDIR /usr/src/app
COPY . ./
# Run yarn install
RUN yarn install
# Start the application
CMD yarn start 