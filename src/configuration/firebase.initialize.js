import {firebaseConfig} from "./firebase.config";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

