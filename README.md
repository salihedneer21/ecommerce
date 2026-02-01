## ECOMMERCE PLATFORM

### REACT NATIVE APP + ADMIN DAHSBOARD

WE WILL HAVE ADMIN, BACKEND, APP 3 REPOS





What Problem Does Express Solve?
Node.js has a built-in http module to create servers. Here's a server without Express:


import http from 'http';

const server = http.createServer((req, res) => {
  // You have to manually check the URL and method
  if (req.method === 'GET' && req.url === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Server is healthy' }));
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(3000);
This is tedious. Imagine having 50 routes - you'd have endless if/else statements.

What is Express?
Express is just a helper library that wraps Node's http module and gives you:

Easy routing (app.get, app.post, etc.)
Middleware system
Convenient methods (res.json(), res.send(), etc.)
Express is a function. When you import it:


import express from 'express';

console.log(typeof express); // "function"
What Does express() Return?
When you call express(), it returns an app object. This object is actually a function too (a special one that can handle HTTP requests).


const app = express();

console.log(typeof app); // "function"
The app object has methods attached to it:

Method	Purpose
app.get()	Register a GET route
app.post()	Register a POST route
app.use()	Add middleware
app.listen()	Start the server
Think of It Like This

┌─────────────────────────────────────────────┐
│  express (the library)                      │
│  - A factory function                       │
│  - Creates app instances                    │
└─────────────────────────────────────────────┘
                    │
                    │  express()
                    ▼
┌─────────────────────────────────────────────┐
│  app (your application)                     │
│  - Stores all your routes                   │
│  - Stores all your middleware               │
│  - Has methods: .get(), .post(), .listen()  │
│  - Knows how to handle incoming requests    │
└─────────────────────────────────────────────┘
Simple Analogy
Think of Express like a restaurant framework:

express = The blueprint/system for running a restaurant
express() = "Build me a new restaurant using this system"
app = Your actual restaurant instance
app.get('/menu') = "When someone asks for the menu, do this"
app.listen(3000) = "Open the doors and start serving customers"
What's Inside app?
When you call express(), the returned app internally has:


app = {
  _router: { ... },      // Stores all your routes
  settings: { ... },     // Configuration
  get: function() {},    // Method to add GET routes
  post: function() {},   // Method to add POST routes
  listen: function() {}, // Method to start server
  // ... many more
}
Each time you call app.get('/path', handler), it adds that route to the internal router.


eg:

In JavaScript, Functions ARE Objects
Unlike many other languages, JavaScript functions are "first-class objects". This means a function can have properties and methods attached to it, just like any object.


// Create a function
function myFunc() {
  console.log('I am a function');
}

// Add properties to it like an object
myFunc.name = 'Alice';
myFunc.sayHi = function() {
  console.log('Hi!');
};

// Use it as a function
myFunc();          // "I am a function"

// Use it as an object
console.log(myFunc.name);  // "Alice"
myFunc.sayHi();            // "Hi!"
How Express Does This
When you call express(), it does something like this internally:


function createApplication() {
  // Create a function
  const app = function(req, res) {
    // Handle incoming requests
    app.handle(req, res);
  };

  // Attach methods to that function
  app.get = function(path, handler) { /* ... */ };
  app.post = function(path, handler) { /* ... */ };
  app.listen = function(port) { /* ... */ };
  app._router = { routes: [] };

  return app;
}
So app is:

A function that can handle HTTP requests
An object with methods like .get(), .listen()
Both at the same time!

Proof
Try this in your code:


import express from 'express';

const app = express();

console.log(typeof app);              // "function"
console.log(typeof app.get);          // "function"
console.log(typeof app.listen);       // "function"
console.log(app instanceof Function); // true
console.log(app instanceof Object);   // true (functions are objects!)
Why Does Express Do This?
Because Node's http.createServer() expects a function as a callback:


import http from 'http';

const app = express();

// This works because app IS a function
http.createServer(app).listen(3000);

// app.listen() is just a shortcut for the above
app.listen(3000);
Simple Visual

┌──────────────────────────────────────┐
│           app                        │
│  ┌────────────────────────────────┐  │
│  │  Function: handles requests    │  │
│  └────────────────────────────────┘  │
│                                      │
│  Properties:                         │
│    .get()     → add GET route        │
│    .post()    → add POST route       │
│    .listen()  → start server         │
│    ._router   → stores routes        │
└──────────────────────────────────────┘
So when you do app.get(...), you're accessing a property (method) on a function. Totally valid in JavaScript!

Does that clear it up?


app.get('/api/health', (req, res) => { ... })
This registers a route handler. Let's break it down:

app.get	Listen for HTTP GET requests
'/api/health'	Only match this exact path
(req, res) => {}	Callback function to run when matched
The callback parameters:

req (request) - Contains everything about the incoming request: URL, headers, query params, body, etc.
res (response) - Object with methods to send data back to the client

res.status(200).json({...}):

.status(200) - Sets HTTP status code (200 = OK)
.json({...}) - Sends JSON response and sets Content-Type: application/json

app.listen(3000, () => { ... })
What happens:

Creates an HTTP server using Node's built-in http module
Binds that server to port 3000
Starts listening for incoming TCP connections
Calls your callback once the server is ready
Under the hood, Express does roughly this:


const http = require('http');
const server = http.createServer(app);
server.listen(3000, callback);


When someone hits http://localhost:3000/api/health:


1. Browser/curl opens TCP connection to port 3000
         ↓
2. Sends HTTP request: "GET /api/health HTTP/1.1"
         ↓
3. Node's http server receives it
         ↓
4. Express creates req/res objects
         ↓
5. Express checks each route in order
         ↓
6. Finds match: GET + /api/health ✓
         ↓
7. Runs your callback function
         ↓
8. res.json() sends response back
         ↓
9. Connection closes (or stays open for keep-alive)


package.json

What is package.json?
It's the identity card of your Node.js project. It tells:

What your project is called
What dependencies it needs
How to run it
Metadata about the project
Node.js and npm read this file to understand your project.

Field by Field
"name": "backend"
The name of your project. Used if you publish to npm. Must be lowercase, no spaces.

"version": "1.0.0"
Your project's version. Follows semantic versioning:


MAJOR.MINOR.PATCH
  1  .  0  .  0
  │     │     └── Bug fixes
  │     └──────── New features (backwards compatible)
  └────────────── Breaking changes
"description": ""
A short description of what your project does. Useful when publishing to npm.

"main": "index.js"
The entry point of your package. When someone does import yourPackage from 'backend', Node loads this file. Not very relevant unless you're publishing a library.

"scripts": { ... }
Custom commands you can run with npm run <name>:


"scripts": {
  "dev": "node --watch server.js",
  "start": "node server.js"
}
Command	What it runs	Usage
npm run dev	node --watch server.js	Development (auto-restart)
npm start	node server.js	Production (note: start doesn't need run)
"keywords": []
Search keywords if you publish to npm. Like tags.

"author": ""
Who made this project. Can be a string or object:


"author": "Salih <salih@email.com>"
"license": "ISC"
Legal license for your code. ISC is permissive (similar to MIT). Tells others how they can use your code.

"type": "module"
This is important! It tells Node.js how to interpret your JavaScript:

Value	Syntax	Import Style
"module"	ES Modules	import express from 'express'
"commonjs" (default)	CommonJS	const express = require('express')
Without this, your import statements would fail.

"dependencies": { ... }
Packages your project needs to run:


"dependencies": {
  "dotenv": "^17.2.3",
  "express": "^5.2.1"
}
dotenv - Loads environment variables from .env file
express - The web framework
The ^ symbol means "compatible version":

^5.2.1 → Accepts 5.2.1, 5.2.9, 5.3.0, but NOT 6.0.0
When you run npm install, Node reads this and downloads these packages to node_modules/.

--watch vs nodemon
Both restart your server when files change. Here's the difference:

node --watch (Built-in, Node 18+)

node --watch server.js
Pros	Cons
Built into Node.js	Fewer features
No extra install	Less configurable
Lightweight	Newer (less mature)
nodemon (Third-party package)

npm install -D nodemon
nodemon server.js
Pros	Cons
More configurable	Extra dependency
Ignore specific files/folders	Slightly heavier
Works on older Node versions	Must install separately
Config file support (nodemon.json)	
Configuration Example
nodemon.json:


{
  "watch": ["src/"],
  "ignore": ["tests/"],
  "ext": "js,json"
}
node --watch has fewer options:


node --watch --watch-path=./src server.js
Which Should You Use?
Situation	Recommendation
Simple project, Node 18+	--watch (you're using this ✓)
Complex project, need config	nodemon
Team with older Node versions	nodemon
Your current setup with --watch is perfectly fine for learning!

# ecommerce
