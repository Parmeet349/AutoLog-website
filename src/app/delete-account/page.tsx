export default function DeleteAccountPage() {
  return (
    <main className="bg-[#0B0F19] text-white min-h-screen">
      <section className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-6">Delete Your AutoLog Account</h1>

        <p className="text-gray-300 mb-6">
          AutoLog allows users to request deletion of their account and associated data
          at any time.
        </p>

        <h2 className="text-2xl font-semibold mb-4">How to Request Account Deletion</h2>
        <ul className="list-disc list-inside text-gray-400 mb-6 space-y-2">
          <li>Send an email to <strong>info@askstudios.net</strong></li>
          <li>Use the subject line: <strong>Account Deletion Request</strong></li>
          <li>Include the email address associated with your AutoLog account</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">What Data Is Deleted</h2>
        <p className="text-gray-300 mb-6">
          Upon verification, we permanently delete your account, vehicle data,
          expense logs, service records, reminders, and related information
          from our systems.
        </p>

        <h2 className="text-2xl font-semibold mb-4">Retention Period</h2>
        <p className="text-gray-300 mb-6">
          Some data may be retained for up to 30 days to comply with legal,
          security, or operational requirements before being permanently removed.
        </p>

        <h2 className="text-2xl font-semibold mb-4">Contact</h2>
        <p className="text-gray-300">
          For questions related to account deletion, contact us at
          <strong className="text-white"> info@askstudios.net</strong>.
        </p>
      </section>
    </main>
  );
}
