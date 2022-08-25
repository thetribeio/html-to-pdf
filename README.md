# html-to-pdf
this is an API that can be used to generate a PDF from a source file.

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

You then will be able to make a `POST` request to `localhost:3000` with HTML data and the response will generate a PDF for you.
