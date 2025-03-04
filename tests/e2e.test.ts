import request from 'supertest';
import app from '../src/index.ts'; 

describe('URL Shortening Service - E2E Tests', () => {
  let shortUrl: string;
  const originalUrl = 'https://example.com/some/long/url';

  // Test the /encode endpoint
  it('should encode a URL and return a short URL', async () => {
    const response = await request(app)
      .post('/encode')
      .send({ url: originalUrl });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('shortUrl');
    shortUrl = response.body.shortUrl; 

    // Ensure the short URL is correctly formatted
    expect(shortUrl).toMatch(/^http:\/\/short.est\/[a-zA-Z0-9_-]{8}$/);
  });

  // Test the /decode endpoint
  it('should decode a short URL and return the original URL', async () => {
    const shortId = shortUrl.split('/').pop(); // Extract the short ID

    const response = await request(app)
      .get(`/decode/${shortId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('url', originalUrl); // Ensure it matches the original URL
  });

  // Test decoding an invalid short ID
  it('should return 404 for an invalid short ID', async () => {
    const response = await request(app)
      .get('/decode/invalid-id');

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error', 'Short URL not found');
  });

  // Test encoding with invalid input (missing URL)
  it('should return 400 for missing URL in /encode', async () => {
    const response = await request(app)
      .post('/encode')
      .send({}); // No URL provided

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'URL is required');
  });

  // Test encoding with invalid input (malformed URL)
  it('should return 400 for invalid URL format in /encode', async () => {
    const response = await request(app)
      .post('/encode')
      .send({ url: 'not-a-valid-url' });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Invalid URL format');
  });
});