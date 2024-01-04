import { fetch, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { createCookie, redirect} from "@remix-run/node";
import { tokenCookie as spotifyTokenCookie } from '~/guard/guard';

export const loader = async ({ request }: any) => {

  // Check if the token is already set and valid
  const existingToken = await spotifyTokenCookie.parse(request.headers.get("Cookie"));

  if (existingToken && existingToken.expiresAt > Date.now()) {
    // If token is still valid, no need to fetch a new one
    return json({"message": "Token already set."},
    {headers: {"Content-Type": "application/json"}})
  }

  const clientId = process.env.SPO_CL;
  const clientSecret = process.env.SPO_SE;

  if (!clientId || !clientSecret) {
    throw new Error('Client ID or Client Secret is not defined.');
  }

  const params = new URLSearchParams();
  params.append('grant_type', 'client_credentials');

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
    },
    body: params,
  });

  if (response.status !== 200) {
    throw new Error('Failed to get the access token from Spotify.');
  }

  const data = await response.json();
  const expiresInMs = data.expires_in * 1000;
  const expiresAt = Date.now() + expiresInMs;

  const cookieHeader = await spotifyTokenCookie.serialize(data.access_token);

  return redirect("/",
    {
      headers: {
        "Set-Cookie": cookieHeader,
      },
    }
  );
};