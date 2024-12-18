import express, { Express } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan" ;
import sequelize from "./config/db.config";
import UserRoutes from "./routes/user.routes";
import PurchaseRouter from "./routes/purchase.routes";
import TicketRouter from "./routes/ticket.routes";
import EventRouter from "./routes/event.routes";
import PaymentRouter from "./routes/payment.routes";
import path from 'path';
import fs from 'fs';
// Initialize Express app
const app = express();

// Middleware setup
 // Adds security-related HTTP headers
 app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"], // Default to self
        connectSrc: ["'self'", "https://hitsmf.besthub.me"], // Allow connections to your API
        // You can customize other sources here (scripts, styles, etc.) if needed
      },
    })
  );
app.use(cors()); // Enables CORS for all routes
app.use(express.json()); // Parses incoming JSON requests
app.use(morgan('dev')); // Logs requests to the console

// Routes
app.use('/api/user',UserRoutes);
app.use('/api/purchase',PurchaseRouter);
app.use('/api/ticket',TicketRouter);
app.use('/api/event',EventRouter);
app.use('/api/payment',PaymentRouter);

// Serve the ticket for download by its file name
app.get('/api/download/ticket/:fileName', (req, res) => {
    const fileName = req.params.fileName+'.png';
    const filePath = path.join(__dirname, './assets/qrcodes/', fileName); // Path to the ticket file
    console.log(filePath)
    if (fs.existsSync(filePath)) {
        res.setHeader('Content-Disposition', `attachment; filename=${fileName}`); // Force download
        res.download(filePath);
        //res.status(200).json({ message: 'Ticket downloaded successfully',filePath });
    } else {
        res.status(404).json({ message: 'Ticket not found' });
    }
});

// Endpoint to serve the logo image
app.get('/api/logo', (req, res) => {
    const logoPath = path.join(__dirname, './assets/logo/logo.png');  // Path to the logo file
    res.sendFile(logoPath, (err) => {
        if (err) {
            res.status(500).json({ message: 'Error serving logo file' });
        }
    });
});
app.use(express.static(path.join(__dirname, '../client')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});




sequelize.authenticate()
.then(() => {
    console.log("Connection has been established successfully.");
})
.catch((error) => {
    console.error("Unable to connect to the database: ", error);
});


export default app;