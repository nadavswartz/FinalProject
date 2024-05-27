// Global veribals

const http = require('http');
const fs = require('fs');
const path = require('path');
const port = 3000;

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        // Serve HTML file
        res.writeHead(200, {'Content-Type': 'text/html'});
        fs.readFile('home.html', (error, data) => {
            if (error) {
                res.writeHead(404);
                res.write('File not found');
            } else {
                res.write(data);
            }
            res.end();
        });
    } else if (req.url.endsWith('.css')) {
        // Serve CSS file
        const cssPath = path.join(__dirname, req.url);
        fs.readFile(cssPath, (error, data) => {
            if (error) {
                res.writeHead(404);
                res.write('File not found');
            } else {
                res.writeHead(200, {'Content-Type': 'text/css'});
                res.write(data);
            }
            res.end();
        });
    } else {
        // Handle other requests (e.g., images, JavaScript files)
        res.writeHead(404);
        res.write('Not Found');
        res.end();
    }
});

server.listen(port, (error) => {
    if (error) {
        console.log("Something went wrong");
    } else {
        console.log("Server is listening on port " + port);
    }
});


// Nadav's S. Code



// Nadav's C. Code



// Stav's Code
