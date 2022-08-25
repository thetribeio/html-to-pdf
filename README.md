# html-t-pdf
this is a api that can be used to generate a pdf from a source file.

## how to use

### local

install packages
```
yarn
```

run server

```
yarn start
```

### with docker
run `docker-compose`
```
docker-compose up -d
```

### api

server will start on port `3000`.

You then will be able to make a `POST` request to `localhost:3000` with HTML data and the response will generate a pdf for you.
