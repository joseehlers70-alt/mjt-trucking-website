function TruckRig({ className, paint = 'url(#truckBlue)', trailer = 'url(#trailerSteel)' }) {
  return (
    <g className={className}>
      <ellipse className="vehicle-shadow" cx="5" cy="18" rx="40" ry="10" />
      <rect x="-42" y="-13" width="50" height="26" rx="4" fill={trailer} stroke="#8ca3bd" strokeWidth="1.4" />
      <path d="M8 -13 h20 l13 9 v17 H8z" fill={paint} stroke="#a9d8ff" strokeWidth="1.2" />
      <path d="M22 -9 h9 l6 5 h-15z" fill="#d9f1ff" opacity="0.9" />
      <rect x="-34" y="-8" width="34" height="4" rx="2" fill="rgba(255,255,255,0.26)" />
      <rect x="-34" y="3" width="34" height="4" rx="2" fill="rgba(0,0,0,0.22)" />
      <circle cx="-28" cy="14" r="4.2" fill="#04070c" />
      <circle cx="-2" cy="14" r="4.2" fill="#04070c" />
      <circle cx="27" cy="14" r="4.2" fill="#04070c" />
      <circle cx="-28" cy="-14" r="4.2" fill="#04070c" />
      <circle cx="-2" cy="-14" r="4.2" fill="#04070c" />
      <circle cx="27" cy="-14" r="4.2" fill="#04070c" />
      <circle cx="42" cy="-7" r="2.3" fill="#f8fbff" />
      <circle cx="42" cy="7" r="2.3" fill="#f8fbff" />
      <circle cx="-43" cy="-8" r="2" fill="#ff5964" />
      <circle cx="-43" cy="8" r="2" fill="#ff5964" />
    </g>
  );
}

function VanShape({ className }) {
  return (
    <g className={className}>
      <ellipse className="vehicle-shadow" cx="0" cy="15" rx="28" ry="8" />
      <path d="M-26 -11 h35 l15 10 v16 h-50z" fill="url(#vanWhite)" stroke="#e8f4ff" strokeWidth="1.2" />
      <path d="M7 -8 h10 l7 7 H7z" fill="#9edcff" opacity="0.82" />
      <rect x="-18" y="-5" width="20" height="3" rx="1.5" fill="rgba(16,32,52,0.3)" />
      <circle cx="-15" cy="16" r="4" fill="#05070c" />
      <circle cx="17" cy="16" r="4" fill="#05070c" />
      <circle cx="25" cy="-4" r="2" fill="#f8fbff" />
      <circle cx="-26" cy="-5" r="1.8" fill="#ff5964" />
    </g>
  );
}

function DetailVehicle({ x, y, color = '#1c9dff' }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="-22" y="-9" width="44" height="18" rx="3" fill={color} opacity="0.82" />
      <rect x="8" y="-7" width="12" height="14" rx="2" fill="#d7efff" opacity="0.85" />
      <circle cx="-12" cy="10" r="3" fill="#05070c" />
      <circle cx="12" cy="10" r="3" fill="#05070c" />
    </g>
  );
}

export default function TransportMotion() {
  return (
    <section className="section yard section-dark" id="transport-motion">
      <div className="container">
        <div className="section-heading reveal">
          <p className="eyebrow">Visual Brand Feature</p>
          <h2>Transport in Motion</h2>
          <p>
            A premium visual concept inspired by the movement, control, and professionalism behind modern commercial
            transport.
          </p>
        </div>

        <div className="yard-shell reveal" aria-label="Animated commercial transport concept with moving trucks">
          <svg className="yard-svg" viewBox="0 0 1100 620" role="img">
            <defs>
              <radialGradient id="surfaceGlow" cx="50%" cy="34%" r="78%">
                <stop offset="0%" stopColor="#172a42" />
                <stop offset="45%" stopColor="#0a1524" />
                <stop offset="100%" stopColor="#03060b" />
              </radialGradient>
              <linearGradient id="truckBlue" x1="0" x2="1"><stop offset="0%" stopColor="#0c63ff" /><stop offset="100%" stopColor="#82d7ff" /></linearGradient>
              <linearGradient id="trailerSteel" x1="0" x2="1"><stop offset="0%" stopColor="#dfe8f2" /><stop offset="100%" stopColor="#8fa2b8" /></linearGradient>
              <linearGradient id="vanWhite" x1="0" x2="1"><stop offset="0%" stopColor="#f7fbff" /><stop offset="100%" stopColor="#9fb6ce" /></linearGradient>
              <filter id="premiumGlow" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="5" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
            </defs>

            <rect width="1100" height="620" fill="url(#surfaceGlow)" />
            <path className="perspective-grid" d="M80 520 H1020 M120 450 H980 M160 380 H940 M200 310 H900 M240 240 H860 M285 170 H815 M115 110 L60 560 M260 110 L210 560 M405 110 L360 560 M550 110 L550 560 M695 110 L740 560 M840 110 L930 560 M985 110 L1090 560" />
            <rect className="motion-frame" x="46" y="42" width="1008" height="526" rx="28" />
            <path d="M150 92 h548 l58 58 v136 H120 V122z" fill="#17263a" stroke="#4d6682" strokeWidth="2" />
            <text x="154" y="77" fill="#edf7ff" fontSize="22" fontWeight="800">MJT Commercial Vehicle Centre</text>
            <text x="780" y="76" fill="#8fb0d3" fontSize="13" fontWeight="800">VISUAL CONCEPT</text>
            {[190, 330, 470, 610].map((x, index) => <g key={x}><rect x={x} y="150" width="104" height="94" rx="7" fill="#15263a" stroke="#7390ad" /><circle className={`status-light status-light-${index + 1}`} cx={x + 52} cy="136" r="7" /></g>)}
            <path className="road-band road-band-a" d="M92 492 C218 472 293 379 416 354 C577 321 622 223 734 200 C842 178 930 225 1015 288" />
            <path className="road-band road-band-b" d="M948 474 C835 463 732 413 645 332 C557 250 461 247 342 248" />
            <path className="road-band road-band-c" d="M340 505 C417 451 448 371 415 278 C394 219 352 187 298 160" />
            <path className="route route-one" d="M96 492 C218 472 293 379 416 354 C577 321 622 223 734 200" />
            <path className="route route-two" d="M948 474 C835 463 732 413 645 332 C557 250 461 247 342 248" />
            <path className="route route-three" d="M340 505 C417 451 448 371 415 278 C394 219 352 187 298 160" />
            <g className="display-bays">{Array.from({ length: 8 }).map((_, index) => <g key={index}><path d={`M${172 + index * 76} 420 l52 -16 v76 l-52 14z`} fill="rgba(32, 53, 79, 0.42)" stroke="#3b5573" />{index % 2 === 0 && <DetailVehicle x={198 + index * 76} y={444} color={index % 4 === 0 ? '#1c9dff' : '#dce8f6'} />}</g>)}<text x="176" y="386" fill="#9db7d3" fontSize="15" fontWeight="800">DISPLAY BAYS</text></g>
            <g className="gate"><path d="M830 392 h180 l24 24 v98 H830z" fill="#0f1a29" stroke="#4c6380" strokeWidth="2" /><text x="864" y="378" fill="#9db7d3" fontSize="15" fontWeight="800">GATE AREA</text><rect x="861" y="446" width="20" height="54" rx="3" fill="#243854" /><rect className="boom" x="875" y="448" width="112" height="9" rx="5" fill="#1c9dff" /><circle className="gate-light" cx="1004" cy="416" r="8" /></g>
            <g className="dashboard-readout"><rect x="772" y="112" width="232" height="116" rx="14" fill="rgba(5, 10, 18, 0.58)" stroke="#234563" /><text x="794" y="143" fill="#f2f8ff" fontSize="17" fontWeight="800">Transport Pulse</text><path className="readout-line" d="M794 178 H982" /><path className="readout-line readout-line-b" d="M794 202 H940" /><circle className="status-light status-light-5" cx="970" cy="143" r="7" /></g>
            <g filter="url(#premiumGlow)"><TruckRig className="truck truck-arrive" /><TruckRig className="truck truck-reverse" paint="url(#vanWhite)" /><TruckRig className="truck truck-exit" paint="#36d399" trailer="url(#trailerSteel)" /><VanShape className="truck van-loop" /></g>
            <g className="motion-labels"><text x="96" y="530" fill="#dbeeff" fontSize="14" fontWeight="800">ENTRY ROUTE</text><text x="648" y="354" fill="#dbeeff" fontSize="14" fontWeight="800">TRANSPORT FLOW</text><text x="344" y="286" fill="#dbeeff" fontSize="14" fontWeight="800">REVERSE POSITION</text></g>
          </svg>
        </div>
      </div>
    </section>
  );
}
