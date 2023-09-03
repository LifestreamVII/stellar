import Body from "~/components/Body/Body.jsx";
import header from "~/styles/system/nav.css";
import body from "~/styles/system/body.css";
import top from "~/styles/top/news.css";
import activity from "~/styles/activity/activity.css";


export const meta = () => {
  return [
    { title: "Stellar - Cosmo Release" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export function links() {
  return [
    {rel: "stylesheet", href: header},
    {rel: "stylesheet", href: body},
    {rel: "stylesheet", href: top},
    {rel: "stylesheet", href: activity},
  ]
}

export default function Index() {
  return (
    <div className="container">
        <Body className="appbody"/>
    </div>
  );
}
