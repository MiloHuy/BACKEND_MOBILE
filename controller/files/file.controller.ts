import { Response } from "express";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import catchAsync from "../../middlewares/catchAsyncErrors.mid";
import { giveCurrentDateTime } from "../../utils/date-time.utils";

const handleUploadFile = catchAsync(
  async (req: any, res: Response) => {
    const storage = getStorage();

    try {
      const dateTime = giveCurrentDateTime();

      const storageRef = ref(storage, `files/${req.file.originalname + "       " + dateTime}`);

      // Create file metadata including the content type
      const metadata = {
        contentType: req.file.mimetype,
      };

      // Upload the file in the bucket storage
      const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);
      //by using uploadBytesResumable we can control the progress of uploading like pause, resume, cancel

      // Grab the public url
      const downloadURL = await getDownloadURL(snapshot.ref);

      return res.send({
        message: 'file uploaded to firebase storage',
        name: req.file.originalname,
        type: req.file.mimetype,
        downloadURL: downloadURL
      })
    } catch (error: any) {
      return res.status(400).send(error.message)
    }
  }
)

const handleGetFile = catchAsync(
  async (req: any, res: Response) => {
    const storage = getStorage();
    const storageRef = ref(storage, `/${req.params.fileName}`);

    try {
      const url = await getDownloadURL(storageRef);
      return res.send({
        message: 'file retrieved from firebase storage',
        downloadURL: url
      })
    } catch (error: any) {
      return res.status(400).json({
        message: 'File not found',
      })
    }
  })

export { handleGetFile, handleUploadFile };

