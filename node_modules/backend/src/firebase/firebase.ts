import * as admin from "firebase-admin";
import * as path from "path";

const serviceAccountPath = path.resolve(__dirname, "./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountPath),
});

export const auth = admin.auth();
