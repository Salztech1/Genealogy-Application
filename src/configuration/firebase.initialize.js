import {firebaseConfig} from "./firebase.config";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// import 'firebase/firestore';
// import 'firebase/auth'

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
// const db = firebase.firestore();
// const auth = firebase.auth();

// export { db, auth };
