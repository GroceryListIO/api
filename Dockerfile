FROM node:latest

EXPOSE 8080

# Install and build api
RUN mkdir -p /app/api
WORKDIR /app/api
COPY . /app/api
RUN rm -rf ./node_modules && npm install

# Start api
CMD ["npm","start"]
