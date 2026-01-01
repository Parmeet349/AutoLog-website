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
         `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333; line-height: 1.6;">
    <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #1a1a1a; margin-bottom: 10px;">You’re on the list! 🚗</h1>
        <p style="font-size: 18px; color: #666;">Welcome to the future of effortless vehicle management.</p>
    </div>

    <p>Hi there,</p>
    
    <p>Thanks for joining the <strong>AutoLog</strong> waitlist! We’re building the smartest way to track your mileage, maintenance, and expenses without the manual headache.</p>

    <div style="background-color: #f8f9fa; border-left: 4px solid #2563eb; padding: 15px; margin: 25px 0;">
        <p style="margin: 0; font-weight: 600;">What’s next?</p>
        <ul style="margin: 10px 0 0 0; padding-left: 20px;">
            <li><strong>Early Access:</strong> You'll be among the first to test-drive our beta features.</li>
            <li><strong>Priority Perks:</strong> We'll send over exclusive "early bird" pricing once we launch.</li>
            <li><strong>Pro Tips:</strong> We'll share occasional tips on how to maximize your car's resale value.</li>
        </ul>
    </div>

    <p>We’re working hard to get the keys in your hands as soon as possible. Keep an eye on your inbox for updates.</p>

    <p style="margin-top: 30px;">
        Best,<br>
        <strong>The AutoLog Team</strong>
    </p>

    <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;">
    
    <p style="font-size: 12px; color: #999; text-align: center;">
        You're receiving this because you signed up for the AutoLog waitlist.<br>
        If you didn't mean to join, you can safely ignore this email.
    </p>
</div>
`

        `,
            });
        }

        return { success: true };
    } catch (error) {
        console.error("Waitlist error:", error);
        return { success: false };
    }
}
