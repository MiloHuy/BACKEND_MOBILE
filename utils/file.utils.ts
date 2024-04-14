import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { EApiStatus } from "../constanst/api.const";
import { giveCurrentDateTime } from "./date-time.utils";

export const handleGetFileUtils = async (nameFile: string) => {
  const storage = getStorage();
  const storageRef = ref(storage, `/${nameFile}`);

  try {
    const url = await getDownloadURL(storageRef);
    return {
      urlFile: url,
      status: 'Success'
    }
  } catch (error: any) {
    return {
      message: 'File not found',
      status: 'Fail',
      urlFile: undefined
    }
  }
}

export const handleUploadFileUtils = async (file: any, folderName: string) => {
  const storage = getStorage();

  try {
    const dateTime = giveCurrentDateTime();

    const storageRef = ref(storage, `${folderName}/${file.originalname + "       " + dateTime}`);
    const metadata = {
      contentType: file.type,
    };

    const snapshot = await uploadBytesResumable(storageRef, file.buffer, metadata);
    const downloadURL = await getDownloadURL(snapshot.ref);

    return {
      message: 'file uploaded to firebase storage',
      name: file.name,
      type: file.type,
      urlFile: downloadURL,
      status: EApiStatus.Success
    }
  } catch (error: any) {
    return {
      status: EApiStatus.Fail,
      message: error.message,
    }
  }
}