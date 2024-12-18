import dotenv  from 'dotenv';
import app from './app';
dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer =async() => {
    app.listen(PORT, () =>{
        console.log(`Server started on port ${PORT}`);
        //console.log("JWT_SECRET: ", process.env.JWT_SECRET);
    } );
}

startServer();