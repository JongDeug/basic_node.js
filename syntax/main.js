// import http from 'http';
// import fs from 'fs';
var http = require('http');
var fs = require('fs');
// 모듈이 c언어에서 라이브러리 같은거구나
function templateHTML(title, list, body) {
   return `<!doctype html>
                <html>
                <head>
                <title>WEB1 - ${title}</title>
                <meta charset="utf-8">
                </head>
                <body>
                <h1><a href="/">WEB</a></h1>sdfsd
                ${list}
                <a href="/create">create</a> sdfsdfasdfsdfadf
                ${body}
                </body>
                </html>`;
}
function templateList(filelist) {
    // let list = `<ul>
    //     <li><a href="/?id=HTML">HTML</a></li>
    //     <li><a href="/?id=CSS">CSS</a></li>
    //     <li><a href="/?id=Javascript">JavaScript</a></li>
    // </ul>`
    let list = `<ul>`;
    let i = 0;
    while (i < filelist.length) {
        list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
        i = i + 1;
    }
    list = list + '</ul>';
    return list;
}

var app = http.createServer(function (request, response) {
    const url = new URL(request.url, `http://${request.headers.host}`);
    const queryData = url.searchParams;
    // console.log(queryData);
    let pathname = url.pathname;
    // console.log(pathname);
    let title = queryData.get('id');
    console.log(queryData.get('id'));
    // console.log(__dirname + url);

    if (pathname === '/') {
        if (title === null) {

            fs.readdir('./data/', function (err, filelist) {
                // console.log(filelist);
                title = 'Welcome';
                let description = 'Hello, Node.js';

                let list = templateList(filelist);
                let template = templateHTML(title, list, `<h2>${title}</h2>${description}`);
                response.end(template);
                response.writeHead(200);
            })
        } else {
            fs.readdir('./data/', (error, filelist) => {
                let list = templateList(filelist);
                fs.readFile(`./data/${title}`, 'utf8', function (err, description) {
                    let template = templateHTML(title, list, `<h2>${title}</h2>${description}`);
                    response.end(template);
                    response.writeHead(200);
                });
            });
        }
    } else {
        response.writeHead(404);
        response.end('Not found');
    }



    // response.end(fs.readFileSync(__dirname + url));
});
app.listen(3000);
