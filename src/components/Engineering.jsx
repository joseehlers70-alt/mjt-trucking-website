export default function Engineering() {
  return (
    <section className="section engineering">
      <div className="container split split--wide">
        <div className="section-copy reveal">
          <p className="eyebrow">Commercial Performance</p>
          <h2>Built Around Commercial Performance</h2>
          <p>
            Vehicle choice should support the job, the route, the payload expectation, and the way the business operates.
            MJT Trucking keeps the conversation focused on practical performance and professional readiness.
          </p>
          <div className="tech-tags"><span>Payload</span><span>Route demand</span><span>Fleet fit</span><span>Daily use</span></div>
        </div>
        <div className="blueprint reveal">
          <img src="/images/truck-engineering-drawing.png" alt="Engineering drawing of a commercial truck" />
          <span className="blueprint-label label-a">Chassis focus</span><span className="blueprint-label label-b">Load planning</span><span className="blueprint-label label-c">Commercial readiness</span>
        </div>
      </div>
    </section>
  );
}
