# is212-g5t7

Make sure you have [Node.js](https://nodejs.org/en/) and [yarn](https://yarnpkg.com/getting-started/install) on your computer before building the project. If not, install it in this order.

## Demo

To log in as various types of users on `http://localhost:3000/login`, use the following credentials:

-   Admin (HR): jack.sim@allinone.com.sg
-   Manager: Eric.Loh@allinone.com.sg
-   Staff (User): Emma.Heng@allinone.com.sg

You may use any value for the password since the login is not actually validated.

## General Setup

Using Docker Compose in the root directory (to set up both client and server):

```
docker-compose build
docker-compose up
```

## Client

The Dockerfile isn't ready for the client yet; we'll set up our env via Node scripts first.

### Setup

Make sure you `cd` into the `client` directory before running the following commands.

### Setup

#### Via Docker

Build Docker image:

```
docker build -t is212-g5t7-client .
```

Run Docker container based on the built image:

```
docker run -d -p 3000:3000 --env-file=.env is212-g5t7-client
```

Note:
To stop a Docker container, run this to grab the ID of the container you have started running:

```
docker ps
```

After copying the ID, stop the container:

```
docker stop <CONTAINER_ID>
```

#### Via yarn

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
docker run -d -p 3001:3001 --env-file=.env is212-g5t7-server
```
