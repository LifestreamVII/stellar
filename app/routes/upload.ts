import { LoaderFunction, json, ActionFunction } from '@remix-run/node';
import { uploadFile } from '~/scripts/useUpload';
import type { Request } from "express";
export let loader: LoaderFunction = async ({ request }) => {
  return await handleRequest(request);
};
export let action: ActionFunction = async ({ request }) => {
  return await handleRequest(request);
};
async function handleRequest(request: Request) {
  const formData = await request.formData();
  const usage = 'song';  // this can be changed depending on your requirements
  const file = formData.get('file');
  if (file instanceof File) {
    try {
      await uploadFile(usage, file, request);
      return json({ status: 'File uploaded successfully' }, { status: 200 });
    } catch (error) {
      console.log(error);
      return json({ error: error.message }, { status: 400 });
    }
  } else {
    return json({ error: 'No file provided' }, { status: 400 });
  }
}