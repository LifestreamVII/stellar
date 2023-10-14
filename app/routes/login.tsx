import { SyntheticEvent } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth as clientAuth } from "~/firebase.client";
import { auth as serverAuth } from "~/firebase.server";
import { ActionFunction } from "@remix-run/node";
import { useFetcher } from "@remix-run/react";
import { redirect } from "@remix-run/node";
import { session } from "~/cookies";

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
  const fetcher = useFetcher();

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };

    const email = target.email.value;
    const password = target.password.value;

    try {
      const credential = await signInWithEmailAndPassword(
        clientAuth,
        email,
        password,
      );
      const idToken = await credential.user.getIdToken();

      // Trigger a POST request which the action will handle
      fetcher.submit({ idToken }, { method: "post", action: "/login" });
    } catch (e: Error) {
      // Handle errors...
      console.error(e);
    }
  }

  // ...
  return (
    
      <form action="" style={{marginTop: 200}} onSubmit={handleSubmit}>
        <input type="email" name="email" id="" />
        <input type="password" name="password" id="" />
        <button type="submit">Log In</button>
      </form>
      
      // ...
  
  )
}