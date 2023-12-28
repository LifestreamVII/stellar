import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { requireAuth } from "~/guard/guard";
import profile from "~/styles/user/profile.css";
import { json } from "@remix-run/node"; // or cloudflare/deno

export const loader: LoaderFunction = async ({ request }) => {
  const user = await requireAuth(request);
  //const userData = await getUser(uid);
  return json({
    user
  })
}

export default function Profile() {
  const {user: data} = useLoaderData<typeof loader>();
  return (
    <div className="profile" style={{ "--background": "url(" + data.photoURL ?? "https://pbs.twimg.com/media/FuNWEzlWcAEui0L.jpg" + ")" } as React.CSSProperties}>
      <div className="row">
        <div className="profile-quote col-8 u__align--center">
          <h5><i>Inabakumori’s career started with “Secret Music” on February 22, 2016 and has posted twenty two songs since then</i></h5>
        </div>
      </div>
      <div className="row">
        <div className="col-10">
          <div className="profile-info">
            <div className="profile-picture">
              <img src={data.photoURL ?? "https://pbs.twimg.com/media/FuNWEzlWcAEui0L.jpg"} alt="" />
            </div>
            <div className="profile-name">
              <h1 className="mb-none">{data.displayName ?? "NoName"}</h1>
              <p>Regular account · Paris, France</p>
            </div>
            <div className="profile-stats mb-m">
              <p>200 followers, 0 songs</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function links() {
  return [
    { rel: "stylesheet", href: profile },
  ]
}