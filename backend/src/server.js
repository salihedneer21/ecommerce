import express from 'express';
import path from 'path'; 
import {ENV} from './config/env.js';

//console.log('Environment Variables:', ENV);

const app = express();
// console.log('Current Directory:', path.resolve()); this will give the current directory
const __dirname = path.resolve();


// health check endpoint

app.get('/api/health', (req, res) => {
    res.status(200).json({message: 'Server is healthy' });
});

if(ENV.NODE_ENV === 'production') {
  // Serve static files from the React frontend app
    app.use(express.static(path.join(__dirname, '../admin/dist')));
    
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../admin/dist/index.html'));
    });
} else {
    app.get('/', (req, res) => {
        res.send('API is running....');
    });
}

app.listen(ENV.PORT, () => {
  console.log(`Server is running on port ${ENV.PORT}`);
});