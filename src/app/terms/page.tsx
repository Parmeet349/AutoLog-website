export default function TermsOfServicePage() {
    return (
        <main className="bg-[#0B0F19] text-white min-h-screen">
            <section className="max-w-4xl mx-auto px-6 py-16">
                {/* Header */}
                <header className="text-center mb-14">
                    <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
                    <p className="text-gray-400 text-lg">
                        Last updated: December 2025
                    </p>
                </header>

                {/* Intro */}
                <section className="mb-12">
                    <p className="text-gray-300 leading-relaxed">
                        These Terms of Service (&quot;Terms&quot;) govern your access to and use of the
                        AutoLog mobile application and related services. By accessing or
                        using AutoLog, you agree to be bound by these Terms. If you do not
                        agree, you may not use the app.
                    </p>
                </section>

                {/* Eligibility */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4">
                        1. Eligibility & Account Responsibility
                    </h2>
                    <p className="text-gray-300 leading-relaxed">
                        You must be at least 13 years old to use AutoLog. You are responsible
                        for maintaining the confidentiality of your account credentials and
                        for all activities that occur under your account.
                    </p>
                </section>

                {/* Use of the App */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4">
                        2. Use of the App
                    </h2>
                    <p className="text-gray-300 mb-4">
                        AutoLog is provided for personal, non-commercial use to help you
                        track vehicle-related information. You agree not to:
                    </p>
                    <ul className="list-disc list-inside text-gray-400 space-y-2">
                        <li>Use the app for unlawful or fraudulent purposes</li>
                        <li>Attempt to gain unauthorized access to systems or data</li>
                        <li>Interfere with the app’s performance or security</li>
                        <li>Reverse engineer or redistribute the app</li>
                    </ul>
                </section>

                {/* User Content */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4">
                        3. User-Provided Content
                    </h2>
                    <p className="text-gray-300 leading-relaxed">
                        You retain ownership of all data you submit to AutoLog, including
                        vehicle details, logs, and documents. By using the app, you grant
                        AutoLog permission to store and process this data solely to provide
                        app functionality.
                    </p>
                </section>

                {/* Subscriptions */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4">
                        4. Subscriptions & Payments
                    </h2>
                    <p className="text-gray-300 leading-relaxed">
                        AutoLog may offer paid subscription plans with additional features.
                        Subscriptions are billed through the App Store or Play Store and are
                        subject to their respective payment policies. Refunds and
                        cancellations are handled by the platform where the purchase was
                        made.
                    </p>
                </section>

                {/* Data & Privacy */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4">
                        5. Data & Privacy
                    </h2>
                    <p className="text-gray-300 leading-relaxed">
                        Your use of AutoLog is also governed by our Privacy Policy, which
                        explains how we collect, use, and protect your information. By using
                        the app, you agree to the practices described in the Privacy Policy.
                    </p>
                </section>

                {/* Disclaimer */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4">
                        6. Disclaimer of Warranties
                    </h2>
                    <p className="text-gray-300 leading-relaxed">
                        AutoLog is provided on an &quot;as is&quot; and &quot;as available&quot; basis. We make
                        no warranties regarding accuracy, reliability, or availability of
                        the app or its content. Use of the app is at your own risk.
                    </p>
                </section>

                {/* Limitation of Liability */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4">
                        7. Limitation of Liability
                    </h2>
                    <p className="text-gray-300 leading-relaxed">
                        To the fullest extent permitted by law, AutoLog shall not be liable
                        for any indirect, incidental, or consequential damages arising from
                        your use of the app, including data loss or service interruptions.
                    </p>
                </section>

                {/* Termination */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4">
                        8. Termination
                    </h2>
                    <p className="text-gray-300 leading-relaxed">
                        We reserve the right to suspend or terminate your access to AutoLog
                        at any time if you violate these Terms or misuse the app. You may
                        stop using AutoLog at any time.
                    </p>
                </section>

                {/* Changes */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4">
                        9. Changes to These Terms
                    </h2>
                    <p className="text-gray-300 leading-relaxed">
                        We may update these Terms from time to time. Continued use of AutoLog
                        after changes are posted constitutes acceptance of the updated
                        Terms.
                    </p>
                </section>

                {/* Contact */}
                <section>
                    <h2 className="text-2xl font-semibold mb-4">
                        10. Contact Us
                    </h2>
                    <p className="text-gray-300 leading-relaxed">
                        If you have any questions about these Terms of Service, please
                        contact us at:
                    </p>
                    <p className="mt-3 text-white font-medium">
                        info@askstudios.net
                    </p>
                </section>
            </section>
        </main>
    );
}
