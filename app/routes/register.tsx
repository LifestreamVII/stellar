import { SyntheticEvent } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth as clientAuth } from "~/firebase.client";
import { auth as serverAuth } from "~/firebase.server";
import { ActionFunction } from "@remix-run/node";
import { useFetcher } from "@remix-run/react";
import { redirect } from "@remix-run/node";
import { session } from "~/cookies";
import register from "~/styles/user/register.css";

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

export default function Register() {
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
    
      <form action="" onSubmit={handleSubmit}>
          <div className="register-block">
            <img className="bg-img" src="https://mariongrandvincent.github.io/HTML-Personal-website/img-codePen/bg.jpg" alt=""/>
            <div className="menu">
              <a href="#enregistrer" className="btn-enregistrer active">
                <h2>SIGN UP</h2>
              </a>
            </div>
            <div className="connexion">
              <div className="contact-form">
                <label>USERNAME</label>
                <input placeholder="" type="text"/>

                <label>PASSWORD</label>
                <input placeholder="" type="text"/>

                <div className="check">
                  <label>
                    <input id="check" type="checkbox" className="checkbox"/>
                    <svg xmlns="http://www.w3.org/2000/svg" width="26px" height="23px">
                      <path className="path-back"
                        d="M1.5,6.021V2.451C1.5,2.009,1.646,1.5,2.3,1.5h18.4c0.442,0,0.8,0.358,0.8,0.801v18.398c0,0.442-0.357,0.801-0.8,0.801H2.3c-0.442,0-0.8-0.358-0.8-0.801V6" />
                      <path className="path-moving"
                        d="M24.192,3.813L11.818,16.188L1.5,6.021V2.451C1.5,2.009,1.646,1.5,2.3,1.5h18.4c0.442,0,0.8,0.358,0.8,0.801v18.398c0,0.442-0.357,0.801-0.8,0.801H2.3c-0.442,0-0.8-0.358-0.8-0.801V6" />
                    </svg>
                  </label>
                  <h3>Keep me signed in</h3>
                </div>

                <input className="submit" value="SIGN UP" type="submit"/>
              </div>
              <a href="https://www.grandvincent-marion.fr/" target="_blank">
                <h4>Forgot password?</h4>
              </a>
            </div>
          </div>
      </form>
      
      // ...
  
  )
}

export function links() {
  return [
    {rel: "stylesheet", href: register},
  ]
}