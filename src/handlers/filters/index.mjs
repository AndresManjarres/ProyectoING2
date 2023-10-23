import { Router } from 'express';
import multer from 'multer';
import applyFiltersHandler from './applyFiltersHandler.mjs';

const router = Router();

const storage = multer.memoryStorage();

const upload = multer({ storage, limits: { fileSize: 1024 * 1024 * 50 } });

router.get('/', (req, res) => {
  res.send('OK images GET');
});

router.post('/', upload.array('images[]'), applyFiltersHandler);

export const test = () => {

};

export default router;
