import express, { Request, Response } from 'express'
import { notifications } from '../Controller/emailProcessingController';
const router = express.Router()

// router.post('/add-excel-data', insertExceldata)
router.get('/notifications', notifications)
export default router;


