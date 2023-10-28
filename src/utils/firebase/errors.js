import { FirebaseError } from "firebase/app";

/**
 * @param {FirebaseError} firebaseError 
 * @returns {string}
 */
export function getErrorMessage(firebaseError) {
    return firebaseError.code;
}
