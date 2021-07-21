import {createServer} from 'http';
import {parse} from 'querystring';

const server = createServer((request, response) => {
    switch (request.url) {
        case '/status': {
            response.writeHead(200, {
                'Content-Type': 'application/json',
            });
            response.write(JSON.stringify({
                status: 'OKAY'
            }));
            response.end();
            break;
        }
        case '/autenticate': {
            let data = '';
            request.on('data', (chunk) => {
                data += chunk;
            })
            request.on('end', () => {
                console.log(parse(data))
                
                response.end();
            })
            break;
        }
        default: {
            response.writeHead(404, 'Service not found');
            response.end();
        }
    }
});


server.listen(8000, '127.0.0.1', () => {
    console.log(`Server is running at http://127.0.0.1:8000`);
});