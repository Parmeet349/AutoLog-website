// utils/exportWaitlist.ts
import { db } from "./firebaseAdmin";

export async function exportWaitlistCSV() {
    const snap = await db.collection("waitlist").get();

    const rows = [
        "email,source,createdAt",
        ...snap.docs.map(d => {
            const data = d.data();
            return `${data.email},${data.source},${data.createdAt.toDate().toISOString()}`;
        }),
    ];

    return rows.join("\n");
}
