import { app } from "../configuration/firebase.initialize";
import { signInWithEmailAndPassword, getAuth, fetchSignInMethodsForEmail, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';


const auth = getAuth(app)



export const createUser = async (user) => {
    try {
        const { email, password, username } = user;

        // Create the user account
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);


        // Set the username for the created user
        await userCredential.user.updateProfile({
            displayName: username,

        });

        localStorage.setItem('user', JSON.stringify(userCredential.user));
        return userCredential.user;
    } catch (e) {
        console.log(e);
    }
};

export async function sendVerificationEmail(user) {
    const auth = getAuth();

    try {
        await sendEmailVerification(auth.currentUser)

        console.log('Verification email sent to user:', user.email)

    } catch (error) {
        console.error('Error sending verification email:', error);
    }
}

async function signInUser(email, password) {
    const auth = getAuth(); // Get Firebase Auth instance
    try {
        // Check if a user exists with the provided email (optional)
        const userRecord = await fetchSignInMethodsForEmail(auth,email);
        if (userRecord.empty) {
            throw new Error('auth/user-not-found'); // Throw custom error
        }
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user; // Return the logged-in user object
    } catch (error) {
        throw error; // Re-throw the error for handling in `onSubmit`
    }
    
}
export { signInUser }