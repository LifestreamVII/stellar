import { db } from "~/firebase.client";
import { doc, getDoc } from "firebase/firestore";

async function getCommunity(communityId: string) {

  // Fetch community document
  const communityDoc = doc(db, "communities", communityId);

  const communitySnap = await getDoc(communityDoc);

  // if the document exists
  if (communitySnap.exists()) {
    // Get data from the doc
    const communityData = communitySnap.data();

    return communityData;

  } else {
    console.error("No such document exists!");
  }
}

export { getCommunity };