import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth } from '~/utils/firebase.config';

// Define the structure of the user role
type Role = {
  SongUploader: boolean;
  ImageUploader: boolean;
  VideoUploader: boolean;
};

const userRoles: Record<string, Role> = {
  "user1": { SongUploader: true, ImageUploader: false, VideoUploader: false },
  "user2": { SongUploader: false, ImageUploader: true, VideoUploader: false },
  "user3": { SongUploader: false, ImageUploader: false, VideoUploader: true },
};

const storage = getStorage();

async function uploadFile(usage: string, file: File) {
  const currentUserRole = userRoles[auth.currentUser.uid]; // Assume that current user is logged in Firebase Auth.
  if (!currentUserRole) {
    throw new Error("The current user does not have any roles.");
  }
  const allowedFileTypesPerUsage = {
    "song": ["audio/mpeg", "audio/wav"],
    "image": ["image/jpeg", "image/png"],
    "video": ["video/mp4"],
  };
  const maxFileSizePerUsage = {
    "song": 5 * 1024 * 1024, // 5MB
    "image": 2 * 1024 * 1024, // 2MB
    "video": 50 * 1024 * 1024, // 50MB
  };
  if (!currentUserRole[`${usage}Uploader`]) {
    throw new Error(`Current user is not a ${usage} upload role.`);
  }
  if (!allowedFileTypesPerUsage[usage].includes(file.type)) {
    throw new Error(`Input file type ${file.type} is not valid for usage '${usage}'. Required: ${allowedFileTypesPerUsage[usage].join(", ")}`);
  }
  if (file.size > maxFileSizePerUsage[usage]) {
    throw new Error(`Input file exceeds the maximum size (${maxFileSizePerUsage[usage] / 1024 / 1024}MB) for usage '${usage}'.`);
  }
  const storageRef = ref(storage, `${usage}/${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);
  uploadTask.on('state_changed', (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
  }, (error) => {
    console.log('Upload failed with error: ' + error);
  }, async () => {
    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
    console.log('File available at', downloadURL);
  });
}