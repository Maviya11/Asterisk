/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
import * as functions from "firebase-functions/v1";
import {processProfileLogic} from "./profile-logic";
import {processRecurringLogic} from "./recurring-logic";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// Runs every day at 00:00 (midnight) IST
export const dailyUpdate = functions.pubsub
  .schedule("0 0 * * *")
  .timeZone("Asia/Kolkata")
  .onRun(async () => {
    await processRecurringLogic();
  });

// Runs only on the last day of every month at 23:59 IST
export const monthlyUpdate = functions.pubsub
  .schedule("59 23 28-31 * *")
  .timeZone("Asia/Kolkata")
  .onRun(async () => {
    await processProfileLogic();
  });
