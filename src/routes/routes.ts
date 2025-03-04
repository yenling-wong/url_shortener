import express, { Router, Request, Response, NextFunction } from 'express';
import { generateShortUrl, getOriginalUrl } from '../utils/utils.js';

const router: Router = express.Router();

// URL validation middleware
export const validateUrl = (req: Request, res: Response, next: NextFunction): void => {
    const { url } = req.body;
  
    if (!url) {
      res.status(400).json({ error: 'URL is required' });
      return;
    }
  
    try {
      new URL(url); 
      next();
    } catch (error) {
      res.status(400).json({ error: 'Invalid URL format' });
    }
  };

router.post('/encode', validateUrl, (req: Request, res: Response): void => {
    const { url } = req.body;
    const shortId = generateShortUrl(url);
    res.json({ shortUrl: `http://short.est/${shortId}` });
  });
  

router.get('/decode/:id', (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const originalUrl = getOriginalUrl(id);
      if (originalUrl) {
        res.json({ url: originalUrl });
      } else {
        res.status(404).json({ error: 'Short URL not found' });
      }
    } catch (error) {
      next(error);
    }
});

router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});


export default router;