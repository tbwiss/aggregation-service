# Testing strategy

The test coverage for our microservice should be like a pyramid. Unit tests are the base and a lot of them. The middle layer should be integration tests within the backend/microservice and then E2E tests should cover all API endpoints and possible interactions.
So for a small/medium sized microservice/backend one has unit tests for methods/functions, integration tests for a module (like a db access layer) and then E2E tests for all API endpoints.

Yet we are not done, there is one more piece: Release checks in the deployment pipeline. Both for a staging environment and for production. Conceptually release checks are like E2E tests. they cover all API endpoints.

## TDD approach

I would have started on the highest level possible given the requirements available: with writing tests for the expected request/response patterns with for instance [nock](https://github.com/nock/nock). Then specify what the request HTTP headers are and potentially the body (payload) for each request is and followed by what the response HTTP status code and body are.
After that it's good to start writing out the code to make the first(!) test pass.
This will likely have produced a few modules or functions that need to be tested with unit or integration tests.
Those are then of course also following the TDD approach.
We continue with this until all tests are green.
