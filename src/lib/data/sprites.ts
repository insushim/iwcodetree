import type { SpriteDefinition } from "@/types/sprite";

export const SPRITE_LIBRARY: SpriteDefinition[] = [
  // ===== ANIMALS =====
  {
    id: "cat",
    name: "고양이",
    category: "animal",
    defaultSize: 60,
    tags: ["동물", "귀여운", "고양이"],
    costumes: [
      {
        id: "cat-1",
        name: "기본",
        svg: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
  <polygon points="20,30 26,14 32,30" fill="#F4A432" stroke="#D48A20" stroke-width="1.5"/>
  <polygon points="48,30 54,14 60,30" fill="#F4A432" stroke="#D48A20" stroke-width="1.5"/>
  <ellipse cx="40" cy="45" rx="18" ry="20" fill="#F4A432"/>
  <ellipse cx="40" cy="38" rx="15" ry="14" fill="#F4A432" stroke="#D48A20" stroke-width="1"/>
  <circle cx="34" cy="35" r="3" fill="#333"/>
  <circle cx="46" cy="35" r="3" fill="#333"/>
  <circle cx="35" cy="35" r="1" fill="#fff"/>
  <circle cx="47" cy="35" r="1" fill="#fff"/>
  <ellipse cx="40" cy="40" rx="2" ry="1.5" fill="#E87C7C"/>
  <line x1="22" y1="38" x2="32" y2="39" stroke="#D48A20" stroke-width="0.8"/>
  <line x1="22" y1="42" x2="32" y2="41" stroke="#D48A20" stroke-width="0.8"/>
  <line x1="48" y1="39" x2="58" y2="38" stroke="#D48A20" stroke-width="0.8"/>
  <line x1="48" y1="41" x2="58" y2="42" stroke="#D48A20" stroke-width="0.8"/>
  <path d="M58,45 Q68,40 65,55" fill="none" stroke="#F4A432" stroke-width="3" stroke-linecap="round"/>
  <path d="M40,42 Q40,46 42,44" fill="none" stroke="#D48A20" stroke-width="0.6"/>
</svg>`,
      },
      {
        id: "cat-2",
        name: "걷기",
        svg: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
  <polygon points="22,28 28,12 34,28" fill="#F4A432" stroke="#D48A20" stroke-width="1.5"/>
  <polygon points="46,28 52,12 58,28" fill="#F4A432" stroke="#D48A20" stroke-width="1.5"/>
  <ellipse cx="40" cy="43" rx="18" ry="20" fill="#F4A432"/>
  <ellipse cx="40" cy="36" rx="15" ry="14" fill="#F4A432" stroke="#D48A20" stroke-width="1"/>
  <circle cx="34" cy="33" r="3" fill="#333"/>
  <circle cx="46" cy="33" r="3" fill="#333"/>
  <circle cx="35" cy="33" r="1" fill="#fff"/>
  <circle cx="47" cy="33" r="1" fill="#fff"/>
  <ellipse cx="40" cy="38" rx="2" ry="1.5" fill="#E87C7C"/>
  <line x1="22" y1="36" x2="32" y2="37" stroke="#D48A20" stroke-width="0.8"/>
  <line x1="48" y1="37" x2="58" y2="36" stroke="#D48A20" stroke-width="0.8"/>
  <line x1="30" y1="62" x2="26" y2="72" stroke="#F4A432" stroke-width="3" stroke-linecap="round"/>
  <line x1="50" y1="62" x2="54" y2="72" stroke="#F4A432" stroke-width="3" stroke-linecap="round"/>
  <path d="M58,43 Q72,35 68,52" fill="none" stroke="#F4A432" stroke-width="3" stroke-linecap="round"/>
</svg>`,
      },
    ],
  },
  {
    id: "dog",
    name: "강아지",
    category: "animal",
    defaultSize: 60,
    tags: ["동물", "귀여운", "강아지"],
    costumes: [
      {
        id: "dog-1",
        name: "기본",
        svg: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="40" cy="44" rx="18" ry="20" fill="#C4883C"/>
  <ellipse cx="40" cy="36" rx="16" ry="14" fill="#C4883C" stroke="#A06828" stroke-width="1"/>
  <path d="M24,30 Q18,18 14,30" fill="#8B5E2C" stroke="#6B4420" stroke-width="1"/>
  <path d="M56,30 Q62,18 66,30" fill="#8B5E2C" stroke="#6B4420" stroke-width="1"/>
  <circle cx="34" cy="34" r="3" fill="#333"/>
  <circle cx="46" cy="34" r="3" fill="#333"/>
  <circle cx="35" cy="34" r="1" fill="#fff"/>
  <circle cx="47" cy="34" r="1" fill="#fff"/>
  <ellipse cx="40" cy="40" rx="4" ry="3" fill="#E8C8A0"/>
  <ellipse cx="40" cy="39" rx="2.5" ry="2" fill="#333"/>
  <path d="M38,42 Q40,45 42,42" fill="none" stroke="#A06828" stroke-width="0.8"/>
  <ellipse cx="40" cy="60" rx="5" ry="3" fill="#C4883C"/>
</svg>`,
      },
      {
        id: "dog-2",
        name: "꼬리 흔들기",
        svg: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="40" cy="44" rx="18" ry="20" fill="#C4883C"/>
  <ellipse cx="40" cy="36" rx="16" ry="14" fill="#C4883C" stroke="#A06828" stroke-width="1"/>
  <path d="M24,30 Q16,20 14,32" fill="#8B5E2C" stroke="#6B4420" stroke-width="1"/>
  <path d="M56,30 Q64,20 66,32" fill="#8B5E2C" stroke="#6B4420" stroke-width="1"/>
  <circle cx="34" cy="34" r="3" fill="#333"/>
  <circle cx="46" cy="34" r="3" fill="#333"/>
  <circle cx="35" cy="34" r="1" fill="#fff"/>
  <circle cx="47" cy="34" r="1" fill="#fff"/>
  <ellipse cx="40" cy="40" rx="4" ry="3" fill="#E8C8A0"/>
  <ellipse cx="40" cy="39" rx="2.5" ry="2" fill="#333"/>
  <path d="M36,42 Q40,47 44,42" fill="none" stroke="#A06828" stroke-width="0.8"/>
  <path d="M58,40 Q72,30 70,42" fill="none" stroke="#C4883C" stroke-width="4" stroke-linecap="round"/>
</svg>`,
      },
    ],
  },
  {
    id: "rabbit",
    name: "토끼",
    category: "animal",
    defaultSize: 55,
    tags: ["동물", "귀여운", "토끼"],
    costumes: [
      {
        id: "rabbit-1",
        name: "기본",
        svg: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
  <rect x="29" y="6" rx="5" ry="5" width="10" height="24" fill="#F5F5F5" stroke="#DDD" stroke-width="1"/>
  <rect x="41" y="6" rx="5" ry="5" width="10" height="24" fill="#F5F5F5" stroke="#DDD" stroke-width="1"/>
  <rect x="31" y="9" rx="3" ry="3" width="6" height="16" fill="#FFB0B0"/>
  <rect x="43" y="9" rx="3" ry="3" width="6" height="16" fill="#FFB0B0"/>
  <ellipse cx="40" cy="45" rx="17" ry="19" fill="#F5F5F5" stroke="#DDD" stroke-width="1"/>
  <ellipse cx="40" cy="38" rx="14" ry="13" fill="#F5F5F5" stroke="#DDD" stroke-width="1"/>
  <circle cx="34" cy="36" r="2.5" fill="#333"/>
  <circle cx="46" cy="36" r="2.5" fill="#333"/>
  <circle cx="35" cy="35.5" r="0.8" fill="#fff"/>
  <circle cx="47" cy="35.5" r="0.8" fill="#fff"/>
  <ellipse cx="40" cy="41" rx="2" ry="1.5" fill="#FFB0B0"/>
  <line x1="40" y1="42.5" x2="40" y2="45" stroke="#DDD" stroke-width="0.6"/>
  <circle cx="32" cy="40" r="3" fill="#FFD0D0" opacity="0.5"/>
  <circle cx="48" cy="40" r="3" fill="#FFD0D0" opacity="0.5"/>
</svg>`,
      },
    ],
  },
  {
    id: "butterfly",
    name: "나비",
    category: "animal",
    defaultSize: 50,
    tags: ["동물", "곤충", "나비"],
    costumes: [
      {
        id: "butterfly-1",
        name: "날개 펼침",
        svg: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="22" cy="30" rx="14" ry="12" fill="#FF6B9D" stroke="#E0558A" stroke-width="1"/>
  <ellipse cx="58" cy="30" rx="14" ry="12" fill="#FF6B9D" stroke="#E0558A" stroke-width="1"/>
  <ellipse cx="24" cy="48" rx="10" ry="9" fill="#FFB347" stroke="#E09930" stroke-width="1"/>
  <ellipse cx="56" cy="48" rx="10" ry="9" fill="#FFB347" stroke="#E09930" stroke-width="1"/>
  <circle cx="22" cy="28" r="4" fill="#FF3D7F" opacity="0.6"/>
  <circle cx="58" cy="28" r="4" fill="#FF3D7F" opacity="0.6"/>
  <circle cx="24" cy="46" r="3" fill="#FF8C00" opacity="0.5"/>
  <circle cx="56" cy="46" r="3" fill="#FF8C00" opacity="0.5"/>
  <ellipse cx="40" cy="40" rx="3" ry="14" fill="#4A3728"/>
  <circle cx="40" cy="24" r="3" fill="#4A3728"/>
  <circle cx="40" cy="24" r="1.5" fill="#333"/>
  <path d="M38,22 Q34,14 32,12" fill="none" stroke="#4A3728" stroke-width="1" stroke-linecap="round"/>
  <path d="M42,22 Q46,14 48,12" fill="none" stroke="#4A3728" stroke-width="1" stroke-linecap="round"/>
  <circle cx="32" cy="12" r="1.5" fill="#4A3728"/>
  <circle cx="48" cy="12" r="1.5" fill="#4A3728"/>
</svg>`,
      },
      {
        id: "butterfly-2",
        name: "날개 접음",
        svg: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="28" cy="32" rx="10" ry="14" fill="#FF6B9D" stroke="#E0558A" stroke-width="1" transform="rotate(-15,28,32)"/>
  <ellipse cx="52" cy="32" rx="10" ry="14" fill="#FF6B9D" stroke="#E0558A" stroke-width="1" transform="rotate(15,52,32)"/>
  <ellipse cx="30" cy="50" rx="7" ry="10" fill="#FFB347" stroke="#E09930" stroke-width="1" transform="rotate(-10,30,50)"/>
  <ellipse cx="50" cy="50" rx="7" ry="10" fill="#FFB347" stroke="#E09930" stroke-width="1" transform="rotate(10,50,50)"/>
  <ellipse cx="40" cy="40" rx="3" ry="14" fill="#4A3728"/>
  <circle cx="40" cy="24" r="3" fill="#4A3728"/>
  <path d="M38,22 Q34,14 32,12" fill="none" stroke="#4A3728" stroke-width="1" stroke-linecap="round"/>
  <path d="M42,22 Q46,14 48,12" fill="none" stroke="#4A3728" stroke-width="1" stroke-linecap="round"/>
  <circle cx="32" cy="12" r="1.5" fill="#4A3728"/>
  <circle cx="48" cy="12" r="1.5" fill="#4A3728"/>
</svg>`,
      },
    ],
  },
  {
    id: "fish",
    name: "물고기",
    category: "animal",
    defaultSize: 50,
    tags: ["동물", "바다", "물고기"],
    costumes: [
      {
        id: "fish-1",
        name: "기본",
        svg: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
  <polygon points="10,40 22,30 22,50" fill="#3BA8D8"/>
  <ellipse cx="42" cy="40" rx="22" ry="14" fill="#4FC3F7"/>
  <ellipse cx="42" cy="40" rx="22" ry="14" fill="none" stroke="#2196F3" stroke-width="1.5"/>
  <ellipse cx="42" cy="36" rx="18" ry="6" fill="#81D4FA" opacity="0.4"/>
  <path d="M30,34 Q34,38 30,46" fill="none" stroke="#2196F3" stroke-width="0.8" opacity="0.5"/>
  <path d="M38,33 Q42,38 38,47" fill="none" stroke="#2196F3" stroke-width="0.8" opacity="0.5"/>
  <circle cx="52" cy="37" r="3.5" fill="#fff"/>
  <circle cx="53" cy="37" r="2" fill="#333"/>
  <circle cx="53.5" cy="36.5" r="0.7" fill="#fff"/>
  <path d="M56,42 Q60,40 56,38" fill="none" stroke="#2196F3" stroke-width="1"/>
  <path d="M34,28 Q38,24 44,26" fill="none" stroke="#2196F3" stroke-width="2" stroke-linecap="round" opacity="0.6"/>
</svg>`,
      },
    ],
  },
  {
    id: "bird",
    name: "새",
    category: "animal",
    defaultSize: 50,
    tags: ["동물", "하늘", "새"],
    costumes: [
      {
        id: "bird-1",
        name: "날개 위",
        svg: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="40" cy="44" rx="14" ry="12" fill="#FFD740"/>
  <ellipse cx="40" cy="44" rx="14" ry="12" fill="none" stroke="#F9A825" stroke-width="1"/>
  <circle cx="40" cy="34" r="10" fill="#FFD740" stroke="#F9A825" stroke-width="1"/>
  <path d="M18,42 Q10,20 26,36" fill="#FFB300"/>
  <path d="M62,42 Q70,20 54,36" fill="#FFB300"/>
  <circle cx="36" cy="32" r="2.5" fill="#333"/>
  <circle cx="44" cy="32" r="2.5" fill="#333"/>
  <circle cx="36.5" cy="31.5" r="0.8" fill="#fff"/>
  <circle cx="44.5" cy="31.5" r="0.8" fill="#fff"/>
  <polygon points="38,37 40,40 42,37" fill="#FF6D00"/>
  <path d="M36,56 L36,64" stroke="#FF6D00" stroke-width="2" stroke-linecap="round"/>
  <path d="M44,56 L44,64" stroke="#FF6D00" stroke-width="2" stroke-linecap="round"/>
</svg>`,
      },
      {
        id: "bird-2",
        name: "날개 아래",
        svg: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="40" cy="44" rx="14" ry="12" fill="#FFD740"/>
  <ellipse cx="40" cy="44" rx="14" ry="12" fill="none" stroke="#F9A825" stroke-width="1"/>
  <circle cx="40" cy="34" r="10" fill="#FFD740" stroke="#F9A825" stroke-width="1"/>
  <path d="M18,42 Q14,56 26,48" fill="#FFB300"/>
  <path d="M62,42 Q66,56 54,48" fill="#FFB300"/>
  <circle cx="36" cy="32" r="2.5" fill="#333"/>
  <circle cx="44" cy="32" r="2.5" fill="#333"/>
  <circle cx="36.5" cy="31.5" r="0.8" fill="#fff"/>
  <circle cx="44.5" cy="31.5" r="0.8" fill="#fff"/>
  <polygon points="38,37 40,40 42,37" fill="#FF6D00"/>
  <path d="M36,56 L36,64" stroke="#FF6D00" stroke-width="2" stroke-linecap="round"/>
  <path d="M44,56 L44,64" stroke="#FF6D00" stroke-width="2" stroke-linecap="round"/>
</svg>`,
      },
    ],
  },
  {
    id: "dinosaur",
    name: "공룡",
    category: "animal",
    defaultSize: 65,
    tags: ["동물", "귀여운", "공룡"],
    costumes: [
      {
        id: "dino-1",
        name: "기본",
        svg: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="40" cy="48" rx="20" ry="18" fill="#66BB6A"/>
  <ellipse cx="40" cy="48" rx="20" ry="18" fill="none" stroke="#43A047" stroke-width="1.5"/>
  <circle cx="40" cy="32" r="13" fill="#66BB6A" stroke="#43A047" stroke-width="1"/>
  <ellipse cx="40" cy="54" rx="12" ry="4" fill="#A5D6A7" opacity="0.6"/>
  <circle cx="35" cy="29" r="3" fill="#fff"/>
  <circle cx="45" cy="29" r="3" fill="#fff"/>
  <circle cx="36" cy="29" r="2" fill="#333"/>
  <circle cx="46" cy="29" r="2" fill="#333"/>
  <path d="M36,36 Q40,39 44,36" fill="none" stroke="#43A047" stroke-width="1"/>
  <circle cx="40" cy="20" r="2.5" fill="#43A047"/>
  <circle cx="34" cy="21" r="2" fill="#43A047"/>
  <circle cx="46" cy="21" r="2" fill="#43A047"/>
  <path d="M20,48 L16,56" stroke="#66BB6A" stroke-width="4" stroke-linecap="round"/>
  <path d="M60,48 L64,56" stroke="#66BB6A" stroke-width="4" stroke-linecap="round"/>
  <path d="M56,52 Q64,54 62,62 Q58,58 54,60" fill="#66BB6A" stroke="#43A047" stroke-width="1"/>
</svg>`,
      },
    ],
  },
  // ===== CHARACTERS =====
  {
    id: "wizard",
    name: "마법사",
    category: "character",
    defaultSize: 60,
    tags: ["캐릭터", "판타지", "마법사"],
    costumes: [
      {
        id: "wizard-1",
        name: "기본",
        svg: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
  <polygon points="40,4 28,30 52,30" fill="#7E57C2" stroke="#5E35B1" stroke-width="1"/>
  <circle cx="40" cy="6" r="2.5" fill="#FFD740"/>
  <circle cx="40" cy="36" r="11" fill="#FFCC80"/>
  <circle cx="36" cy="34" r="2" fill="#333"/>
  <circle cx="44" cy="34" r="2" fill="#333"/>
  <path d="M37,39 Q40,42 43,39" fill="none" stroke="#BF8040" stroke-width="0.8"/>
  <rect x="32" y="46" rx="2" width="16" height="22" fill="#7E57C2"/>
  <rect x="32" y="46" rx="2" width="16" height="22" fill="none" stroke="#5E35B1" stroke-width="1"/>
  <circle cx="40" cy="52" r="1.5" fill="#FFD740"/>
  <circle cx="40" cy="58" r="1.5" fill="#FFD740"/>
  <line x1="32" y1="52" x2="20" y2="46" stroke="#FFCC80" stroke-width="2.5" stroke-linecap="round"/>
  <line x1="20" y1="46" x2="14" y2="36" stroke="#9C7A4A" stroke-width="2"/>
  <circle cx="14" cy="34" r="2.5" fill="#FFD740"/>
  <line x1="48" y1="52" x2="58" y2="56" stroke="#FFCC80" stroke-width="2.5" stroke-linecap="round"/>
</svg>`,
      },
      {
        id: "wizard-2",
        name: "마법 시전",
        svg: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
  <polygon points="40,4 28,30 52,30" fill="#7E57C2" stroke="#5E35B1" stroke-width="1"/>
  <circle cx="40" cy="6" r="2.5" fill="#FFD740"/>
  <circle cx="40" cy="36" r="11" fill="#FFCC80"/>
  <circle cx="36" cy="34" r="2" fill="#333"/>
  <circle cx="44" cy="34" r="2" fill="#333"/>
  <ellipse cx="40" cy="39" rx="3" ry="2" fill="#333"/>
  <rect x="32" y="46" rx="2" width="16" height="22" fill="#7E57C2" stroke="#5E35B1" stroke-width="1"/>
  <line x1="48" y1="50" x2="64" y2="38" stroke="#FFCC80" stroke-width="2.5" stroke-linecap="round"/>
  <line x1="64" y1="38" x2="70" y2="26" stroke="#9C7A4A" stroke-width="2"/>
  <circle cx="70" cy="24" r="3" fill="#FFD740"/>
  <circle cx="70" cy="18" r="1.5" fill="#FFD740" opacity="0.7"/>
  <circle cx="74" cy="22" r="1" fill="#FFD740" opacity="0.5"/>
  <circle cx="66" cy="20" r="1" fill="#FFD740" opacity="0.5"/>
  <line x1="32" y1="52" x2="22" y2="48" stroke="#FFCC80" stroke-width="2.5" stroke-linecap="round"/>
</svg>`,
      },
    ],
  },
  {
    id: "robot",
    name: "로봇",
    category: "character",
    defaultSize: 60,
    tags: ["캐릭터", "기계", "로봇"],
    costumes: [
      {
        id: "robot-1",
        name: "기본",
        svg: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
  <line x1="40" y1="10" x2="40" y2="18" stroke="#90A4AE" stroke-width="2"/>
  <circle cx="40" cy="8" r="3" fill="#F44336"/>
  <rect x="26" y="18" rx="4" width="28" height="22" fill="#78909C" stroke="#546E7A" stroke-width="1.5"/>
  <rect x="30" y="24" rx="2" width="8" height="6" fill="#4FC3F7"/>
  <rect x="42" y="24" rx="2" width="8" height="6" fill="#4FC3F7"/>
  <circle cx="34" cy="27" r="2" fill="#1A237E"/>
  <circle cx="46" cy="27" r="2" fill="#1A237E"/>
  <rect x="34" y="34" width="12" height="2" rx="1" fill="#546E7A"/>
  <rect x="28" y="42" rx="3" width="24" height="24" fill="#90A4AE" stroke="#78909C" stroke-width="1.5"/>
  <rect x="34" y="48" width="12" height="3" rx="1" fill="#4FC3F7"/>
  <rect x="34" y="54" width="12" height="3" rx="1" fill="#4FC3F7"/>
  <rect x="18" y="44" rx="2" width="8" height="4" fill="#78909C"/>
  <rect x="54" y="44" rx="2" width="8" height="4" fill="#78909C"/>
  <rect x="32" y="66" rx="2" width="6" height="6" fill="#78909C"/>
  <rect x="42" y="66" rx="2" width="6" height="6" fill="#78909C"/>
</svg>`,
      },
      {
        id: "robot-2",
        name: "활성화",
        svg: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
  <line x1="40" y1="10" x2="40" y2="18" stroke="#90A4AE" stroke-width="2"/>
  <circle cx="40" cy="8" r="3" fill="#FF0" stroke="#F44336" stroke-width="1"/>
  <rect x="26" y="18" rx="4" width="28" height="22" fill="#78909C" stroke="#546E7A" stroke-width="1.5"/>
  <rect x="30" y="24" rx="2" width="8" height="6" fill="#76FF03"/>
  <rect x="42" y="24" rx="2" width="8" height="6" fill="#76FF03"/>
  <circle cx="34" cy="27" r="2" fill="#1B5E20"/>
  <circle cx="46" cy="27" r="2" fill="#1B5E20"/>
  <rect x="34" y="34" width="12" height="2" rx="1" fill="#76FF03"/>
  <rect x="28" y="42" rx="3" width="24" height="24" fill="#90A4AE" stroke="#78909C" stroke-width="1.5"/>
  <rect x="34" y="48" width="12" height="3" rx="1" fill="#76FF03"/>
  <rect x="34" y="54" width="12" height="3" rx="1" fill="#76FF03"/>
  <rect x="14" y="42" rx="2" width="12" height="4" fill="#78909C"/>
  <rect x="54" y="42" rx="2" width="12" height="4" fill="#78909C"/>
  <rect x="32" y="66" rx="2" width="6" height="6" fill="#78909C"/>
  <rect x="42" y="66" rx="2" width="6" height="6" fill="#78909C"/>
</svg>`,
      },
    ],
  },
  {
    id: "princess",
    name: "공주",
    category: "character",
    defaultSize: 60,
    tags: ["캐릭터", "판타지", "공주"],
    costumes: [
      {
        id: "princess-1",
        name: "기본",
        svg: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
  <polygon points="30,22 34,10 37,18 40,8 43,18 46,10 50,22" fill="#FFD740" stroke="#FFC107" stroke-width="0.8"/>
  <circle cx="40" cy="30" r="10" fill="#FFCC80"/>
  <circle cx="36" cy="28" r="1.8" fill="#333"/>
  <circle cx="44" cy="28" r="1.8" fill="#333"/>
  <path d="M37,33 Q40,35 43,33" fill="none" stroke="#BF8040" stroke-width="0.8"/>
  <circle cx="34" cy="31" r="2" fill="#FFB0B0" opacity="0.4"/>
  <circle cx="46" cy="31" r="2" fill="#FFB0B0" opacity="0.4"/>
  <path d="M30,30 Q26,26 28,34" fill="#6D4C2E" stroke="none"/>
  <path d="M50,30 Q54,26 52,34" fill="#6D4C2E" stroke="none"/>
  <path d="M28,40 L24,68 Q40,74 56,68 L52,40 Z" fill="#F48FB1" stroke="#EC407A" stroke-width="1"/>
  <path d="M28,40 Q40,46 52,40" fill="#F06292" stroke="none"/>
  <circle cx="40" cy="50" r="2" fill="#FFD740"/>
  <circle cx="40" cy="58" r="2" fill="#FFD740"/>
</svg>`,
      },
    ],
  },
  {
    id: "ninja",
    name: "닌자",
    category: "character",
    defaultSize: 55,
    tags: ["캐릭터", "액션", "닌자"],
    costumes: [
      {
        id: "ninja-1",
        name: "기본",
        svg: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
  <circle cx="40" cy="30" r="12" fill="#333"/>
  <rect x="26" y="26" width="28" height="6" rx="2" fill="#E53935"/>
  <path d="M54,28 Q62,24 64,30" fill="#E53935"/>
  <path d="M54,32 Q62,36 64,30" fill="#E53935"/>
  <circle cx="35" cy="29" r="2.5" fill="#fff"/>
  <circle cx="45" cy="29" r="2.5" fill="#fff"/>
  <circle cx="36" cy="29" r="1.5" fill="#333"/>
  <circle cx="46" cy="29" r="1.5" fill="#333"/>
  <rect x="32" y="42" rx="2" width="16" height="22" fill="#333" stroke="#222" stroke-width="1"/>
  <rect x="36" y="42" width="8" height="22" fill="#444"/>
  <line x1="32" y1="50" x2="20" y2="44" stroke="#333" stroke-width="3" stroke-linecap="round"/>
  <line x1="48" y1="50" x2="60" y2="44" stroke="#333" stroke-width="3" stroke-linecap="round"/>
  <line x1="36" y1="64" x2="32" y2="74" stroke="#333" stroke-width="3" stroke-linecap="round"/>
  <line x1="44" y1="64" x2="48" y2="74" stroke="#333" stroke-width="3" stroke-linecap="round"/>
</svg>`,
      },
      {
        id: "ninja-2",
        name: "공격",
        svg: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
  <circle cx="40" cy="30" r="12" fill="#333"/>
  <rect x="26" y="26" width="28" height="6" rx="2" fill="#E53935"/>
  <path d="M54,28 Q66,22 68,30" fill="#E53935"/>
  <circle cx="35" cy="29" r="2.5" fill="#fff"/>
  <circle cx="45" cy="29" r="2.5" fill="#fff"/>
  <circle cx="36" cy="29" r="1.5" fill="#333"/>
  <circle cx="46" cy="29" r="1.5" fill="#333"/>
  <rect x="32" y="42" rx="2" width="16" height="22" fill="#333" stroke="#222" stroke-width="1"/>
  <line x1="48" y1="48" x2="68" y2="36" stroke="#333" stroke-width="3" stroke-linecap="round"/>
  <line x1="68" y1="36" x2="76" y2="32" stroke="#9E9E9E" stroke-width="1.5"/>
  <line x1="32" y1="50" x2="18" y2="52" stroke="#333" stroke-width="3" stroke-linecap="round"/>
  <line x1="36" y1="64" x2="28" y2="74" stroke="#333" stroke-width="3" stroke-linecap="round"/>
  <line x1="44" y1="64" x2="52" y2="74" stroke="#333" stroke-width="3" stroke-linecap="round"/>
</svg>`,
      },
    ],
  },
  // ===== OBJECTS =====
  {
    id: "star",
    name: "별",
    category: "object",
    defaultSize: 45,
    tags: ["오브젝트", "모양", "별"],
    costumes: [
      {
        id: "star-1",
        name: "기본",
        svg: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
  <polygon points="40,8 48,30 72,30 52,44 60,68 40,52 20,68 28,44 8,30 32,30" fill="#FFD740" stroke="#FFC107" stroke-width="1.5"/>
  <polygon points="40,16 46,30 58,30 48,40 52,56 40,46 28,56 32,40 22,30 34,30" fill="#FFEB3B" opacity="0.5"/>
</svg>`,
      },
    ],
  },
  {
    id: "heart",
    name: "하트",
    category: "object",
    defaultSize: 45,
    tags: ["오브젝트", "모양", "하트"],
    costumes: [
      {
        id: "heart-1",
        name: "기본",
        svg: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
  <path d="M40,68 C16,48 6,30 20,18 C28,12 36,16 40,24 C44,16 52,12 60,18 C74,30 64,48 40,68Z" fill="#F44336" stroke="#D32F2F" stroke-width="1.5"/>
  <path d="M40,60 C22,44 16,32 24,22 C30,18 36,20 40,28" fill="#EF5350" opacity="0.4"/>
</svg>`,
      },
    ],
  },
  {
    id: "ball",
    name: "축구공",
    category: "object",
    defaultSize: 45,
    tags: ["오브젝트", "스포츠", "공"],
    costumes: [
      {
        id: "ball-1",
        name: "기본",
        svg: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
  <circle cx="40" cy="40" r="24" fill="#fff" stroke="#333" stroke-width="2"/>
  <polygon points="40,18 47,26 44,36 36,36 33,26" fill="#333"/>
  <polygon points="56,32 62,40 56,48 50,42" fill="#333"/>
  <polygon points="24,32 18,40 24,48 30,42" fill="#333"/>
  <polygon points="33,52 36,60 44,60 47,52" fill="#333"/>
  <polygon points="52,52 58,56 56,48" fill="#333"/>
  <polygon points="28,52 22,56 24,48" fill="#333"/>
</svg>`,
      },
    ],
  },
  {
    id: "gem",
    name: "보석",
    category: "object",
    defaultSize: 40,
    tags: ["오브젝트", "보물", "보석"],
    costumes: [
      {
        id: "gem-1",
        name: "기본",
        svg: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
  <polygon points="40,12 58,30 40,68 22,30" fill="#42A5F5" stroke="#1E88E5" stroke-width="1.5"/>
  <polygon points="40,12 22,30 40,30" fill="#90CAF9"/>
  <polygon points="40,12 58,30 40,30" fill="#64B5F6"/>
  <polygon points="22,30 40,68 40,30" fill="#1E88E5"/>
  <polygon points="58,30 40,68 40,30" fill="#2196F3"/>
  <line x1="22" y1="30" x2="58" y2="30" stroke="#1565C0" stroke-width="1"/>
</svg>`,
      },
    ],
  },
  {
    id: "coin",
    name: "동전",
    category: "object",
    defaultSize: 35,
    tags: ["오브젝트", "보물", "동전"],
    costumes: [
      {
        id: "coin-1",
        name: "기본",
        svg: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
  <circle cx="40" cy="40" r="22" fill="#FFC107" stroke="#F57F17" stroke-width="2"/>
  <circle cx="40" cy="40" r="17" fill="none" stroke="#FFD54F" stroke-width="1.5"/>
  <text x="40" y="48" text-anchor="middle" font-size="22" font-weight="bold" fill="#F57F17" font-family="serif">$</text>
</svg>`,
      },
    ],
  },
  {
    id: "arrow",
    name: "화살표",
    category: "object",
    defaultSize: 40,
    tags: ["오브젝트", "방향", "화살표"],
    costumes: [
      {
        id: "arrow-1",
        name: "기본",
        svg: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
  <polygon points="60,40 38,20 38,32 14,32 14,48 38,48 38,60" fill="#F44336" stroke="#D32F2F" stroke-width="1.5"/>
  <polygon points="58,40 38,24 38,32 20,32 20,40" fill="#EF5350" opacity="0.3"/>
</svg>`,
      },
    ],
  },
  // ===== VEHICLES =====
  {
    id: "rocket",
    name: "로켓",
    category: "vehicle",
    defaultSize: 60,
    tags: ["탈것", "우주", "로켓"],
    costumes: [
      {
        id: "rocket-1",
        name: "기본",
        svg: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
  <path d="M40,6 C44,6 52,24 52,50 L28,50 C28,24 36,6 40,6Z" fill="#F5F5F5" stroke="#BDBDBD" stroke-width="1.5"/>
  <path d="M40,6 C42,6 46,24 46,50 L40,50 C40,24 38,6 40,6Z" fill="#E0E0E0" opacity="0.5"/>
  <circle cx="40" cy="32" r="6" fill="#42A5F5" stroke="#1E88E5" stroke-width="1"/>
  <circle cx="40" cy="32" r="3" fill="#90CAF9"/>
  <path d="M28,42 L18,56 L28,50Z" fill="#F44336"/>
  <path d="M52,42 L62,56 L52,50Z" fill="#F44336"/>
  <rect x="32" y="48" width="16" height="6" rx="1" fill="#F44336" stroke="#D32F2F" stroke-width="0.8"/>
  <path d="M34,54 Q36,66 38,62 Q40,68 42,62 Q44,66 46,54" fill="#FF9800" stroke="#F57C00" stroke-width="0.5"/>
  <path d="M36,54 Q38,62 40,58 Q42,62 44,54" fill="#FFEB3B"/>
</svg>`,
      },
      {
        id: "rocket-2",
        name: "불꽃 크게",
        svg: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
  <path d="M40,6 C44,6 52,24 52,50 L28,50 C28,24 36,6 40,6Z" fill="#F5F5F5" stroke="#BDBDBD" stroke-width="1.5"/>
  <circle cx="40" cy="32" r="6" fill="#42A5F5" stroke="#1E88E5" stroke-width="1"/>
  <circle cx="40" cy="32" r="3" fill="#90CAF9"/>
  <path d="M28,42 L18,56 L28,50Z" fill="#F44336"/>
  <path d="M52,42 L62,56 L52,50Z" fill="#F44336"/>
  <rect x="32" y="48" width="16" height="6" rx="1" fill="#F44336" stroke="#D32F2F" stroke-width="0.8"/>
  <path d="M32,54 Q34,74 37,68 Q39,78 40,70 Q41,78 43,68 Q46,74 48,54" fill="#FF9800" stroke="#F57C00" stroke-width="0.5"/>
  <path d="M35,54 Q37,70 40,64 Q43,70 45,54" fill="#FFEB3B"/>
  <path d="M38,54 Q40,66 42,54" fill="#FFF9C4"/>
</svg>`,
      },
    ],
  },
  {
    id: "car",
    name: "자동차",
    category: "vehicle",
    defaultSize: 60,
    tags: ["탈것", "자동차"],
    costumes: [
      {
        id: "car-1",
        name: "기본",
        svg: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
  <path d="M16,44 L20,30 Q24,24 34,24 L46,24 Q56,24 60,30 L64,44Z" fill="#F44336" stroke="#D32F2F" stroke-width="1.5"/>
  <rect x="10" y="44" rx="4" width="60" height="16" fill="#E53935" stroke="#C62828" stroke-width="1.5"/>
  <rect x="24" y="28" rx="2" width="14" height="14" fill="#BBDEFB" stroke="#90CAF9" stroke-width="0.8"/>
  <rect x="42" y="28" rx="2" width="14" height="14" fill="#BBDEFB" stroke="#90CAF9" stroke-width="0.8"/>
  <circle cx="24" cy="60" r="7" fill="#333" stroke="#555" stroke-width="1.5"/>
  <circle cx="24" cy="60" r="3" fill="#777"/>
  <circle cx="56" cy="60" r="7" fill="#333" stroke="#555" stroke-width="1.5"/>
  <circle cx="56" cy="60" r="3" fill="#777"/>
  <rect x="62" y="46" rx="1" width="6" height="4" fill="#FFEB3B"/>
  <rect x="12" y="46" rx="1" width="6" height="4" fill="#FF8A80"/>
</svg>`,
      },
    ],
  },
  {
    id: "ufo",
    name: "UFO",
    category: "vehicle",
    defaultSize: 55,
    tags: ["탈것", "우주", "UFO"],
    costumes: [
      {
        id: "ufo-1",
        name: "기본",
        svg: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="40" cy="42" rx="30" ry="10" fill="#B0BEC5" stroke="#78909C" stroke-width="1.5"/>
  <ellipse cx="40" cy="42" rx="30" ry="10" fill="none" stroke="#CFD8DC" stroke-width="0.5" opacity="0.5"/>
  <path d="M28,42 Q28,22 40,20 Q52,22 52,42Z" fill="#90A4AE" stroke="#78909C" stroke-width="1"/>
  <ellipse cx="40" cy="30" rx="8" ry="8" fill="#B3E5FC" stroke="#4FC3F7" stroke-width="0.8" opacity="0.8"/>
  <circle cx="40" cy="30" r="3" fill="#333"/>
  <circle cx="41" cy="29" r="1" fill="#fff"/>
  <circle cx="24" cy="44" r="2.5" fill="#76FF03" opacity="0.8"/>
  <circle cx="34" cy="46" r="2.5" fill="#76FF03" opacity="0.6"/>
  <circle cx="46" cy="46" r="2.5" fill="#76FF03" opacity="0.6"/>
  <circle cx="56" cy="44" r="2.5" fill="#76FF03" opacity="0.8"/>
  <path d="M34,52 L32,62" stroke="#76FF03" stroke-width="2" opacity="0.4" stroke-linecap="round"/>
  <path d="M40,52 L40,64" stroke="#76FF03" stroke-width="2.5" opacity="0.5" stroke-linecap="round"/>
  <path d="M46,52 L48,62" stroke="#76FF03" stroke-width="2" opacity="0.4" stroke-linecap="round"/>
</svg>`,
      },
    ],
  },
];
