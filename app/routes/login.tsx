import { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { LoaderFunction } from "@remix-run/node";
import {
  Form,
  useLoaderData,
  useActionData,
  useSearchParams
} from "@remix-run/react";
import { redirect } from "@remix-run/node";
import { Welcome } from "~/components/Body/Welcome";
import { checkSessionCookie, getSession, commitSession, signInUser, signUpUser } from '~/guard/guard';
import { useState } from "react";
import body from "~/styles/system/body.css";
import background from "~/styles/system/backgrounds/login.css";

type ActionData = {
  formError?: string;
  fieldErrors?: {
    username: string | undefined;
    password: string | undefined;
  };
  fields?: {
    loginType: string;
    username: string;
    password: string;
  };
};

function validateUsername(username: unknown) {
  if (typeof username !== "string" || username.length < 3) {
    return `Usernames must be at least 3 characters long`;
  }
}

function validatePassword(password: unknown) {
  if (typeof password !== "string" || password.length < 6) {
    return `Passwords must be at least 6 characters long`;
  }
}

function validateUrl(url: any) {
  let urls = ["/"];
  if (urls.includes(url)) {
    return url;
  }
  return "/";
}

const badRequest = (data: ActionData) => {
  return json(data, { status: 400 });
}


export const action: ActionFunction = async ({
  request,
}) => {
  const form = await request.formData();
  console.log(form.get("username"));
  console.log(form.get("password"));
  console.log(form.get("loginType"));
  const loginType = form.get("loginType");
  const username = form.get("username");
  const password = form.get("password");
  const redirectTo = validateUrl(
    form.get("redirectTo") || "/"
  );
  if (
    typeof loginType !== "string" ||
    typeof username !== "string" ||
    typeof password !== "string" ||
    typeof redirectTo !== "string"
  ) {
    return badRequest({
      formError: `Invalid field(s).`,
    });
  }

  const fields = { loginType, username, password };
  const fieldErrors = {
    username: validateUsername(username),
    password: validatePassword(password),
  };

  if (Object.values(fieldErrors).some(Boolean))
    return badRequest({ fieldErrors, fields });

  switch (loginType) {
    case "login": {
      let { sessionCookie } = await signInUser({username, password});
      const session = await getSession(request.headers.get('cookie'));
      session.set('session', sessionCookie);
      return redirect("/", {
      headers: {
        'Set-Cookie': await commitSession(session)
      }});
    }
    default: {
      return badRequest({
        fields,
        formError: `Login type invalid`,
      });
    }
  }
};

export const loader = async ({ request }) => {
  const session = await getSession(request.headers.get('cookie'));
  const { uid } = await checkSessionCookie(session);
  const headers = {
    'Set-Cookie': await commitSession(session)
  };
  if (uid) {
    return redirect('/', { headers });
  }
  return json({}, { headers });
};


export default function Login() {

  const actionData = useActionData<ActionData>();
  const [formType, setFormType] = useState("login");

  return (
    <div className="mainContent">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-5 p-none">
            <div className="left-content">
              <div className="spotify-icon">
                <i className="fab fa-spotify"></i>
              </div>
              <h1 className='captionxl'>Welcome to Stellar</h1>
              <p className="spotify-description">Discover new music and enjoy your favorite tracks.</p>
            </div>
          </div>
          <div className="col-12 col-md-5 p-none">
            <div className="welcome-container">
              <div className="text-center logo">
                <img src="stellar.png" alt="logo" />
              </div>
              <form action="" method="post" >
                <div className="form-group">
                  <div className="input-group">
                    <input type="email" name="username" className="form-control" placeholder="Username" defaultValue={actionData?.fields?.username} aria-invalid={Boolean(actionData?.fieldErrors?.username)} aria-errormessage={actionData?.fieldErrors?.username ? "username-error" : undefined}/>
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <div className="input-group-prepend input-group-prepend-text">
                      <span className="input-group-text">
                        <i className="fas fa-lock"></i>
                      </span>
                    </div>
                    <input type="password" name="password" className="form-control" placeholder="Password" defaultValue={ actionData?.fields?.password } aria-invalid={Boolean(actionData?.fieldErrors?.password) || undefined} aria-errormessage={actionData?.fieldErrors?.password ? "password-error" : undefined}/>
                  </div>
                </div>
                <div className="actions">
                  <button type="submit" className="mb-none">Login</button>
                  <a href="/login">Create an account</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function links() {
  return [
    { rel: "stylesheet", href: body },
    { rel: "stylesheet", href: background },
  ]
}