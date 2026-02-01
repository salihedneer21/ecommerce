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


config/dotenv


The Problem This Solves
You don't want to hardcode sensitive data (database passwords, API keys) or environment-specific values (port numbers) in your code. Why?

Security - You might accidentally commit secrets to git
Flexibility - Different values for development vs production
Step by Step
1. import dotenv from 'dotenv'
Imports the dotenv library. This library reads a .env file and loads its contents into process.env.

2. dotenv.config()
This does the magic. It:

Looks for a file named .env in your project root
Reads it line by line
Adds each variable to process.env
Example .env file:


NODE_ENV=production
PORT=5000
DB_URL=mongodb://realserver.com:27017/myapp
After dotenv.config() runs:


process.env.NODE_ENV  // "production"
process.env.PORT      // "5000" (always a string!)
process.env.DB_URL    // "mongodb://realserver.com:27017/myapp"
3. What is process.env?
process is a global object in Node.js that gives info about the current running process.

process.env is an object containing all environment variables:


console.log(process.env);
// {
//   PATH: "/usr/local/bin:...",
//   HOME: "/Users/salih",
//   NODE_ENV: "production",
//   PORT: "5000",
//   ... system variables
// }
4. The || Fallback Pattern

PORT: process.env.PORT || 3000
This means: "Use process.env.PORT if it exists, otherwise use 3000"

If .env has	process.env.PORT	Result
PORT=5000	"5000"	"5000"
Nothing	undefined	3000
How || works:


undefined || 3000   // → 3000 (undefined is falsy)
"5000" || 3000      // → "5000" (non-empty string is truthy)
"" || 3000          // → 3000 (empty string is falsy)
5. export const ENV = { ... }
Creates an object with all your config values and exports it so other files can use it:


// In server.js
import { ENV } from './src/config/env.js';

app.listen(ENV.PORT, () => {
  console.log(`Server running on ${ENV.PORT}`);
});
The Flow

┌─────────────────┐
│  .env file      │
│  PORT=5000      │
│  DB_URL=...     │
└────────┬────────┘
         │ dotenv.config() reads this
         ▼
┌─────────────────┐
│  process.env    │
│  (Node global)  │
│  .PORT = "5000" │
└────────┬────────┘
         │ Your code reads from here
         ▼
┌─────────────────┐
│  ENV object     │
│  (your export)  │
│  .PORT = "5000" │
└────────┬────────┘
         │ Other files import this
         ▼
┌─────────────────┐
│  server.js      │
│  app.listen(    │
│    ENV.PORT     │
│  )              │
└─────────────────┘
Important: Add .env to .gitignore
Never commit your .env file! Add it to .gitignore:


# .gitignore
.env
Instead, create a .env.example with dummy values for others to copy:


# .env.example
NODE_ENV=development
PORT=3000
DB_URL=mongodb://localhost:27017/myapp
One Thing to Note
process.env values are always strings. So:


process.env.PORT = "5000"  // string, not number

// If you need a number:
const port = Number(process.env.PORT) || 3000;

1. import path from 'path'
path is a built-in Node.js module (no install needed). It helps work with file paths across different operating systems.

Why? Because paths are different:

Windows: C:\Users\salih\project
Mac/Linux: /Users/salih/project
path handles this for you.


4a. express.static()

app.use(express.static(path.join(__dirname, '../admin/dist')));
What it does: Serves static files (HTML, CSS, JS, images) from a folder.

When a request comes in:


Request: GET /main.js
→ Express looks for: /admin/dist/main.js
→ If found, sends the file
Request	File Served
/style.css	/admin/dist/style.css
/logo.png	/admin/dist/logo.png
/assets/icon.svg	/admin/dist/assets/icon.svg

4b. The Catch-All Route *

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../admin/dist/index.html'));
});
What is *? A wildcard that matches any route.

Why do this? For Single Page Applications (SPA) like React, Vue, or Angular.

Here's the problem with SPAs:


Your React app has routes:
- /dashboard
- /users
- /settings

These routes exist in React, NOT on the server.
If someone directly visits http://yoursite.com/dashboard:

Browser asks server for /dashboard
Server has no /dashboard route
Without *, server returns 404 ❌
With the catch-all:

Browser asks server for /dashboard
Server matches *
Server sends index.html
React loads and handles /dashboard route ✅





# ecommerce


--prefix in npm
The --prefix flag tells npm to run the command in a different directory.


npm install --prefix backend
This is the same as:


cd backend && npm install
Breaking Down Your Build Script

"build": "npm install --prefix backend && npm install --prefix admin && npm run build --prefix admin"
Command	What it does
npm install --prefix backend	Install dependencies in /backend folder
npm install --prefix admin	Install dependencies in /admin folder
npm run build --prefix admin	Run build script in /admin folder
Why Use This?
Your project structure likely looks like:


/learning-react-native/
├── package.json        ← Root (you're here)
├── backend/
│   └── package.json    ← Backend dependencies
└── admin/
    └── package.json    ← Frontend dependencies
This is a monorepo setup - multiple projects in one repository.

The root package.json has a single command to set up everything:


npm run build   # Installs and builds all sub-projects
Without --prefix, you'd have to:


cd backend && npm install && cd ..
cd admin && npm install && npm run build && cd ..
Quick Reference

npm install --prefix ./some-folder     # Install in that folder
npm run dev --prefix ./some-folder     # Run script in that folder
npm test --prefix ./some-folder        # Run tests in that folder
Makes managing multiple packages much cleaner!


