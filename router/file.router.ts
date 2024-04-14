import express from 'express';
import multer from "multer";
import { initializeFirebaseApp } from '../config/firebase.config';
import { handleGetFile, handleUploadFile } from '../controller/files/file.controller';

const routerFile = express.Router();

initializeFirebaseApp();

const upload = multer({ storage: multer.memoryStorage() });

const ROUTER_FILE_API = {
  GET: {
    file: '/api/files/get/:fileName'
  },
  POST: {
    uploadFile: '/api/files/upload',
  },
  PUT: {},
  DELETE: {}
}

routerFile.post(ROUTER_FILE_API.POST.uploadFile, upload.single("filename"), handleUploadFile)
routerFile.get(ROUTER_FILE_API.GET.file, handleGetFile)

export default routerFile
