# aggregation-service

## Run the code yourself

Install the dependencies.

```
npm install
```

Start with running the mock transaction server:

```
npm run start:transaction-server
```

Run the dev server with:

```
npm run dev
```

It will now, every 15 seconds, pick up the transactions. -> Important: see **Thoughts** below!

In your web browser, go to `http://localhost:3100/users/074092` or `http://localhost:3100/users/074093` to see the details of those users.

To see the updated values refresh after ca 20 seconds.

## Run tests and build

Run the tests:

```
npm run test
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

- Started with defining the API, ideally Swagger, here just using the request and response TS types.

- Need internal db (transaction API can only be called 5 times a min). Used an array to keep it very simple.

- Call the transaction API every 15 seconds and ingest batch of transactions into internal db.

- The mock server is very basic and always has the same transactions

- IMPORTANT: There was no time to implement pagination or filtering by a range of dates (from - to) for the transactions so therefore the same set of transactions is processed (and ingested into the db) every time... In real life there would of course be different transactions and we would need to ensure that we don't ingest the same transaction twice (check the transaction ID)
