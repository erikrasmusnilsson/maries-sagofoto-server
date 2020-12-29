import multer from 'multer';
import { randomBytes } from 'crypto';

const portfolioStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/portfolio')
    },
    
    filename: function (req: any, file: any, cb: any) {
        const random = randomBytes(4).toString('hex');
        cb(null, `${random}_${file.originalname}`)
    }
});

const filter = (req: any, file: any, callback: any) => {
    if (
        file.mimetype === "image/jpg"  || 
        file.mimetype ==="image/jpeg"  || 
        file.mimetype ===  "image/png"
    ) {
        callback(null, true);
    } else {
        callback(new Error("Image uploaded is not of type jpg/jpeg or png"), false);
   }
};

export const uploadPortfolio = multer({
    storage: portfolioStorage,
    fileFilter: filter
});