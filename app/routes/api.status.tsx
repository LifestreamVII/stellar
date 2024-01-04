import { LoaderArgs, LoaderFunction, json } from '@remix-run/node';
import axios from 'axios';

export const loader = async ({ request }: LoaderArgs) => {

  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  try {
    const response = await init(id);
    return json({info: response}, { status: 200 });
  } catch (error) {
    console.error(error);
    return json({ error: "Server ERR while fetching status : " + error, code: 1}, { status: 500 });
  }
};

const init = async (id: any) => {
  const api_url = `https://mp3.na-no.pro/status/${id}`;

  const response = await axios.get(api_url);

  if (response.status !== 200) {
    throw new Error(`Status ERR: ${response.statusText}`);
  }

  return response.data;
};