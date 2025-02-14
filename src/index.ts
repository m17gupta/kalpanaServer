import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import connectDB from '../src/dataBase/Db';
import bodyParser from 'body-parser';
import http from 'http';
import { Server as WebSocketServer, WebSocket } from 'ws';

const  AuthRoutes= require('./routes/auth/AuthRoutes');

const app: express.Application = express();
const PORT = process.env.PORT || 5001;
const HOSTNAME = process.env.HOSTNAME || 'localhost';
const PROTOCOL = process.env.PROTOCOL || 'http';

// Set the limit to 500MB, you can adjust it as per your needs
app.use(express.json());
app.use(bodyParser.json({ limit: '800mb' }));
app.use(bodyParser.urlencoded({ limit: '500mb', extended: true, parameterLimit: 5000000000 }));


// CORS Middleware
const whitelist = [ 'http://localhost:9000'];
const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
    
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE',"OPTIONS"],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  exposedHeaders: ['Access-Control-Allow-Origin'] 
};


app.use(cors(corsOptions));

// Explicitly handle OPTIONS requests
app.options('*', cors(corsOptions));

// Logging middleware for debugging
app.use((req, res, next) => {

  next();
});

app.use("/auth",AuthRoutes)
// Basic route
app.get('/', (req, res) => {
  res.send('Hello World!');
});



// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });
  
  // Connect to the database and start the server
  // Create HTTP server
const server = http.createServer(app);

  connectDB().then(() => {
    server.listen(PORT, () => {
      console.log(`Server is running on ${PROTOCOL}://${HOSTNAME}:${PORT}`);
    });
  }).catch(error => {
    console.error('Database connection failed:', error);
    process.exit(1);
  });


