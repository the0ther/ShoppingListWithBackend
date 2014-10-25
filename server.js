var http = require('http');
var parse = require('url').parse;
var join = require('path').join;
var fs = require('fs');
var root = __dirname;
var qs = require('querystring');

var items = [];

var server = http.createServer(function(req, res) {
	switch (req.method) {
		case 'POST':
			var item = '';
			req.setEncoding('UTF-8');
			req.on('data', function(chunk) {
				item += chunk;
			});
			req.on('end', function() {
				items.push(item);
				res.end('Item added\n');
			});
			break;

		case 'GET': 
			res.write('<!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8"> <title>Shopping List</title> </head> <body> <form action="/" method="post"> <input type="text" name="item" placeholder="Enter an item"> <button>Add Item</button> </form>'); 
			if (items.length) {
				res.write('<ul>');
				items.forEach(function(item, ii) {
					res.write('<li>' + ii + ': ' + item + '</li>');
				});
				res.write('</ul>');				
			}
			res.write('</body> </html>');
			res.end();
			break;

		case 'DELETE': 
			var pathname = url.parse(req.url).pathname;
			var ii = parseInt(pathname.slice(1), 10);
			if (isNaN(ii)) {
				res.statusCode = 400;
				res.end('Invalid ID');
			} else if (!items[ii]) {
				res.statusCode = 404;
				res.end('Item not found!');
			} else {
        items.splice(ii, 1);
        res.end('Item deleted successfully');
			}
			break;

		case 'PUT':
			var pathname = url.parse(req.url).pathname;
			var ii = parseInt(pathname.slice(1), 10);
			if (isNaN(ii)) {
				res.statusCode = 400;
				res.end('Invalid ID');
			} else if (!items[ii]) {
				res.statusCode = 404;
				res.end('Item not found!');
			} else {
				console.log(url.parse(req.url));
				var strs = url.parse(req.url).query.split('=');
				if (!strs.length === 2 || !strs[1]) {
					res.statusCode = 400;
					res.end('Invalid request');
				} else {
					items[ii] = strs[1];
        	res.end('Item updated successfully');
				}
			}			
			break;
	}
});

server.listen(9000, function() {
	console.log('listening on port 9000');
})