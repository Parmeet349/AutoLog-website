export const dynamic = "force-dynamic";

import { db } from "@/utils/firebaseAdmin";

export default async function WaitlistAdmin() {
    const snap = await db
        .collection("waitlist")
        .orderBy("createdAt", "desc")
        .get();

    const entries = snap.docs.map(doc => doc.data());

    return (
        <div className="p-10 text-white">
            <h1 className="text-3xl font-bold mb-6">Waitlist</h1>

            <table className="w-full border border-white/10">
                <thead>
                    <tr className="bg-white/5">
                        <th className="p-3 text-left">Email</th>
                        <th className="p-3 text-left">Source</th>
                        <th className="p-3 text-left">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {entries.map((e, i) => (
                        <tr key={i} className="border-t border-white/10">
                            <td className="p-3">{e.email}</td>
                            <td className="p-3">{e.source}</td>
                            <td className="p-3">
                                {new Date(e.createdAt.seconds * 1000).toLocaleDateString()}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
