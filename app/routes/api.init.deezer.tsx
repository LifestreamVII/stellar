import { LoaderArgs, createCookie, json } from '@remix-run/node';
import axios from 'axios';

export const loader = async ({ request }: LoaderArgs) => {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  try {
    const plexedCookie = request.headers.get("Cookie")?.split("; ").find(cookie => cookie.startsWith("plexed="));
    const plexedValue = plexedCookie?.split("=")[1] || false;
    console.log(plexedValue)
    const response = await init(id, plexedValue === "true" ?? false);
    return json({url: response}, { status: 200 });
  } catch (error) {
    console.error(error);
    return json({ error: "Server ERR while downloading : " + error, code: 1}, { status: 500 });
  }
};

const init = async (id: any, plexedValue=false) => {
  const api_url = `https://mp3.na-no.pro/api?value=${id}&plexed=${plexedValue}`;

  const response = await axios.get(api_url);

  if (response.status !== 202) {
    throw new Error(`Song Download ERR: ${response.statusText}`);
  }

  return response.data.statusUrl;
};