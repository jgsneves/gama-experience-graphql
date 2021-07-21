import {createServer} from 'http';
import {readFile} from 'fs';
import {resolve} from 'path';
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
        case '/sign-in': {
            const filePath = resolve(__dirname, './pages/sign-in.html');
            readFile(filePath, (error, file) => {
                if (error) {
                    response.writeHead(500, 'Cannot process HTML file.');
                    response.end();
                    return;
                }

                response.writeHead(200);
                response.write(file);
                response.end();
            });
            break;
        }
        case '/home': {
            const filePath = resolve(__dirname, './pages/home.html');
            readFile(filePath, (error, file) => {
                if (error) {
                    response.writeHead(500, 'Cannot process HTML file.');
                    response.end();
                    return;
                }

                response.writeHead(200);
                response.write(file);
                response.end();
            });
            break;
        }
        case '/autenticate': {
            let data = '';
            request.on('data', (chunk) => {
                data += chunk;
            })
            request.on('end', () => {
                console.log(parse(data))
                response.writeHead(301, {
                    Location: '/home'
                });
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