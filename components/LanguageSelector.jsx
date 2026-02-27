export default function LanguageSelector({ languages, selected, onChange }) {
  if (!languages || languages.length === 0) {
    return (
      <p className="no-lang">
        No language data available
        <style jsx>{`
          .no-lang {
            font-family: 'Outfit', sans-serif; /* ✅ WAS: DM Sans */
            color: rgba(255,255,255,0.3);
            font-size: 13px;
            font-weight: 300;
          }
        `}</style>
      </p>
    );
  }

  return (
    <select
      className="lang-select"
      value={selected}
      onChange={(e) => onChange(e.target.value)}
    >
      {languages.map((lang) => (
        <option key={lang.code} value={lang.code}>
          {lang.name} {lang.auto_generated ? "(Auto)" : ""}
        </option>
      ))}

      <style jsx>{`
        .lang-select {
          width: 100%;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          color: #fff;
          padding: 10px 14px;
          border-radius: 10px;
          font-size: 14px;
          font-family: 'Outfit', sans-serif; /* ✅ WAS: DM Sans */
          font-weight: 300;
          cursor: pointer;
          outline: none;
          transition: border-color 0.2s;
        }
        .lang-select:hover { border-color: rgba(255,75,43,0.4); }
        .lang-select option { background: #1a1a25; color: #fff; }
      `}</style>
    </select>
  );
}