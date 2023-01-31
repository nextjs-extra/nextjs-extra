export default function Card({ title, children }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "1rem",
        margin: "1rem",
        width: "300px",
        textAlign: "center",
      }}
    >
      <h3>{title}</h3>
      <p>{children}</p>
    </div>
  );
}
