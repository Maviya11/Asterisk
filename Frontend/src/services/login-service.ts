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
      // Store profile data
      return apiClient
        .put(`/Users/${user}/profile.json`, {
          level: 1,
          maxXp: 500,
          title: "Beginner",
          xp: 0,
        })
        .then(() => {
          // Store sample chores data
          return apiClient.put(`/Users/${user}/chores.json`, {
            "0": {
              choreDes: "Description",
              mainChore: "This is chore",
              plus: 0,
              minus: 0,
            },
          });
        })
        .then(() => {
          // Store sample expenses data
          return apiClient.put(`/Users/${user}/expenses.json`, {
            "0": {
              amount: 1000,
              category: "Sample",
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
          return user; // Return user UID after everything is stored
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
