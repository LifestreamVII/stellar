import { db } from "~/firebase.client";
import { verifyUser } from "~/guard/guard"
import { doc, getDoc } from "firebase/firestore";

async function getCommunities(request: Request) {
  // Verify the user
  const user = await verifyUser(request);

  // Fetch user's communities array
  const userDoc = doc(db, "users", user.uid);

  const userSnap = await getDoc(userDoc);

  // if such a user exists
  if (userSnap.exists()) {

    // this fetches the 'communities' array from the 'users' document of the currently logged in user
    const communities = userSnap.data().communities;

    return communities;

  } else {
    console.log("No such user document!");
  }
}

export { getCommunities };