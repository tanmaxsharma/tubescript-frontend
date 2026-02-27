import Head from "next/head";
import Link from "next/link";

export default function Terms() {
  return (
    <>
      <Head>
        <title>Terms of Use — TubeScript</title>
        <meta name="robots" content="noindex" />
      </Head>
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "60px 24px", fontFamily: "DM Sans, sans-serif", color: "#e8e8f0", background: "#0a0a0f", minHeight: "100vh" }}>
        <Link href="/" style={{ color: "#ff8c42", textDecoration: "none", fontSize: 14 }}>← Back to TubeScript</Link>
        <h1 style={{ fontFamily: "Syne, sans-serif", fontSize: 36, fontWeight: 800, margin: "32px 0 24px", color: "#fff" }}>Terms of Use</h1>
        <p style={{ color: "rgba(255,255,255,0.5)", marginBottom: 24, lineHeight: 1.7 }}>Last updated: {new Date().toLocaleDateString()}</p>
        {[
          { title: "Acceptance", body: "By using TubeScript, you agree to these terms. If you disagree, please do not use the service." },
          { title: "Use of Service", body: "TubeScript is provided for personal, educational, and research purposes. You may not use this service to infringe on copyright, scrape at scale, or violate YouTube's Terms of Service." },
          { title: "Disclaimer", body: "TubeScript is not affiliated with YouTube or Google. Transcripts are sourced from YouTube's public caption system. We do not guarantee accuracy of auto-generated captions." },
          { title: "Limitation of Liability", body: "TubeScript is provided as-is. We are not responsible for any damages or losses resulting from use of this service." },
          { title: "Changes", body: "We reserve the right to modify these terms at any time. Continued use of the service constitutes acceptance of updated terms." },
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