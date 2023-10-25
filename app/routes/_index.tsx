import Body from "~/components/Body/Body.jsx";
import body from "~/styles/system/body.css";
import top from "~/styles/top/news.css";
import activity from "~/styles/activity/activity.css";
import { useOutletContext } from "@remix-run/react";
import { LoaderFunction } from "@remix-run/node";
import { verifyUser } from "~/guard/guard";
import { redirect } from "@remix-run/node";

export const loader: LoaderFunction = async ({ request }) => {
  try {
    let user = await verifyUser(request);
    // code here will only run if user is signed in
    return user;
  }
  catch (e) {
    return redirect("/login");
  }
};

export const meta = () => {
  return [
    { title: "Stellar - Cosmo Release" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export function links() {
  return [
    { rel: "stylesheet", href: body },
    { rel: "stylesheet", href: top },
    { rel: "stylesheet", href: activity },
  ]
}

export default function Index() {
  const user = useOutletContext();

  return (
    <div className="container">
      {
        user ? (
          <Body />
        ) : (
          ""
        )
      }
    </div>
  );
}
