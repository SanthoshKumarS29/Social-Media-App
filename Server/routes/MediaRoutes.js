import express from 'express';
import multer from 'multer';
import path from 'path';
import { createItems, deletePost, getItems, itemComments, likeItems } from '../controllers/MediaCR.js';

const router = express.Router();

// Multer setup for fileSetup
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.filename + '-' + Date.now() + path.extname(file.originalname));
    },
})

const upload = multer({ storage: storage});

// Routes 
router.get('/', getItems);
router.post('/', upload.single('file'),createItems);
router.post('/like/:postId', likeItems);
router.post('/comment/:postId', itemComments);
router.delete('/delete/:postId', deletePost)

export default router;