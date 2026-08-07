export default function GenreBanner({ title, description }) {
  return (
    <section className="reading-room-hero-section">
      <div className="reading-room-hero-content">
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </section>
  );
}
