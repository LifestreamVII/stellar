import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { verifyUser } from "~/guard/guard";

export const loader: LoaderFunction = async ({ request }) => {
  let user = await verifyUser(request);
  // code here will only run if user is signed in
  return user;
};

export default function Profile() {
    const data = useLoaderData<typeof loader>();
    return (
        <div className="container">
                <div className="row">
                    <div className="col-10">
                        <h1>Hello, {data.email}</h1>
                        <p>Your UID is {data.uid}</p>
                    </div>
                </div>
        </div>
    );
  }
