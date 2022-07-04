import { firebase } from "../lib/firebase";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
const { db } = firebase;

export async function doesUsernameExist(username) {
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("username", "==", username.toLowerCase()));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.length > 0; // return true if some doc exists
}

export async function getUserByUserId(userId) {
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  const user = querySnapshot.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));
  return user;
}

export async function getSuggestedProfiles(userId, following) {
  const usersRef = collection(db, "users");
  const result = await getDocs(usersRef, limit(10));

  // returns all the users not having the same id or is in following
  const returned = result.docs
    .map((item) => ({
      ...item.data(),
      docId: item.id,
    }))
    .filter((item) => {
      if (item.userId === userId || following.includes(item.userId))
        return false;
      return true;
    });

  return returned;
}
