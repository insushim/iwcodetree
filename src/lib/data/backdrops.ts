import type { BackdropDefinition } from "@/types/user";

export const BACKDROP_LIBRARY: BackdropDefinition[] = [
  {
    id: "blank_white",
    name: "빈 화면",
    category: "기본",
    tags: ["기본", "빈", "흰색"],
    svg: `<svg viewBox="0 0 480 360" xmlns="http://www.w3.org/2000/svg"><rect width="480" height="360" fill="#fff"/></svg>`,
  },
  {
    id: "sky_blue",
    name: "파란 하늘",
    category: "자연",
    tags: ["하늘", "구름", "낮"],
    svg: `<svg viewBox="0 0 480 360" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#4FC3F7"/><stop offset="100%" stop-color="#B3E5FC"/></linearGradient></defs>
  <rect width="480" height="360" fill="url(#sky)"/>
  <rect y="280" width="480" height="80" fill="#81C784"/>
  <rect y="280" width="480" height="10" fill="#A5D6A7" opacity="0.5"/>
  <ellipse cx="100" cy="80" rx="50" ry="25" fill="#fff" opacity="0.9"/>
  <ellipse cx="130" cy="75" rx="40" ry="20" fill="#fff" opacity="0.9"/>
  <ellipse cx="80" cy="78" rx="35" ry="18" fill="#fff" opacity="0.85"/>
  <ellipse cx="340" cy="120" rx="60" ry="22" fill="#fff" opacity="0.8"/>
  <ellipse cx="370" cy="115" rx="45" ry="18" fill="#fff" opacity="0.85"/>
  <ellipse cx="310" cy="118" rx="30" ry="15" fill="#fff" opacity="0.75"/>
  <circle cx="420" cy="50" r="30" fill="#FFF9C4" opacity="0.7"/>
</svg>`,
  },
  {
    id: "night_sky",
    name: "밤하늘",
    category: "자연",
    tags: ["밤", "별", "달"],
    svg: `<svg viewBox="0 0 480 360" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="night" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#0D1B2A"/><stop offset="100%" stop-color="#1B3A5C"/></linearGradient></defs>
  <rect width="480" height="360" fill="url(#night)"/>
  <circle cx="380" cy="60" r="30" fill="#FFF9C4"/>
  <circle cx="370" cy="55" r="28" fill="#0D1B2A"/>
  <circle cx="50" cy="40" r="1.5" fill="#fff"/><circle cx="120" cy="80" r="1" fill="#fff"/><circle cx="200" cy="30" r="1.5" fill="#fff"/>
  <circle cx="280" cy="60" r="1" fill="#fff"/><circle cx="160" cy="120" r="1.5" fill="#fff"/><circle cx="420" cy="130" r="1" fill="#fff"/>
  <circle cx="80" cy="160" r="1" fill="#fff"/><circle cx="300" cy="150" r="1.5" fill="#fff"/><circle cx="450" cy="40" r="1" fill="#fff"/>
  <circle cx="30" cy="100" r="1" fill="#fff"/><circle cx="240" cy="90" r="1.5" fill="#fff"/><circle cx="350" cy="170" r="1" fill="#fff"/>
  <circle cx="100" cy="200" r="1" fill="#fff"/><circle cx="440" cy="90" r="1" fill="#fff"/><circle cx="180" cy="180" r="1.5" fill="#fff"/>
  <polygon points="200,28 201,32 205,32 202,34 203,38 200,36 197,38 198,34 195,32 199,32" fill="#FFD740" opacity="0.8"/>
  <polygon points="50,38 51,42 55,42 52,44 53,48 50,46 47,48 48,44 45,42 49,42" fill="#FFD740" opacity="0.6"/>
  <rect y="300" width="480" height="60" fill="#1A3A1A" opacity="0.6"/>
</svg>`,
  },
  {
    id: "underwater",
    name: "바다 속",
    category: "자연",
    tags: ["바다", "물", "수중"],
    svg: `<svg viewBox="0 0 480 360" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="water" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#29B6F6"/><stop offset="100%" stop-color="#0D47A1"/></linearGradient></defs>
  <rect width="480" height="360" fill="url(#water)"/>
  <rect y="320" width="480" height="40" fill="#5D4037" rx="4"/>
  <rect y="316" width="480" height="8" fill="#8D6E63" opacity="0.6"/>
  <path d="M20,320 Q25,290 22,260 Q20,280 18,300 Q15,280 12,260 Q14,290 20,320Z" fill="#2E7D32" opacity="0.7"/>
  <path d="M30,320 Q34,280 30,250 Q28,270 26,290 Q22,270 20,250 Q24,280 30,320Z" fill="#388E3C" opacity="0.6"/>
  <path d="M440,320 Q445,285 442,255 Q440,275 438,295 Q435,275 432,255 Q436,285 440,320Z" fill="#2E7D32" opacity="0.7"/>
  <path d="M455,320 Q458,295 455,270 Q453,285 451,300 Q448,280 446,260 Q450,290 455,320Z" fill="#388E3C" opacity="0.6"/>
  <circle cx="100" cy="80" r="6" fill="#B3E5FC" opacity="0.3"/>
  <circle cx="104" cy="65" r="4" fill="#B3E5FC" opacity="0.25"/>
  <circle cx="106" cy="55" r="3" fill="#B3E5FC" opacity="0.2"/>
  <circle cx="300" cy="150" r="5" fill="#B3E5FC" opacity="0.3"/>
  <circle cx="298" cy="136" r="3.5" fill="#B3E5FC" opacity="0.25"/>
  <circle cx="200" cy="200" r="4" fill="#B3E5FC" opacity="0.2"/>
  <circle cx="400" cy="100" r="5" fill="#B3E5FC" opacity="0.25"/>
</svg>`,
  },
  {
    id: "forest",
    name: "숲",
    category: "자연",
    tags: ["숲", "나무", "자연"],
    svg: `<svg viewBox="0 0 480 360" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="fsky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#81D4FA"/><stop offset="100%" stop-color="#B3E5FC"/></linearGradient></defs>
  <rect width="480" height="360" fill="url(#fsky)"/>
  <rect y="260" width="480" height="100" fill="#66BB6A"/>
  <rect y="260" width="480" height="15" fill="#81C784" opacity="0.5"/>
  <polygon points="60,260 80,140 100,260" fill="#388E3C"/><rect x="76" y="260" width="8" height="30" fill="#5D4037"/>
  <polygon points="50,260 80,160 110,260" fill="#2E7D32" opacity="0.7"/>
  <polygon points="160,260 190,120 220,260" fill="#388E3C"/><rect x="186" y="260" width="8" height="30" fill="#5D4037"/>
  <polygon points="150,260 190,140 230,260" fill="#43A047" opacity="0.7"/>
  <polygon points="300,260 320,150 340,260" fill="#2E7D32"/><rect x="316" y="260" width="8" height="30" fill="#5D4037"/>
  <polygon points="400,260 430,130 460,260" fill="#388E3C"/><rect x="426" y="260" width="8" height="30" fill="#5D4037"/>
  <polygon points="390,260 430,150 470,260" fill="#43A047" opacity="0.7"/>
</svg>`,
  },
  {
    id: "city",
    name: "도시",
    category: "인공",
    tags: ["도시", "건물", "도로"],
    svg: `<svg viewBox="0 0 480 360" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="csky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#FFB74D"/><stop offset="100%" stop-color="#FFCC80"/></linearGradient></defs>
  <rect width="480" height="360" fill="url(#csky)"/>
  <circle cx="400" cy="60" r="35" fill="#FFF9C4" opacity="0.6"/>
  <rect x="20" y="160" width="60" height="140" fill="#546E7A"/><rect x="28" y="170" width="12" height="14" fill="#FFF9C4" opacity="0.7"/><rect x="48" y="170" width="12" height="14" fill="#FFF9C4" opacity="0.5"/><rect x="28" y="195" width="12" height="14" fill="#FFF9C4" opacity="0.6"/><rect x="48" y="195" width="12" height="14" fill="#FFF9C4" opacity="0.7"/>
  <rect x="100" y="120" width="50" height="180" fill="#607D8B"/><rect x="108" y="130" width="10" height="12" fill="#FFF9C4" opacity="0.6"/><rect x="128" y="130" width="10" height="12" fill="#FFF9C4" opacity="0.7"/><rect x="108" y="155" width="10" height="12" fill="#FFF9C4" opacity="0.5"/><rect x="128" y="155" width="10" height="12" fill="#FFF9C4" opacity="0.6"/>
  <rect x="170" y="80" width="70" height="220" fill="#455A64"/><rect x="180" y="90" width="14" height="16" fill="#FFF9C4" opacity="0.7"/><rect x="204" y="90" width="14" height="16" fill="#FFF9C4" opacity="0.5"/><rect x="180" y="120" width="14" height="16" fill="#FFF9C4" opacity="0.6"/><rect x="204" y="120" width="14" height="16" fill="#FFF9C4" opacity="0.7"/>
  <rect x="260" y="140" width="55" height="160" fill="#546E7A"/><rect x="270" y="150" width="10" height="12" fill="#FFF9C4" opacity="0.6"/>
  <rect x="340" y="100" width="60" height="200" fill="#607D8B"/><rect x="350" y="110" width="12" height="14" fill="#FFF9C4" opacity="0.7"/><rect x="370" y="110" width="12" height="14" fill="#FFF9C4" opacity="0.5"/>
  <rect x="420" y="180" width="50" height="120" fill="#455A64"/>
  <rect y="300" width="480" height="60" fill="#424242"/>
  <line x1="0" y1="320" x2="480" y2="320" stroke="#FFF" stroke-width="2" stroke-dasharray="20,15" opacity="0.5"/>
</svg>`,
  },
  {
    id: "space",
    name: "우주",
    category: "자연",
    tags: ["우주", "별", "행성"],
    svg: `<svg viewBox="0 0 480 360" xmlns="http://www.w3.org/2000/svg">
  <rect width="480" height="360" fill="#0A0A2A"/>
  <circle cx="40" cy="30" r="1" fill="#fff"/><circle cx="100" cy="60" r="1.5" fill="#fff"/><circle cx="180" cy="20" r="1" fill="#fff"/>
  <circle cx="260" cy="50" r="1.5" fill="#fff"/><circle cx="350" cy="30" r="1" fill="#fff"/><circle cx="430" cy="70" r="1.5" fill="#fff"/>
  <circle cx="60" cy="120" r="1" fill="#fff"/><circle cx="150" cy="150" r="1.5" fill="#fff"/><circle cx="240" cy="110" r="1" fill="#fff"/>
  <circle cx="320" cy="140" r="1" fill="#fff"/><circle cx="400" cy="160" r="1.5" fill="#fff"/><circle cx="460" cy="120" r="1" fill="#fff"/>
  <circle cx="80" cy="220" r="1" fill="#fff"/><circle cx="200" cy="250" r="1.5" fill="#fff"/><circle cx="300" cy="230" r="1" fill="#fff"/>
  <circle cx="380" cy="260" r="1" fill="#fff"/><circle cx="450" cy="240" r="1.5" fill="#fff"/><circle cx="30" cy="290" r="1" fill="#fff"/>
  <circle cx="140" cy="300" r="1.5" fill="#fff"/><circle cx="340" cy="310" r="1" fill="#fff"/><circle cx="420" cy="330" r="1" fill="#fff"/>
  <circle cx="380" cy="120" r="30" fill="#E57373" opacity="0.8"/>
  <circle cx="372" cy="115" r="6" fill="#EF9A9A" opacity="0.4"/>
  <circle cx="390" cy="128" r="4" fill="#C62828" opacity="0.3"/>
  <circle cx="120" cy="260" r="22" fill="#FFB74D" opacity="0.7"/>
  <circle cx="120" cy="260" r="22" fill="none" stroke="#FF9800" stroke-width="1" opacity="0.5"/>
  <ellipse cx="120" cy="260" rx="32" ry="6" fill="none" stroke="#FFB74D" stroke-width="2" opacity="0.5" transform="rotate(-20,120,260)"/>
</svg>`,
  },
  {
    id: "desert",
    name: "사막",
    category: "자연",
    tags: ["사막", "모래", "선인장"],
    svg: `<svg viewBox="0 0 480 360" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="dsky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#FF8A65"/><stop offset="100%" stop-color="#FFCC80"/></linearGradient></defs>
  <rect width="480" height="360" fill="url(#dsky)"/>
  <circle cx="80" cy="60" r="40" fill="#FFF9C4" opacity="0.8"/>
  <path d="M0,240 Q120,200 240,230 Q360,260 480,220 L480,360 L0,360Z" fill="#E8B960"/>
  <path d="M0,260 Q100,240 200,255 Q300,270 400,250 Q440,245 480,250 L480,360 L0,360Z" fill="#D4A040"/>
  <rect x="150" y="200" width="8" height="50" rx="4" fill="#2E7D32"/>
  <rect x="142" y="210" width="8" height="25" rx="4" fill="#2E7D32" transform="rotate(-30,146,222)"/>
  <rect x="158" y="215" width="8" height="20" rx="4" fill="#2E7D32" transform="rotate(25,162,225)"/>
  <rect x="350" y="210" width="6" height="40" rx="3" fill="#388E3C"/>
  <rect x="344" y="218" width="6" height="18" rx="3" fill="#388E3C" transform="rotate(-35,347,227)"/>
  <rect x="356" y="222" width="6" height="15" rx="3" fill="#388E3C" transform="rotate(30,359,229)"/>
</svg>`,
  },
  {
    id: "classroom",
    name: "교실",
    category: "인공",
    tags: ["교실", "학교", "칠판"],
    svg: `<svg viewBox="0 0 480 360" xmlns="http://www.w3.org/2000/svg">
  <rect width="480" height="360" fill="#FFF8E1"/>
  <rect y="280" width="480" height="80" fill="#8D6E63"/>
  <rect x="40" y="40" width="400" height="180" rx="4" fill="#2E7D32"/>
  <rect x="50" y="50" width="380" height="160" fill="#388E3C"/>
  <text x="240" y="140" text-anchor="middle" font-size="24" fill="#C8E6C9" font-family="sans-serif" opacity="0.6">A + B = ?</text>
  <rect x="220" y="220" width="40" height="10" fill="#FFF9C4"/>
  <rect x="230" y="210" width="4" height="12" fill="#BCAAA4"/>
  <rect x="246" y="212" width="4" height="10" fill="#BCAAA4"/>
  <rect x="80" y="290" width="80" height="50" fill="#6D4C41" rx="2"/>
  <rect x="200" y="290" width="80" height="50" fill="#6D4C41" rx="2"/>
  <rect x="320" y="290" width="80" height="50" fill="#6D4C41" rx="2"/>
</svg>`,
  },
  {
    id: "playground",
    name: "운동장",
    category: "인공",
    tags: ["운동장", "축구", "잔디"],
    svg: `<svg viewBox="0 0 480 360" xmlns="http://www.w3.org/2000/svg">
  <rect width="480" height="360" fill="#4CAF50"/>
  <rect x="20" y="20" width="440" height="320" fill="none" stroke="#fff" stroke-width="3"/>
  <line x1="240" y1="20" x2="240" y2="340" stroke="#fff" stroke-width="2"/>
  <circle cx="240" cy="180" r="50" fill="none" stroke="#fff" stroke-width="2"/>
  <circle cx="240" cy="180" r="3" fill="#fff"/>
  <rect x="20" y="120" width="60" height="120" fill="none" stroke="#fff" stroke-width="2"/>
  <rect x="400" y="120" width="60" height="120" fill="none" stroke="#fff" stroke-width="2"/>
  <rect x="20" y="150" width="25" height="60" fill="none" stroke="#fff" stroke-width="2"/>
  <rect x="435" y="150" width="25" height="60" fill="none" stroke="#fff" stroke-width="2"/>
  <path d="M0,0 L0,360" stroke="#66BB6A" stroke-width="480" stroke-dasharray="360" opacity="0.1"/>
</svg>`,
  },
  {
    id: "maze",
    name: "미로",
    category: "게임",
    tags: ["미로", "게임", "퍼즐"],
    svg: `<svg viewBox="0 0 480 360" xmlns="http://www.w3.org/2000/svg">
  <rect width="480" height="360" fill="#E8F5E9"/>
  <rect x="0" y="0" width="480" height="20" fill="#2E7D32"/>
  <rect x="0" y="340" width="480" height="20" fill="#2E7D32"/>
  <rect x="0" y="0" width="20" height="360" fill="#2E7D32"/>
  <rect x="460" y="0" width="20" height="360" fill="#2E7D32"/>
  <rect x="80" y="20" width="20" height="100" fill="#2E7D32"/>
  <rect x="80" y="100" width="120" height="20" fill="#2E7D32"/>
  <rect x="180" y="60" width="20" height="80" fill="#2E7D32"/>
  <rect x="240" y="20" width="20" height="120" fill="#2E7D32"/>
  <rect x="300" y="80" width="100" height="20" fill="#2E7D32"/>
  <rect x="380" y="80" width="20" height="100" fill="#2E7D32"/>
  <rect x="60" y="180" width="140" height="20" fill="#2E7D32"/>
  <rect x="180" y="180" width="20" height="100" fill="#2E7D32"/>
  <rect x="240" y="200" width="120" height="20" fill="#2E7D32"/>
  <rect x="340" y="200" width="20" height="80" fill="#2E7D32"/>
  <rect x="60" y="260" width="80" height="20" fill="#2E7D32"/>
  <rect x="120" y="260" width="20" height="80" fill="#2E7D32"/>
  <rect x="240" y="280" width="100" height="20" fill="#2E7D32"/>
  <rect x="400" y="260" width="60" height="20" fill="#2E7D32"/>
  <circle cx="40" cy="40" r="8" fill="#F44336" opacity="0.7"/>
  <circle cx="440" cy="320" r="8" fill="#4CAF50" opacity="0.7"/>
</svg>`,
  },
  {
    id: "grid",
    name: "격자",
    category: "학습",
    tags: ["격자", "좌표", "수학"],
    svg: `<svg viewBox="0 0 480 360" xmlns="http://www.w3.org/2000/svg">
  <rect width="480" height="360" fill="#FAFAFA"/>
  <g stroke="#E0E0E0" stroke-width="0.5">
    <line x1="0" y1="30" x2="480" y2="30"/><line x1="0" y1="60" x2="480" y2="60"/><line x1="0" y1="90" x2="480" y2="90"/>
    <line x1="0" y1="120" x2="480" y2="120"/><line x1="0" y1="150" x2="480" y2="150"/>
    <line x1="0" y1="210" x2="480" y2="210"/><line x1="0" y1="240" x2="480" y2="240"/>
    <line x1="0" y1="270" x2="480" y2="270"/><line x1="0" y1="300" x2="480" y2="300"/><line x1="0" y1="330" x2="480" y2="330"/>
    <line x1="30" y1="0" x2="30" y2="360"/><line x1="60" y1="0" x2="60" y2="360"/><line x1="90" y1="0" x2="90" y2="360"/>
    <line x1="120" y1="0" x2="120" y2="360"/><line x1="150" y1="0" x2="150" y2="360"/>
    <line x1="180" y1="0" x2="180" y2="360"/><line x1="210" y1="0" x2="210" y2="360"/>
    <line x1="270" y1="0" x2="270" y2="360"/><line x1="300" y1="0" x2="300" y2="360"/>
    <line x1="330" y1="0" x2="330" y2="360"/><line x1="360" y1="0" x2="360" y2="360"/>
    <line x1="390" y1="0" x2="390" y2="360"/><line x1="420" y1="0" x2="420" y2="360"/>
    <line x1="450" y1="0" x2="450" y2="360"/>
  </g>
  <line x1="240" y1="0" x2="240" y2="360" stroke="#BDBDBD" stroke-width="1.5"/>
  <line x1="0" y1="180" x2="480" y2="180" stroke="#BDBDBD" stroke-width="1.5"/>
  <text x="244" y="14" font-size="10" fill="#9E9E9E" font-family="monospace">y</text>
  <text x="466" y="176" font-size="10" fill="#9E9E9E" font-family="monospace">x</text>
  <text x="244" y="192" font-size="9" fill="#BDBDBD" font-family="monospace">0</text>
</svg>`,
  },
];
