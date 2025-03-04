import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes/routes.js';

const app = express();

app.use(cors({
    credentials: true
}))

app.use(bodyParser.json())
app.use('/', routes);

const server = http.createServer(app);

server.listen(8080, () => {
    console.log("Server running on http://localhost:8080");
})

export default app;