const stats = [
  ['Commercial', 'vehicles'],
  ['Truck & van', 'sales'],
  ['Boksburg', 'based'],
  ['Fast', 'response'],
];

export default function Stats() {
  return (
    <section className="stats-band" aria-label="MJT Trucking trust indicators">
      <div className="container stats-grid">
        {stats.map(([value, label]) => (
          <div className="stat-card reveal" key={`${value}-${label}`}>
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
