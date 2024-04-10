import { LoaderFunction, json, ActionFunction } from '@remix-run/node';
import { uploadFile } from '~/scripts/useUpload';
import NodeID3 from 'node-id3';
import type { Request } from "express";
export let loader: LoaderFunction = async ({ request }) => {
  return await handleRequest(request);
};
export let action: ActionFunction = async ({ request }) => {
  return await handleRequest(request);
};
async function handleRequest(request: Request) {
  const formData = await request.formData();
  const usage = formData.get('usage');
  const file = formData.get('file');
  if (file instanceof File) {
    try {
      const downloadURL = await uploadFile(usage, file, request);

      const buffarr = new Uint8Array(await file.arrayBuffer());

      const buff = Buffer.from(buffarr);

      const tags = NodeID3.read(buff);

      return json({ status: 'File uploaded successfully', tags: tags,  dl_url:downloadURL}, { status: 200 });
    } catch (error) {
      console.log(error);
      return json({ error: error.message }, { status: 400 });
    }
  } else {
    return json({ error: 'No file provided' }, { status: 400 });
  }
}