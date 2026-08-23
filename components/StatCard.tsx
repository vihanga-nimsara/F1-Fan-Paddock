type StatCardProps = {
  label: string;
  value: string;
  sub?: string;
};

export default function StatCard({ label, value, sub }: StatCardProps) {
  return (
    <div
      style={{
        background: "var(--f1-carbon)",
        border: "1px solid var(--f1-line)",
        borderTop: "3px solid var(--f1-red)",
        padding: "20px 22px",
      }}
    >
      <div className="eyebrow">{label}</div>
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "2rem",
          fontWeight: 600,
          marginTop: 8,
          lineHeight: 1,
        }}
      >
        {value}
      </div>
      {sub && (
        <div
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.8rem",
            color: "var(--f1-grey-light)",
            marginTop: 6,
          }}
        >
          {sub}
        </div>
      )}
    </div>
  );
}
