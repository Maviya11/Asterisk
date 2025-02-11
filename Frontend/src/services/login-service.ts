import { apiClient } from "./api-client";
import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

// Create new user
export const createNewUser = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user.uid;
      // Puts the sample chores data.
      return apiClient
        .put(`/Users/${user}/chores.json`, {
          "0": {
            choreDes: "Description",
            mainChore: "This is chore",
            plus: 0,
            minus: 0,
          },
        })
        // Puts the sample expenses data
        .then(() => {
          apiClient.put(`/Users/${user}/expenses.json`, {
            "0": {
              amount: 234,
              category: "Entertainment",
              date: {
                date: 23,
                day: "Monday",
                month: "December",
              },
              description: "This is description",
              recurringInterval: "Monthly",
            },
          });
        })
        .then(() => {
          return user; // Returns the user UID after the PUT request is successful.
        });
    })
    .catch(() => {
      return false;
    });
};

// Signin the user
export const signInUser = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user.uid;
      return user;
    })
    .catch(() => {
      return false;
    });
};
