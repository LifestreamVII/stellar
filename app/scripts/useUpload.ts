import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getUserId, userHasRole } from '~/guard/guard.server';
import { auth } from '../firebase.server';
import { storage } from '../utils/firebase.config'
import { useState } from "react";
import { LoaderFunction, json, ActionFunction } from '@remix-run/node';
import NodeID3 from 'node-id3';

type Usage = "song" | "image" | "profile" | "video";

const useUpload = () => {

  const [tags, setTags] = useState({});
  const [image, setImage] = useState("");
  const [progress, setProgress] = useState(0);
  const [downloadURL, setDownloadURL] = useState("");

  const uploadFile = async (usage: Usage, file: File, uid: string) => {
    
    console.log(file)

    console.log(file.type)

    if (!file) {
      throw new Error("No file found");
    }
  
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
      "song": 15 * 1024 * 1024, // 5MB
      "image": 2 * 1024 * 1024, // 2MB
      "video": 50 * 1024 * 1024, // 50MB
    };

    const hasRole = true;
  
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
    console.log(`Size: ${file.size}`);
    console.log(`Type: ${file.type}`);

    if (file instanceof File) {
      try {
        const uploadTask = uploadBytesResumable(storageRef, new Uint8Array(await file.arrayBuffer()));
    
        await new Promise((resolve, reject) => {
          uploadTask.on('state_changed', (snapshot) => {
            const newProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + newProgress + '% done');
            setProgress(newProgress);
          }, (error) => {
            console.log('Upload failed with error: ' + error);
            reject(error);
          }, async () => {
            const newDownloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            console.log('File available at', newDownloadURL);
            setDownloadURL(newDownloadURL);
            resolve();
          });
        });

        const buffarr = new Uint8Array(await file.arrayBuffer());

        const buff = Buffer.from(buffarr);

        const tags = NodeID3.read(buff);

        setTags({...tags, done: true});

        if (tags && tags.image) {
          console.log(tags.image)
          const image = tags.image.imageBuffer;
          const base64Image = Buffer.from(image).toString('base64');
          setImage(base64Image);
        }
        
    } catch (err) {
        console.log(err);
    }
  }
}

  return {uploadFile, tags, progress, downloadURL, image, setImage};

}

export default useUpload