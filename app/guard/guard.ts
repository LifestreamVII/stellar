import { redirect,json } from "@remix-run/node";
import { session } from "~/cookies";
import { auth as serverAuth } from "~/firebase.server";


async function verifyUserRole(request: Request, expectedRole: string) {
    let user = null // somehow get the user
    //if (user?.role === expectedRole) return user;
    throw json({ message: "Forbidden" }, { status: 403 });
}

async function verifyUser(request: Request) {
    // Get the cookie value (JWT)
    const jwt = await session.parse(request.headers.get("Cookie"));

    // No JWT found...
    if (!jwt) {
      throw json({ message: "Forbidden" }, { status: 403 });
    }
  
    try {
      const user = await serverAuth.verifySessionCookie(jwt);

      if (!user.uid){
          throw json({ message: "Forbidden" }, { status: 403 });
      }
      else {
          return user;
      }
    } catch (e: any) {
      // Invalid JWT or any other Err
      console.error(e);
      throw json({ message: "Forbidden" }, { status: 403 });
    }
}

function requireHTTPS(request: Request) {
  let url = new URL(request.url);
  if (url.protocol === "https:") return;
  url.protocol = "https:";
  throw redirect(url.toString());
}
  
export {verifyUserRole, verifyUser, requireHTTPS}