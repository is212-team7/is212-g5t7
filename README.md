# is212-g5t7

> :warning: **Docker Compose is not ready yet**

Make sure you have [Node.js](https://nodejs.org/en/) and [yarn](https://yarnpkg.com/getting-started/install) on your computer before building the project. If not, install it in this order.

## Client
The Dockerfile isn't ready for the client yet; we'll set up our env via Node scripts first.
### Setup 
Make sure you `cd` into the `client` directory before running the following commands.

Install the required node modules listed in `package.json`:
```
yarn
```
Start up the development environment:
```
yarn dev
```

Go to `http://localhost:3000` to see the client preview.

## Server
### Setup

#### 1. Initialise environment variables
There is a mock file for environment variables: `.env.example`.

Duplicate the above file into `.env` and replace the values for each variable on each line.

#### 2. Start the server
There are two ways to set this up in development mode (i.e. manually via a Node script or via Docker).

Make sure you `cd` into the `server` directory before running the following commands.

##### Via Node script
Install the required node modules listed in `package.json`:
```
yarn
```
Start up the development environment:
```
yarn dev
```

##### Via Docker
Make sure Docker has already started running on your computer.

Build Docker image:
```
docker build -t is212-g5t7-server .
```
Run Docker container based on the built image:
```
docker run -p 3001:3001 --env-file=.env is212-g5t7-server  
```
