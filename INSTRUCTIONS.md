Prerequisites
- docker

To run the project, please use the following commands:
```
docker-compose build --no-cache
docker-compose up  
```

To run the tests use the following command:
```
npm test
```

A successful run would include the following log outputs:
``` PASS  tests/e2e.test.ts
  URL Shortening Service - E2E Tests
    ✓ should encode a URL and return a short URL (19 ms)
    ✓ should decode a short URL and return the original URL (2 ms)
    ✓ should return 404 for an invalid short ID (1 ms)
    ✓ should return 400 for missing URL in /encode (1 ms)
    ✓ should return 400 for invalid URL format in /encode (2 ms)

Test Suites: 1 passed, 1 total
Tests:       5 passed, 5 total
Snapshots:   0 total
Time:        0.513 s, estimated 1 s
```