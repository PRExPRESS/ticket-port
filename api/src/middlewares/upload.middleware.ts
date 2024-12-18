import path from 'path';
import fs from 'fs';
import multer from 'multer';

// Set up multer to save files to the assets/template directory
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadDir = path.join(__dirname, '../assets/template');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      cb(null, uploadDir); // Save to assets/template
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const fileName = `${Date.now()}-${file.originalname}`;
      cb(null, fileName); // Save file with a timestamp to avoid duplicates
    }
  });

  const storage2 = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadDir = path.join(__dirname, '../assets/payments');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      cb(null, uploadDir); // Save to assets/template
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const fileName = `${Date.now()}-${file.originalname}`;
      cb(null, fileName); // Save file with a timestamp to avoid duplicates
    }
  });
  
  // Middleware to handle file uploads
  const upload = multer({ storage });
  const upload2 = multer({ storage: storage2 });
  export const uploadFile = upload.single('file');
  export const uploadFile2 = upload2.single('slip');
  
  