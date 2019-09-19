/*
 *  server.js
 *
 *   This just provides a simple static server for the project.
 *
 */

var http = require('http'),
fs = require('fs'),
path = require('path'),

port = 8888, // port 8888 for now
root = process.cwd(); // assume current working path is root

// create and start the server
http.createServer(function (req, res) {

    // get the path
    var p = path.join(root, req.url);

    // get stats of that path
    fs.lstat(p, function (e, stat) {

        // if error end
        if (e) {

            res.end();

        }

        // if stats check it out
        if (stat) {

            // if it is not a file append index.html to path, and try that
            if (!stat.isFile()) {
                p = path.join(p, 'index.html')
            }

            // try to read the path
            fs.readFile(p, 'binary', function (e, file) {

                // if error end
                if (e) {

                    res.end();

                }

                // if file, send it out
                if (file) {

                    res.writeHead(200);
                    res.write(file, 'binary');
                    res.end();
                }

            });

        }

    });

}).listen(port);