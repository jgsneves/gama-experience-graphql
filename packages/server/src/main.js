import express from 'express';
import cors from 'cors';

const server = express();

server.use(cors());

server.get('/status', (_, response) => {
    response.send({
        status: 'OK'
    });
});

server.post('/authenticate', express.json(), (request, response) => {
    console.log({
        'email': request.body.email,
        'senha': request.body.password
    });
    response.send({
        status: 'ok'
    });
});

server.listen(8000, '127.0.0.1', () => {
    console.log(`Server is running at http://127.0.0.1:8000`);
});