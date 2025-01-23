import { NextResponse } from "next/server";
import admin from "firebase-admin";

// Initialize Firebase Admin SDK only if no apps are initialized
const privateKey = process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n");
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: privateKey,
    }),
  });
}

export async function POST(request) {
  try {
    const { messageData, token } = await request.json();
    console.log(messageData, token);

    if (!messageData || !token) {
      return NextResponse.json(
        { error: "Missing messageData or token" },
        { status: 400 }
      );
    }

    const payload = {
      notification: {
        title: "Hello",
        body: messageData,
      },
      token: token, // Ensure this is defined and valid
    };

    // Send the notification
    const response = await admin.messaging().send(payload);

    return NextResponse.json(
      { success: true, message: "Notification sent successfully", response },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending notification:", error);
    return NextResponse.json(
      { error: "Failed to send notification", details: error.message },
      { status: 500 }
    );
  }
}
