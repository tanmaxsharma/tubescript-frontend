import Head from "next/head";
import Link from "next/link";

export default function Privacy() {
  return (
    <>
      <Head>
        <title>Privacy Policy — TubeScript</title>
        <meta name="robots" content="noindex" />
      </Head>
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "60px 24px", fontFamily: "DM Sans, sans-serif", color: "#e8e8f0", background: "#0a0a0f", minHeight: "100vh" }}>
        <Link href="/" style={{ color: "#ff8c42", textDecoration: "none", fontSize: 14 }}>← Back to TubeScript</Link>
        <h1 style={{ fontFamily: "Syne, sans-serif", fontSize: 36, fontWeight: 800, margin: "32px 0 24px", color: "#fff" }}>Privacy Policy</h1>
        <p style={{ color: "rgba(255,255,255,0.5)", marginBottom: 24, lineHeight: 1.7 }}>Last updated: {new Date().toLocaleDateString()}</p>

        {[
          { title: "What We Collect", body: "TubeScript does not collect any personal information. We do not require sign-up or login. We use Google Analytics to collect anonymous usage statistics such as page views and general location data." },
          { title: "YouTube Data", body: "We fetch publicly available transcript data from YouTube videos using YouTube's caption system. We do not store transcripts on our servers. All processing happens in real-time." },
          { title: "Cookies", body: "We use Google Analytics cookies to understand how users interact with our service. You can opt out of analytics cookies by using browser extensions like uBlock Origin." },
          { title: "Third-Party Services", body: "We use Google Analytics for usage tracking and Google Translate via the deep-translator library for translation features. These services have their own privacy policies." },
          { title: "Contact", body: "For privacy questions, contact us at: privacy@yourdomain.com" },
        ].map(s => (
          <div key={s.title} style={{ marginBottom: 32 }}>
            <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 12 }}>{s.title}</h2>
            <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>{s.body}</p>
          </div>
        ))}
      </div>
    </>
  );
}