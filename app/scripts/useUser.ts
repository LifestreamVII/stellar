import { db } from "~/utils/firebase.config";
import { requireAuth } from "~/guard/guard.server";
import { doc, getDoc } from "firebase/firestore";
import { DecodedIdToken } from "firebase-admin/auth";

async function getCommunities(user: DecodedIdToken) {
  // Verify the user
  try{
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
  } catch (e) {
      console.error(e);
  }
}

export { getCommunities };