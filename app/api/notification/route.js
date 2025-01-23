import { NextResponse } from "next/server";
import admin from "firebase-admin";

// Initialize Firebase Admin SDK only if no apps are initialized
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      type: process.env.FIREBASE_TYPE,
      projectId: process.env.FIREBASE_PROJECT_ID,
      privateKeyId: process.env.FIREBASE_PRIVATE_KEY_ID,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'), 
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      clientId: process.env.FIREBASE_CLIENT_ID,
      authUri: process.env.FIREBASE_AUTH_URI,
      tokenUri: process.env.FIREBASE_TOKEN_URI,
      authProviderX509CertUrl: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
      clientC509CertUrl: process.env.FIREBASE_CLIENT_X509_CERT_URL,
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
      token: token, 
    };
    console.log(payload);
    
    // Send the notification
    const response = await admin.messaging().send(payload);
    console.log(response);
    
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
