/**
 * Server will create a http server which provide a socket.io instance.
 * Use io instance, you can send msg to the http client.
 */


const fs = require('fs');
const path = require('path');


const staitcPath = path.join(__dirname, '../../assets');


module.exports = (app) => {
    function getStaticFileStream(url, cb) {
        let filePath = path.join(staitcPath, url);
        fs.stat(filePath, (err, stats) => {
            if (err) {
                return cb(err);
            } else {
           
                    cb(null, fs.createReadStream(filePath));

            }

        });
    }

    app.use(function (req, res, next) {

        let url = req.url;
        switch (url) {
            case '/blendMemory':
                res.writeHead(200, {
                    'Content-Type': 'text/html'
                });
                getStaticFileStream('/index.html', (err, stream) => {
                    if (err) {
                        res.writeHead(404);
                        return res.end('Not Found!');
                    }
                    stream.pipe(res);
                });
                break;

                blend - memory
            default:
                {
                    if (/blend-memory/g.test(url)) {
                        getStaticFileStream(url, (err, stream) => {
                            if (err) {
                                next()
                            } else {
                                stream.pipe(res);
                            }

                        });
                    }else{
                        next()
                    }
                }


                break;
        }
    })
}