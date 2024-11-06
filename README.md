# aggregation-service

## Run the code yourself

Run the dev server with:

```
npm run dev
```

To build the code run:

```
npm run build
```

To start the server based on the build:

```
npm start
```

### Thoughts

- Start with defining the API, ideally Swagger, here just using the request and response TS types.

- Need internal db (transaction API can only be called 5 times a min)

- Call the transaction API every 15 seconds and ingest batch into internal db, pagination to not miss any transactions (if there was burst of transaction during a time interval as we can only fetch 1000 items per request)

-
