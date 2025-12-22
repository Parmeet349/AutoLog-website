"use server";

import { db } from "./firebaseAdmin";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function joinWaitlist(formData: FormData) {
    const email = formData.get("email")?.toString().trim().toLowerCase();
    const source = formData.get("source")?.toString() || "website";

    if (!email) {
        return { success: false };
    }

    try {
        // 1️⃣ Save / deduplicate email in Firestore
        await db.collection("waitlist").doc(email).set(
            {
                email,
                source,
                createdAt: new Date(),
            },
            { merge: true }
        );

        // 2️⃣ Send welcome email
        if (process.env.RESEND_API_KEY) {
            await resend.emails.send({
                from: process.env.FROM_EMAIL!,
                to: email,
                subject: "Welcome to AutoLog 🚗",
                html: `
          <p>You're officially on the <strong>AutoLog</strong> waitlist.</p>
          <p>We'll share updates, pro tips, and early access soon.</p>
          <p>– AutoLog Team</p>
        `,
            });
        }

        return { success: true };
    } catch (error) {
        console.error("Waitlist error:", error);
        return { success: false };
    }
}
