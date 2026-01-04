export default function PrivacyPolicyPage() {
    return (
        <main className="bg-[#0B0F19] text-white min-h-screen">
            <section className="max-w-4xl mx-auto px-6 py-16">
                {/* Header */}
                <header className="text-center mb-14">
                    <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
                    <p className="text-gray-400 text-lg">
                        Last updated: December 2025
                    </p>
                </header>

                {/* Intro */}
                <section className="mb-12">
                    <p className="text-gray-300 leading-relaxed">
                        AutoLog respects your privacy and is committed to protecting your
                        personal information. This Privacy Policy explains how we collect,
                        use, store, and protect your data when you use the AutoLog mobile
                        application and related services.
                    </p>
                </section>

                {/* Information Collected */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4">
                        1. Information We Collect
                    </h2>
                    <p className="text-gray-300 mb-4">
                        AutoLog collects only the information necessary to provide its core
                        features. This information is either provided directly by you or
                        generated through your use of the app.
                    </p>
                    <ul className="list-disc list-inside text-gray-400 space-y-2">
                        <li>Vehicle details (such as name, type, and basic specifications)</li>
                        <li>Expense records, service logs, mileage, and reminders</li>
                        <li>App usage data required for functionality and performance</li>
                    </ul>
                </section>

                {/* How Data Is Used */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4">
                        2. How We Use Your Information
                    </h2>
                    <p className="text-gray-300 mb-4">
                        The information collected is used solely to operate and improve
                        AutoLog. Specifically, your data helps us:
                    </p>
                    <ul className="list-disc list-inside text-gray-400 space-y-2">
                        <li>Display vehicle insights and summaries</li>
                        <li>Maintain accurate logs and history</li>
                        <li>Send reminders for services and important dates</li>
                        <li>Improve app performance and user experience</li>
                    </ul>
                </section>

                {/* Data Sharing */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4">
                        3. Data Sharing & Third Parties
                    </h2>
                    <p className="text-gray-300 leading-relaxed">
                        AutoLog does not sell, rent, or trade your personal information.
                        Your data is shared only when required to provide essential services
                        such as secure cloud storage, analytics, or when legally required
                        by applicable laws or regulations.
                    </p>
                </section>

                {/* Data Security */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4">
                        4. Data Security
                    </h2>
                    <p className="text-gray-300 leading-relaxed">
                        We implement reasonable technical and organizational measures to
                        protect your information from unauthorized access, alteration, or
                        disclosure. While no digital system can guarantee absolute security,
                        we continuously work to safeguard your data.
                    </p>
                </section>

                {/* Retention & Deletion */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4">
                        5. Data Retention & Deletion
                    </h2>
                    <p className="text-gray-300 leading-relaxed">
                        Your data is retained only for as long as necessary to provide
                        AutoLog’s services. You may request deletion of your data at any
                        time by contacting our support team.
                    </p>
                </section>

                {/* User Rights */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4">
                        6. Your Rights & Choices
                    </h2>
                    <p className="text-gray-300 leading-relaxed">
                        You have the right to access, update, or delete your information.
                        You may also stop using AutoLog at any time. Continued use of the
                        app indicates acceptance of this Privacy Policy.
                    </p>
                </section>

                {/* Policy Updates */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4">
                        7. Changes to This Policy
                    </h2>
                    <p className="text-gray-300 leading-relaxed">
                        We may update this Privacy Policy from time to time. Any changes
                        will be posted on this page, and the updated date will be reflected
                        at the top of the policy.
                    </p>
                </section>

                {/* Contact */}
                <section>
                    <h2 className="text-2xl font-semibold mb-4">
                        8. Contact Us
                    </h2>
                    <p className="text-gray-300 leading-relaxed">
                        If you have any questions or concerns about this Privacy Policy or
                        how your data is handled, please contact us at:
                    </p>
                    <p className="mt-3 text-white font-medium">
                        support@autolog.app
                    </p>
                </section>
            </section>
        </main>
    );
}
