// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAMhgwzhZ6_MOsPZ3M0W6nw5kCCseH0JCM",
  authDomain: "placement-prep-3d5f1.firebaseapp.com",
  projectId: "placement-prep-3d5f1",
  storageBucket: "placement-prep-3d5f1.firebasestorage.app",
  messagingSenderId: "277994707762",
  appId: "1:277994707762:web:3d2cc963f085e4164b552b",
  measurementId: "G-WGSBHWPFCC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize providers
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();

// Configure GitHub provider
githubProvider.addScope('read:user');
githubProvider.addScope('user:email');

export { app, analytics };
export default app;
