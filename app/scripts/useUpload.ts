import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getUserId, userHasRole } from '~/guard/guard';
import { auth } from '../firebase.server';
import { storage } from '../utils/firebase.config'

type Usage = "song" | "image" | "profile" | "video";

export async function uploadFile(usage: Usage, file: File, request: Request) {

  if (!file) {
    throw new Error("No file found");
  }

  const uid = await getUserId(request);
  if (!uid) {
    throw new Error("No UID found");
  }

  const allowedFileTypesPerUsage: Record<Usage, string[]> = {
    "song": ["audio/mpeg", "audio/wav"],
    "image": ["image/jpeg", "image/png"],
    "profile": ["image/jpeg", "image/png"],
    "video": ["video/mp4"],
  };
  const maxFileSizePerUsage: Record<Usage, number> = {
    "song": 5 * 1024 * 1024, // 5MB
    "image": 2 * 1024 * 1024, // 2MB
    "video": 50 * 1024 * 1024, // 50MB
  };

  const hasRole = await userHasRole(uid, `${usage}Uploader`);

  if (!hasRole) {
    throw new Error(`Current user does not have ${usage} upload role.`);
  }
  if (!allowedFileTypesPerUsage[usage].includes(file.type)) {
    throw new Error(`Input file type ${file.type} is not valid for usage '${usage}'. Required: ${allowedFileTypesPerUsage[usage].join(", ")}`);
  }
  if (file.size > maxFileSizePerUsage[usage]) {
    throw new Error(`Input file exceeds the maximum size (${maxFileSizePerUsage[usage] / 1024 / 1024}MB) for usage '${usage}'.`);
  }
  const storageRef = ref(storage, `${usage}/${file.name}`);
  console.log(file);
  console.log(`Size: ${file.size}`);
  console.log(`Type: ${file.type}`);
  try {
    const uploadTask = uploadBytesResumable(storageRef, new Uint8Array(await file.arrayBuffer()));
    uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
    }, (error) => {
      console.log('Upload failed with error: ' + error);
    }, async () => {
      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
      console.log('File available at', downloadURL);
    });
  } catch (err) {
    console.log(err);
  }
}