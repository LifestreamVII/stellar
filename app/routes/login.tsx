import { auth as serverAuth } from "~/firebase.server";
import { ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { session } from "~/cookies";
import { Welcome } from "~/components/Body/Welcome";
import body from "~/styles/system/body.css";

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const idToken = form.get("idToken")?.toString();

  // Verify the idToken is actually valid
  await serverAuth.verifyIdToken(idToken);

  const jwt = await serverAuth.createSessionCookie(idToken, {
    // 5 days - can be up to 2 weeks
    expiresIn: 60 * 60 * 24 * 5 * 1000,
  });

  return redirect("/", {
    headers: {
      "Set-Cookie": await session.serialize(jwt),
    },
  });
};

export default function Login() {
  return (

    <div className="container">
      <Welcome />
    </div>
    // ...

  )
}

export function links() {
  return [
    { rel: "stylesheet", href: body },
  ]
}