// 수능장의 AI 안경 · AGI 시대에 키울 능력 — scenes. Loaded after more.js / style.js.
const SRC_MOE = '자료: 교육부 잠정 집계 (2026.11.19) · 코리아헤럴드';
const SRC_ZD = '자료: 지디넷코리아 (2026.11.19)';
const SRC_TAX = '자료: 머니투데이방송 · 주간경향 (2026.11)';
const SRC_GOV = '자료: 허프포스트코리아 · 교육플러스 (2026.11)';
const SRC_KEDU = '자료: 한국일보 (2026.8) · 국가교육위원회';
const SRC_BB = '자료: The Daily Cardinal · WSJ (2025)';
const SRC_PISA = '자료: OECD PISA 2029 MAIL 평가틀';
const HELP = '힘든 일이 있다면 · 자살예방상담전화 109 (24시간)';
TAG = () => `<g opacity=".95"><image href="logo.png" x="40" y="32" height="84" width="149" preserveAspectRatio="xMinYMid meet" style="filter:drop-shadow(0 0 3px rgba(0,0,0,.9)) drop-shadow(0 2px 8px rgba(0,0,0,.6))"/></g>`;

// ---------- helpers ----------
function glasses(x, y, s, o = 1, col, cam = false) {
  col = col || C.fig;
  return `<g transform="translate(${x},${y}) scale(${s})" opacity="${o}"><circle cx="-70" cy="0" r="54" fill="none" stroke="${col}" stroke-width="14"/><circle cx="70" cy="0" r="54" fill="none" stroke="${col}" stroke-width="14"/><path d="M-16 -6 Q0 -22 16 -6" stroke="${col}" stroke-width="12" fill="none"/><line x1="-124" y1="-10" x2="-170" y2="-30" stroke="${col}" stroke-width="12" stroke-linecap="round"/><line x1="124" y1="-10" x2="170" y2="-30" stroke="${col}" stroke-width="12" stroke-linecap="round"/>${cam ? `<circle cx="-130" cy="-14" r="11" fill="${C.coral}"/><circle cx="-130" cy="-14" r="5" fill="#fff"/>` : ''}</g>`;
}
function phone(x, y, s, o = 1, col, inner = '') { col = col || C.fig; return `<g transform="translate(${x},${y}) scale(${s})" opacity="${o}"><rect x="-60" y="-110" width="120" height="220" rx="20" fill="${col}"/><rect x="-50" y="-92" width="100" height="176" rx="8" fill="${C.road}"/>${inner}<circle cy="96" r="6" fill="${C.road}"/></g>`; }
function paper(x, y, s, o = 1, lines = 6, mark = '') {
  return `<g transform="translate(${x},${y}) scale(${s})" opacity="${o}">${card(-110, -150, 220, 300, '#FFFFFF', 1, 10)}${T(0, -108, '답안지', 26, '#0B0F1A', 900)}` +
    [...Array(lines)].map((_, i) => `<circle cx="-70" cy="${-60 + i * 36}" r="9" fill="none" stroke="#0B0F1A" stroke-width="3" opacity=".5"/><rect x="-50" y="${-66 + i * 36}" width="${130 - (i % 3) * 22}" height="10" rx="5" fill="#0B0F1A" opacity=".18"/>`).join('') + mark + '</g>';
}
function qcard(lines, who, src, o = 1, col) {
  col = col || C.mus;
  const h = 150 + lines.length * 92;
  return `<g opacity="${o}">${card(260, 540 - h / 2, 1400, h, C.soft, 1, 36)}<text x="330" y="${540 - h / 2 + 130}" font-size="160" font-weight="900" fill="${col}" opacity=".9">“</text>` +
    lines.map((l, i) => T(960, 540 - h / 2 + 140 + i * 92, l, 56, C.text, 800)).join('') +
    (who ? T(960, 540 + h / 2 + 70, who, 40, col, 800) : '') + '</g>' + (src ? source(src, o) : '');
}
function bigNum(x, y, txt, size, col, o = 1) { return `<text x="${x}" y="${y}" text-anchor="middle" font-size="${size}" font-weight="900" fill="${col}" opacity="${o}">${txt}</text>`; }
function numberBadge(x, y, n, col, s) { return `<g transform="translate(${x},${y}) scale(${s})"><circle r="90" fill="${col}"/>${T(0, 36, n, 100, '#fff', 900)}</g>`; }
function nameCard(x, y, name, role, col, o) { const w = Math.max(660, role.length * 40 + 120); return `<g opacity="${o}">${card(x - w / 2, y - 110, w, 220, C.soft, 1, 30)}<rect x="${x - w / 2}" y="${y - 110}" width="16" height="220" rx="8" fill="${col}"/>${T(x, y - 10, name, 70, C.text, 900)}${T(x, y + 60, role, 38, col, 800)}</g>`; }
function eventChip(x, y, txt, o) { return `<g opacity="${o}">${card(x - txt.length * 17 - 40, y - 46, txt.length * 34 + 80, 92, '#000', 0.88, 16)}${T(x, y + 14, txt, 42, '#fff', 800)}</g>`; }
function brain(x, y, s, o = 1, col) { col = col || C.teal; return `<g transform="translate(${x},${y}) scale(${s})" opacity="${o}"><path d="M-10 -90 C-60 -100 -100 -60 -90 -20 C-120 0 -110 50 -70 60 C-60 95 -20 100 -10 80 Z" fill="${col}"/><path d="M10 -90 C60 -100 100 -60 90 -20 C120 0 110 50 70 60 C60 95 20 100 10 80 Z" fill="${col}" opacity=".85"/><path d="M-60 -30 q20 10 0 30 M60 -30 q-20 10 0 30 M-30 -60 q10 20 30 10 M30 30 q-10 20 -30 10" stroke="${C.feat}" stroke-width="6" fill="none" opacity=".5"/></g>`; }
function wrench(x, y, s, o = 1, col) { col = col || C.mus; return `<g transform="translate(${x},${y}) scale(${s}) rotate(-35)" opacity="${o}"><rect x="-14" y="-20" width="28" height="160" rx="12" fill="${col}"/><path d="M-50 -60 a50 50 0 1 0 100 0 l-22 0 l0 26 l-56 0 l0 -26 z" fill="${col}"/></g>`; }
function dumbbell(x, y, s, o = 1, col) { col = col || C.teal; return `<g transform="translate(${x},${y}) scale(${s})" opacity="${o}"><rect x="-90" y="-10" width="180" height="20" rx="10" fill="${C.fig}"/><rect x="-130" y="-55" width="40" height="110" rx="12" fill="${col}"/><rect x="90" y="-55" width="40" height="110" rx="12" fill="${col}"/><rect x="-165" y="-35" width="35" height="70" rx="10" fill="${col}"/><rect x="130" y="-35" width="35" height="70" rx="10" fill="${col}"/></g>`; }
function barV(x, base, Hpx, w, col, lab, val, o, labCol) {
  return `<g opacity="${o}"><rect x="${x - w / 2}" y="${base - Hpx}" width="${w}" height="${Hpx}" rx="14" fill="${col}"/>${T(x, base + 56, lab, 40, labCol || C.text, 800)}${T(x, base - Hpx - 24, val, 56, col, 900)}</g>`;
}
const fadeIn = (t, a = 0.2, b = 0.7) => out(seg(t, a, b));

// ===== 1장 =====
M.ch_csat = (t, d) => { const p = ease(seg(t, 0.3, d * 0.4)); let g = '';
  for (let i = 0; i < 60; i++) { const c = i % 15, r = Math.floor(i / 15); g += `<g opacity="${out(seg(t, i * 0.01, i * 0.01 + 0.3))}">${card(390 + c * 78, 420 + r * 70, 56, 40, C.soft, 1, 6)}</g>`; }
  return title('2027학년도 수능 · 11월 19일', 1, 220) + g + bigNum(960, 820, fmt(lerp(0, 551864, p)) + '명', 110, C.mus, 1) + T(960, 900, '응시', 40, C.grey, 700) + source('자료: 허프포스트코리아 (2026.11.19)', 1); };
M.check = (t, d) => { const a = back(seg(t, 0.2, 0.7)), b = back(seg(t, d * 0.45, d * 0.45 + 0.5));
  const scan = 460 + 120 * Math.sin(t * 2.4);
  const btn = [0, 1, 2].map(i => `<circle cx="1360" cy="${420 + i * 110}" r="22" fill="${C.fig}"/><rect x="1330" y="${390 + i * 110}" width="60" height="60" rx="10" fill="${C.mus}" opacity="${clamp(b)}" transform="rotate(${-8 + i * 6},1360,${420 + i * 110})"/>`).join('');
  return `<g opacity="${clamp(a)}">${card(330, 300, 600, 420, C.soft, 1, 30)}${glasses(630, 470, 1.4, 1, C.fig, true)}<line x1="380" y1="${scan}" x2="880" y2="${scan}" stroke="${C.teal}" stroke-width="6" opacity=".8"/>${T(630, 670, '안경 전부 검사', 46, C.text, 900)}</g>` +
    `<g opacity="${clamp(b)}">${card(1080, 300, 560, 420, C.soft, 1, 30)}<path d="M1240 330 L1480 330 L1520 700 L1200 700 Z" fill="${C.chip}"/>${btn}${T(1360, 670 + 0, '', 10, C.text)}${T(1360, 760, '단추엔 스티커', 46, C.text, 900)}</g>` +
    chip(960, 880, '초소형 카메라 차단', C.coral, out(seg(t, d * 0.7, d * 0.7 + 0.4)), 1) + source(SRC_MOE, 1); };
M.alert = (t, d) => { let g = ''; const times = ['8:30', '14:21', '14:57']; const counts = [31, 11, 7];
  times.forEach((tm, i) => { const a = back(seg(t, 0.3 + i * d * 0.17, 0.8 + i * d * 0.17)); const x = 560 + i * 400; const ring = (t * 3 + i) % 1;
    g += `<g opacity="${clamp(a)}">${phone(x, 520, 1.1 * clamp(a), 1, C.fig, `<rect x="-44" y="-70" width="88" height="56" rx="8" fill="${C.coral}"/>${T(0, -32, '재난 문자', 18, '#fff', 900)}`)}<circle cx="${x}" cy="520" r="${130 + ring * 80}" fill="none" stroke="${C.coral}" stroke-width="4" opacity="${(1 - ring) * 0.6}"/>${T(x, 720, tm, 48, C.text, 900)}${T(x, 790, counts[i] + '명', 52, C.coral, 900)}</g>`; });
  const tot = out(seg(t, d * 0.72, d * 0.72 + 0.4));
  return title('전국 재난 문자 3번', 1, 190) + g + chip(960, 900, '꺼지지 않은 휴대폰 49명', C.coral, tot, 1.1) + source(SRC_MOE, 1); };
M.count98 = (t, d) => { const p = ease(seg(t, 0.3, d * 0.35)); const sm = out(seg(t, d * 0.4, d * 0.4 + 0.5)); let g = '';
  for (let i = 0; i < 98; i++) { const c = i % 14, r = Math.floor(i / 14); const hi = i < 5 && sm > 0.05; const show = i < Math.round(98 * p);
    g += `<circle cx="${300 + c * 52}" cy="${330 + r * 60}" r="20" fill="${hi ? C.coral : C.grey}" opacity="${show ? (hi ? 1 : 0.55) : 0.08}"/>`; }
  const items = [['스마트 안경', 'g'], ['카메라·이어폰', 'c'], ['시험지 촬영', 'p'], ['화장실 휴대폰 2', 'p']];
  let L = ''; items.forEach(([s, k], i) => { const a = back(seg(t, d * 0.5 + i * 0.35, d * 0.5 + i * 0.35 + 0.4)); L += `<g opacity="${clamp(a)}" transform="translate(${1140 + (1 - clamp(a)) * 40},${360 + i * 120})">${card(0, -46, 560, 92, C.soft, 1, 46)}<circle cx="46" cy="0" r="26" fill="${C.coral}"/>${T(310, 14, s, 42, C.text, 800)}</g>`; });
  return title('부정행위 ' + Math.round(98 * p) + '건', 1, 200) + g + T(660, 830, '그중 스마트 기기 5건', 46, C.coral, 900, 'middle', sm) + L + source(SRC_MOE, 1); };
M.tax = (t, d) => { const a = back(seg(t, 0.2, 0.7)), b = out(seg(t, d * 0.45, d * 0.45 + 0.5));
  const badge = `<g transform="translate(700,520) scale(${clamp(a)})">${card(-260, -200, 520, 400, C.soft, 1, 30)}${T(0, -110, '제63회 세무사 시험', 40, C.grey, 800)}<g transform="translate(0,0)"><circle r="70" fill="${C.mus}"/>${T(0, 26, '1', 80, '#0B0F1A', 900)}</g>${T(0, 150, '수석 합격자', 54, C.text, 900)}</g>`;
  const tools = `<g opacity="${b}">${T(1300, 330, '본인이 직접 밝힌 방법', 40, C.grey, 700)}${card(1060, 380, 480, 100, C.soft, 1, 50)}${T(1300, 445, '초소형 카메라', 46, C.text, 900)}${card(1060, 510, 480, 100, C.soft, 1, 50)}${T(1300, 575, '스마트폰', 46, C.text, 900)}${card(1060, 640, 480, 100, C.coral, 1, 50)}${T(1300, 705, '생성형 AI', 46, '#fff', 900)}</g>`;
  return badge + tools + chip(960, 900, '2026년 11월 12일 · 1·2차 모두', C.chip, out(seg(t, d * 0.7, d * 0.7 + 0.4)), 1) + source(SRC_TAX, 1); };
M.tax2 = (t, d) => { const a = out(seg(t, 0.2, 0.8)); const p = ease(seg(t, d * 0.3, d * 0.6)); let docs = '';
  for (let i = 0; i < 5; i++) docs += `<g opacity="${out(seg(t, 0.3 + i * 0.15, 0.7 + i * 0.15))}" transform="translate(${420 + i * 34},${380 + i * 26})">${card(-90, -120, 180, 240, '#fff', 1, 10)}${T(0, -70, (2022 + i) + '', 30, '#0B0F1A', 900)}</g>`;
  let grid = ''; for (let i = 0; i < 132; i++) { const c = i % 22, r = Math.floor(i / 22); const on = i < Math.round(132 * p); grid += `<rect x="${1000 + c * 30}" y="${360 + r * 40}" width="20" height="28" rx="4" fill="${on ? C.teal : C.grey}" opacity="${on ? 1 : 0.25}"/>`; }
  return `<g opacity="${a}">${docs}${T(560, 780, '세무사 시험 3~5년 치', 46, C.text, 900)}${T(560, 840, '합격자 점수 재점검', 38, C.grey, 700)}</g>` + grid + T(1330, 690, '국가자격시험 ' + Math.round(528 * p) + '개', 54, C.teal, 900, 'middle', clamp(p * 3)) + T(1330, 750, '올해 치른 시험 전수조사', 38, C.grey, 700, 'middle', clamp(p * 3)) + source(SRC_TAX, 1); };
M.pres = (t, d) => { const a = back(seg(t, 0.2, 0.7)), b = out(seg(t, d * 0.4, d * 0.4 + 0.6)); let logos = '';
  ['AI 기업 A', 'AI 기업 B', 'AI 기업 C', 'AI 기업 D'].forEach((s, i) => { const q = back(seg(t, d * 0.4 + i * 0.2, d * 0.4 + i * 0.2 + 0.4)); logos += `<g opacity="${clamp(q)}">${card(1080 + (i % 2) * 290, 330 + Math.floor(i / 2) * 170, 260, 130, C.soft, 1, 20)}${robot(1210 + (i % 2) * 290, 445 + Math.floor(i / 2) * 170, 0.42, 1)}</g>`; });
  return nameCard(620, 470, '이재명 대통령', 'SNS로 밝힌 내용', C.mus, clamp(a)) + logos +
    `<g opacity="${b}">${arrowR(1000, 470, 1070, C.grey, b, 8)}</g>` + chip(960, 820, '수능 시간 AI 이용 사례 받아 전수조사', C.coral, out(seg(t, d * 0.65, d * 0.65 + 0.4)), 1) + source(SRC_GOV, 1); };
M.gov = (t, d) => { const a = out(seg(t, 0.2, 0.7)), b = out(seg(t, d * 0.5, d * 0.5 + 0.6));
  const L = `<g opacity="${a}">${card(230, 260, 700, 560, C.soft, 1, 30)}${T(580, 340, '배경훈 부총리', 50, C.mus, 900)}${phone(450, 540, 0.9, 1)}${arrowR(530, 540, 650, C.grey, 1, 8)}<g transform="translate(740,540)"><circle r="60" fill="${C.sky}"/><circle cx="-40" cy="10" r="40" fill="${C.sky}"/><circle cx="45" cy="15" r="38" fill="${C.sky}"/></g>${T(580, 700, '촬영 → 클라우드 전송', 40, C.text, 800)}${T(580, 770, '빅테크와 협력', 40, C.teal, 900)}</g>`;
  const R = `<g opacity="${b}">${card(990, 260, 700, 560, C.soft, 1, 30)}${T(1340, 340, '한성숙 국무총리', 50, C.mus, 900)}${[0, 1, 2].map(i => `<g transform="translate(${1240 + i * 40},${470 + i * 30})">${card(-80, -100, 160, 200, '#fff', 1, 8)}${T(0, -50, '2026', 26, '#0B0F1A', 900)}</g>`).join('')}${T(1340, 740, '작년 수능 시험지 보관', 40, C.text, 800)}</g>`;
  return L + R + source(SRC_GOV, 1); };
M.onestrike = (t, d) => { const I = ['성적 무효', '입학 취소', '형사처벌']; let g = '';
  I.forEach((s, i) => { const a = back(seg(t, 0.4 + i * 0.4, 0.8 + i * 0.4)); g += `<g transform="translate(${560 + i * 400},560) scale(${clamp(a)})">${card(-170, -110, 340, 220, C.coral, 1, 30)}${T(0, 20, s, 56, '#fff', 900)}</g>`; });
  return T(960, 300, '원스트라이크 원칙', 90, C.mus, 900, 'middle', out(seg(t, 0, 0.5))) + g + T(960, 800, '적발 즉시 · 추진 방침', 40, C.grey, 700, 'middle', out(seg(t, 1.6, 2.1))) + source(SRC_GOV, 1); };
const mournBase = (t, lines, o) => `<rect width="1920" height="1080" fill="#05070D"/>` + lines.map((l, i) => T(960, 470 + i * 90 - (lines.length - 1) * 45, l, 58, '#E3E8F2', 700, 'middle', o)).join('') + `<text x="960" y="170" text-anchor="middle" font-size="32" fill="#A9BDD8" opacity="${o}">${HELP}</text>`;
M.mourn = (t, d) => mournBase(t, ['수능 날 오후,', 'AI 부정행위 의혹을 받던 리트 만점자', '숨진 채 발견'], out(seg(t, 0.3, 1.3))) + source('자료: SBS 뉴스 (2026.11.20) · 서울경제 (2026.11.19)', 1);
M.mourn2 = (t, d) => { const o = out(seg(t, 0.2, 1));
  const I = [['본인은 의혹 부인', 0.05], ['의혹은 확인된 적 없음', 0.3], ['부검: 타살 정황 없음', 0.55], ['경찰, 고발 사건 수사 계속', 0.75]]; let g = '';
  I.forEach(([s, k], i) => { const a = out(seg(t, d * k, d * k + 0.8)); g += T(960, 330 + i * 115, s, 58, i === 1 ? '#FFC23D' : '#E3E8F2', 800, 'middle', a); });
  return `<rect width="1920" height="1080" fill="#05070D"/>` + g + `<text x="960" y="170" text-anchor="middle" font-size="32" fill="#A9BDD8" opacity="${o}">${HELP}</text>` + source('자료: SBS 뉴스 (2026.11.20) · 서울경제 (2026.11.19)', 1); };
M.zdnet = (t, d) => { const a = out(seg(t, 0.2, 0.7)); const tm = ease(seg(t, 0.5, d * 0.5)); const sc = out(seg(t, d * 0.5, d * 0.5 + 0.5)); const w = out(seg(t, d * 0.75, d * 0.75 + 0.5));
  const clock = `<g transform="translate(560,520)"><circle r="150" fill="${C.soft}"/><circle r="150" fill="none" stroke="${C.mus}" stroke-width="14" stroke-dasharray="${942 * tm} 942" transform="rotate(-90)"/>${T(0, 20, Math.round(50 * tm) + '분', 80, C.text, 900)}</g>`;
  let marks = ''; for (let i = 0; i < 6; i++) marks += `<g transform="translate(${1060 + (i % 3) * 170},${420 + Math.floor(i / 3) * 170})" opacity="${sc}">${card(-65, -65, 130, 130, C.soft, 1, 20)}${cross(0, 0, 0.7, C.coral, 1)}</g>`;
  return `<g opacity="${a}">${glasses(560, 260, 0.8, 1, C.fig, true)}${clock}${T(560, 760, 'AI 안경으로 50분', 44, C.text, 800)}</g>` + marks + T(1230, 330, '6문제 중 정답 0', 52, C.coral, 900, 'middle', sc) +
    chip(1230, 800, '"헤이 메타" 호출에만 10분', C.chip, w, 1) + source(SRC_ZD, 1); };
M.shift = (t, d) => { const a = out(seg(t, 0.2, 0.7)); const p = ease(seg(t, 0.3, d * 0.4)); const q = back(seg(t, d * 0.55, d * 0.55 + 0.5));
  const base = 760, x0 = 400, x1 = 1520; const yh = base - 300; const path = `M${x0} ${base - 60} C ${x0 + 400} ${base - 80}, ${x0 + 700} ${base - 200}, ${lerp(x0, x1, p)} ${lerp(base - 60, yh - 60, p * p)}`;
  return `<g opacity="${a * (1 - clamp(q) * 0.75)}"><line x1="${x0}" y1="${yh}" x2="${x1}" y2="${yh}" stroke="${C.teal}" stroke-width="4" stroke-dasharray="14 10"/>${T(x1, yh - 20, '사람 점수', 34, C.teal, 800, 'end')}<path d="${path}" stroke="${C.mus}" stroke-width="10" fill="none" stroke-linecap="round"/>${T(x0, base + 50, 'AI 시험 점수 (개념도)', 34, C.grey, 700, 'start')}</g>` +
    `<g transform="translate(960,540) scale(${clamp(q)})" opacity="${clamp(q)}">${card(-620, -120, 1240, 240, C.soft, 1, 40)}${T(0, -10, 'AI가 답을 아는 세상에서,', 56, C.text, 800)}${T(0, 70, '사람은 뭘 배워야 할까?', 64, C.mus, 900)}</g>`; };

// ===== 2장 =====
M.huang_intro = (t, d) => nameCard(960, 460, '젠슨 황', '엔비디아 CEO', '#76B900', clamp(back(seg(t, 0, 0.5)))) + eventChip(960, 720, '세계정부정상회의 · 두바이 · 2024.2', out(seg(t, d * 0.4, d * 0.4 + 0.5)));
M.domains = (t, d) => { const a = out(seg(t, 0.2, 0.7)); const D = [['생물학', C.teal], ['교육', C.mus], ['제조', C.sky], ['농업', '#7CCB6B']]; let g = '';
  D.forEach(([s, c], i) => { const q = back(seg(t, d * 0.45 + i * 0.3, d * 0.45 + i * 0.3 + 0.45)); g += `<g transform="translate(${480 + i * 320},700) scale(${clamp(q)})">${card(-130, -70, 260, 140, c, 1, 30)}${T(0, 18, s, 52, '#0B0F1A', 900)}</g>`; });
  return `<g opacity="${a}">${card(460, 260, 1000, 200, C.soft, 1, 36)}${T(960, 345, '프로그래밍 언어', 44, C.grey, 700)}${T(960, 420, '= 사람의 말', 70, C.mus, 900)}</g>` + g + T(960, 880, '대신 쌓으라는 분야 전문성', 40, C.text, 800, 'middle', out(seg(t, d * 0.75, d * 0.75 + 0.4))) + source('자료: 세계정부정상회의 대담 (2024.2) · 요약', 1); };
M.ng = (t, d) => qcard(['코딩을 배우지 말라는 조언은', '역사상 최악의 진로 조언 중', '하나로 기억될 것'], '앤드루 응 · 딥러닝AI 창업자, 구글 브레인 공동 설립', '자료: 앤드루 응 X 게시물 (2025.3) · 요약 번역', out(seg(t, 0.2, 0.8)), C.coral) + chip(960, 170, '반론', C.coral, out(seg(t, 0, 0.4)), 1);
M.common = (t, d) => { const a = out(seg(t, 0.2, 0.7)), b = back(seg(t, d * 0.5, d * 0.5 + 0.5));
  const L = `<g opacity="${a}">${card(260, 280, 620, 300, C.soft, 1, 30)}${T(570, 360, '앤드루 응', 46, C.coral, 900)}${T(570, 450, '코딩 쉬워질수록', 44, C.text, 800)}${T(570, 520, '더 많은 사람이 코딩', 44, C.text, 800)}</g>`;
  const R = `<g opacity="${a}">${card(1040, 280, 620, 300, C.soft, 1, 30)}${T(1350, 360, '젠슨 황', 46, '#76B900', 900)}${T(1350, 450, '모두가 프로그래머', 44, C.text, 800)}${T(1350, 520, '사람의 말로 지시', 44, C.text, 800)}</g>`;
  return L + R + `<g transform="translate(960,760) scale(${clamp(b)})">${card(-520, -70, 1040, 140, C.mus, 1, 70)}${T(0, 20, 'AI에게 일을 시키는 쪽에 서라', 56, '#0B0F1A', 900)}</g>`; };

// ===== 3장 =====
M.hassabis_intro = (t, d) => nameCard(960, 440, '데미스 허사비스', '구글 딥마인드 CEO · 2024 노벨 화학상', C.teal, clamp(back(seg(t, 0, 0.5)))) + eventChip(960, 720, '아테네 헤로데스 아티쿠스 음악당 · 2025.9', out(seg(t, d * 0.45, d * 0.45 + 0.5)));
M.learn = (t, d) => { const a = out(seg(t, 0.2, 0.7)); const fade = ease(seg(t, d * 0.35, d * 0.75)); const m = back(seg(t, d * 0.55, d * 0.55 + 0.5)); let books = '';
  for (let i = 0; i < 6; i++) books += `<rect x="${330 + i * 70}" y="${480 - (i % 3) * 20}" width="56" height="${220 + (i % 3) * 20}" rx="6" fill="${[C.coral, C.mus, C.teal][i % 3]}" opacity="${a * (1 - fade * 0.8)}"/>`;
  return books + T(520, 820, '지식은 금방 낡지만', 46, C.grey, 800, 'middle', a) + `<g opacity="${clamp(m)}">${brain(1380, 560, 1.6 * clamp(m), 1, C.teal)}${T(1380, 820, '배우는 근육은 남아요', 48, C.teal, 900)}</g>` + source('자료: AP (2025.9.12) · 허사비스 아테네 대담', 1); };

// ===== 4장 =====
M.hinton_intro = (t, d) => nameCard(960, 440, '제프리 힌턴', 'AI의 대부 · 2024 노벨 물리학상', C.mus, clamp(back(seg(t, 0, 0.5)))) + eventChip(960, 720, '팟캐스트 The Diary of a CEO · 2025.6', out(seg(t, d * 0.45, d * 0.45 + 0.5)));
M.plumber = (t, d) => { const a = out(seg(t, 0.2, 0.7)), b = out(seg(t, d * 0.45, d * 0.45 + 0.6));
  return `<g opacity="${a}">${card(260, 280, 640, 520, C.soft, 1, 30)}${monitor(580, 470, 1.1, 1)}${robot(760, 620, 0.6, 1)}${T(580, 740, '평범한 지적 노동', 46, C.text, 900)}${T(580, 230, 'AI가 대신', 44, C.coral, 900)}</g>` +
    `<g opacity="${b}">${card(1020, 280, 640, 520, C.soft, 1, 30)}<rect x="1160" y="420" width="360" height="40" rx="20" fill="${C.grey}"/><rect x="1320" y="460" width="40" height="160" rx="18" fill="${C.grey}"/>${wrench(1440, 560, 1, 1)}${T(1340, 740, '현장에서 손으로 하는 일', 44, C.text, 900)}${T(1340, 230, '로봇은 아직 멀어요', 44, C.teal, 900)}</g>`; };
M.hands = (t, d) => { const a = back(seg(t, 0.2, 0.7)); const I = [['고치기', wrench(0, -20, 0.8, 1)], ['만들기', `<rect x="-60" y="-80" width="120" height="100" rx="10" fill="${C.teal}"/>`], ['돌보기', `<path d="M0 30 C-80 -30 -60 -100 0 -60 C60 -100 80 -30 0 30Z" fill="${C.coral}"/>`]]; let g = '';
  I.forEach(([s, ic], i) => { const q = back(seg(t, d * 0.3 + i * 0.35, d * 0.3 + i * 0.35 + 0.45)); g += `<g transform="translate(${560 + i * 400},560) scale(${clamp(q)})">${card(-150, -170, 300, 340, C.soft, 1, 30)}${ic}${T(0, 120, s, 50, C.text, 900)}</g>`; });
  return T(960, 260, '현실 세계에서 몸으로 푸는 문제', 60, C.text, 900, 'middle', clamp(a)) + g; };

// ===== 5장 =====
M.altman_q = (t, d) => nameCard(960, 380, '샘 올트먼', '오픈AI CEO', C.sky, clamp(back(seg(t, 0, 0.5)))) + eventChip(960, 620, '애덤 그랜트의 팟캐스트 ReThinking · 2025.1', out(seg(t, d * 0.3, d * 0.3 + 0.5))) +
  T(960, 820, '"순수한 지적 능력만큼은 아닐 것"', 52, C.mus, 900, 'middle', out(seg(t, d * 0.6, d * 0.6 + 0.5))) + source('자료: CNBC (2025.1) · 요약 번역', 1);
M.altman_q2 = (t, d) => qcard(['답을 찾는 것보다', '어떤 질문을 할지 알아내는 게', '더 중요해질 것'], '샘 올트먼 · 오픈AI CEO', '자료: ReThinking with Adam Grant (2025.1) · 요약 번역', out(seg(t, 0.2, 0.8)), C.sky);
M.altman_intro = (t, d) => nameCard(960, 500, '샘 올트먼', '오픈AI CEO', C.sky, clamp(back(seg(t, 0, 0.5))));
M.question = (t, d) => { const a = out(seg(t, 0.2, 0.7)), b = out(seg(t, d * 0.4, d * 0.4 + 0.6));
  const qq = `<g transform="translate(560,540)"><circle r="170" fill="${C.mus}" opacity="${a}"/>${T(0, 70, '?', 220, '#0B0F1A', 900, 'middle', a)}</g>`;
  return qq + arrowR(780, 540, 1080, C.grey, b, 10) + `<g opacity="${b}">${robot(1300, 640, 1.4, 1)}<g transform="translate(1460,330)">${card(-110, -60, 220, 120, C.soft, 1, 30)}${T(0, 18, '답', 60, C.teal, 900)}</g></g>` +
    T(960, 900, '좋은 질문 = AI를 가장 잘 쓰는 법', 48, C.text, 900, 'middle', out(seg(t, d * 0.65, d * 0.65 + 0.4))); };

// ===== 6장 =====
M.karpathy_intro = (t, d) => nameCard(960, 440, '안드레이 카파시', '전 테슬라 AI 총괄 · 유레카 랩스 창업자', C.coral, clamp(back(seg(t, 0, 0.5)))) + eventChip(960, 720, '드와르케시 팟캐스트 · 2025.10', out(seg(t, d * 0.45, d * 0.45 + 0.5)));
M.gym = (t, d) => { const a = out(seg(t, 0.2, 0.7)); const lift = Math.sin(t * 3) * 30; const b = out(seg(t, d * 0.5, d * 0.5 + 0.6));
  return `<g opacity="${a}">${card(260, 260, 640, 540, C.soft, 1, 30)}${dumbbell(580, 470 + lift, 1, 1)}${T(580, 700, '헬스장', 52, C.text, 900)}${T(580, 760, '건강하고 즐거워서', 38, C.grey, 700)}</g>` +
    `<g opacity="${b}">${card(1020, 260, 640, 540, C.soft, 1, 30)}${brain(1340, 470 + lift * 0.5, 1.1, 1, C.teal)}${T(1340, 700, '학교', 52, C.text, 900)}${T(1340, 760, '생각하는 힘은 직접', 38, C.teal, 800)}</g>` +
    T(960, 900, '"AGI 이전 교육은 쓸모, AGI 이후 교육은 재미"', 40, C.mus, 800, 'middle', out(seg(t, d * 0.75, d * 0.75 + 0.4))) + source('자료: Dwarkesh Podcast (2025.10) · 요약 번역', 1); };
M.loop = (t, d) => { const a = out(seg(t, 0.2, 0.7)); const r = t * 0.8;
  return `<g opacity="${a}"><circle cx="960" cy="540" r="240" fill="none" stroke="${C.grey}" stroke-width="6" stroke-dasharray="20 14" transform="rotate(${r * 30},960,540)"/>${robot(780, 600, 1, 1)}${person(1140, 640, 1.2, C.mus, 1)}${T(960, 880, '많이 알수록 AI와 함께 일하는 자리에', 46, C.text, 900)}</g>` + source('자료: Dwarkesh Podcast (2025.10) · 요약', 1); };

// ===== 7장 =====
M.ch_three = (t, d) => { const I = [['막기', C.coral], ['바꾸기', C.teal], ['넣기', C.mus]]; let g = '';
  I.forEach(([s, c], i) => { const a = back(seg(t, 0.2 + i * 0.3, 0.6 + i * 0.3)); g += `<g transform="translate(${560 + i * 400},560) scale(${clamp(a)})">${numberBadge(0, -60, i + 1, c, 1)}${T(0, 110, s, 64, C.text, 900)}</g>`; });
  return g; };
M.block = (t, d) => { const a = out(seg(t, 0.2, 0.7)), b = back(seg(t, d * 0.4, d * 0.4 + 0.5));
  return chip(960, 200, '1 · 막기', C.coral, 1, 1.1) + `<g opacity="${a}">${phone(700, 560, 1.4, 1)}${glasses(1220, 560, 1.2, 1, C.fig, true)}</g>` +
    `<g opacity="${clamp(b)}"><circle cx="960" cy="560" r="330" fill="none" stroke="${C.coral}" stroke-width="22"/><line x1="727" y1="327" x2="1193" y2="793" stroke="${C.coral}" stroke-width="22"/></g>` + T(960, 960, '기기 차단 · 감독 강화', 44, C.text, 900, 'middle', a); };
M.bluebook = (t, d) => { const base = 800, Hh = 440; const a = ease(seg(t, d * 0.35, d * 0.35 + 1)), b = ease(seg(t, d * 0.6, d * 0.6 + 1));
  const book = `<g transform="translate(560,520)" opacity="${out(seg(t, 0.2, 0.7))}"><rect x="-150" y="-200" width="300" height="400" rx="14" fill="#2F6FD6"/><rect x="-110" y="-150" width="220" height="70" rx="8" fill="#fff"/>${T(0, -102, 'EXAM BOOK', 30, '#2F6FD6', 900)}<path d="M-80 60 q40 -30 80 0 t80 0" stroke="#fff" stroke-width="6" fill="none" opacity=".7"/></g>`;
  return book + T(560, 800, '손으로 쓰는 시험지 · 블루북', 40, C.text, 800) + `<line x1="980" y1="${base}" x2="1640" y2="${base}" stroke="${C.grey}" stroke-width="4"/>` +
    barV(1140, base, Hh * 0.5 * a, 200, C.teal, '플로리다대', '+' + Math.round(50 * a) + '%', clamp(a * 3)) + barV(1480, base, Hh * 0.8 * b, 200, C.mus, 'UC 버클리', '+' + Math.round(80 * b) + '%', clamp(b * 3)) + T(1310, 250, '블루북 판매 증가', 44, C.text, 900) + source(SRC_BB, 1); };
M.change = (t, d) => { const a = out(seg(t, 0.2, 0.7)), b = out(seg(t, d * 0.4, d * 0.4 + 0.6));
  const L = `<g opacity="${a * (1 - b * 0.6)}">${card(260, 300, 600, 480, C.soft, 1, 30)}${[0, 1, 2, 3, 4].map(i => `<circle cx="${380 + i * 90}" cy="520" r="32" fill="none" stroke="${C.grey}" stroke-width="6"/>${T(380 + i * 90, 534, i + 1, 34, C.grey, 800)}`).join('')}${T(560, 700, '오지선다 고르기', 46, C.grey, 900)}</g>`;
  const R = `<g opacity="${b}">${card(1060, 300, 600, 480, C.soft, 1, 30)}${[0, 1, 2, 3].map(i => `<rect x="1130" y="${400 + i * 50}" width="${460 * clamp((t - d * 0.45) * 0.8 - i * 0.2)}" height="14" rx="7" fill="${C.teal}"/>`).join('')}<g transform="translate(1520,640)"><rect x="-28" y="-50" width="56" height="84" rx="28" fill="${C.mus}"/></g>${T(1340, 740, '쓰고 · 말하기', 46, C.teal, 900)}</g>`;
  return chip(960, 200, '2 · 바꾸기', C.teal, 1, 1.1) + L + arrowR(890, 540, 1030, C.grey, b, 10) + R; };
M.kedu = (t, d) => { const a = out(seg(t, 0.2, 0.7)); const I = [['대상', '현 초6 · 2033학년도 대입'], ['검토 1', '수능 전 과목 절대평가'], ['검토 2', '서술형 · 논술형 문항'], ['확정', '2027년 3월 최종안']]; let g = '';
  I.forEach(([k, v], i) => { const q = back(seg(t, 0.4 + i * d * 0.17, 0.8 + i * d * 0.17)); g += `<g opacity="${clamp(q)}" transform="translate(${(1 - clamp(q)) * -40},0)">${card(380, 300 + i * 130, 220, 96, i === 3 ? C.mus : C.chip, 1, 20)}${T(490, 362 + i * 130, k, 38, i === 3 ? '#0B0F1A' : '#fff', 900)}${card(620, 300 + i * 130, 920, 96, C.soft, 1, 20)}${T(660, 364 + i * 130, v, 46, C.text, 800, 'start')}</g>`; });
  return title('국가교육위원회 검토안', a, 220) + g + chip(1540, 220, '확정 아님', C.coral, out(seg(t, 1, 1.5)), 0.9) + source(SRC_KEDU, 1); };
M.pres_q = (t, d) => qcard(['객관식에 답하는 능력을 테스트하는 건', '초보 컴퓨터도 하는 방식', '답하는 능력은 거의 의미가 없어지는 시대'], '이재명 대통령 · 국가교육위원회 업무보고 (2026.8.5)', '자료: 한국일보 (2026.8.7)', out(seg(t, 0.2, 0.8)), C.mus);
M.concerns = (t, d) => { const I = [['채점 공정성', C.coral], ['교사 업무 부담', C.mus], ['사교육 확대', C.teal], ['대학 변별력', C.sky]]; let g = '';
  I.forEach(([s, c], i) => { const q = back(seg(t, d * 0.35 + i * 0.3, d * 0.35 + i * 0.3 + 0.45)); g += `<g transform="translate(${480 + (i % 2) * 520},${450 + Math.floor(i / 2) * 150}) scale(${clamp(q)})">${card(-230, -55, 460, 110, C.soft, 1, 55)}<circle cx="-180" cy="0" r="22" fill="${c}"/>${T(20, 16, s, 44, C.text, 800)}</g>`; });
  return title('우려하는 목소리', out(seg(t, 0.2, 0.7)), 260) + g + source('자료: 뉴스1 (2026.11.17) · 한국일보 (2026.8.7)', 1); };
M.pisa = (t, d) => { const a = out(seg(t, 0.2, 0.7)), b = out(seg(t, d * 0.45, d * 0.45 + 0.6));
  const scr = `<g opacity="${a}">${card(380, 280, 760, 500, C.soft, 1, 24)}<rect x="380" y="280" width="760" height="60" rx="24" fill="${C.chip}"/>${T(760, 322, 'PISA 2029 · 가상 환경', 32, '#fff', 800)}${card(430, 380, 420, 80, '#fff', 0.9, 40)}${T(640, 432, 'AI에게 물어보기…', 30, '#0B0F1A', 700)}${robot(980, 560, 0.7, 1)}${card(430, 500, 460, 160, C.road, 1, 20)}${T(660, 570, '이 정보, 믿을 만할까?', 34, C.mus, 800)}${T(660, 620, '출처 · 근거 판단', 28, C.sky, 700)}</g>`;
  return chip(960, 200, '3 · 넣기', C.mus, 1, 1.1) + scr + `<g opacity="${b}">${card(1200, 330, 460, 400, C.soft, 1, 30)}${T(1430, 410, '만 15세 대상', 40, C.grey, 700)}${T(1430, 500, '미디어 · AI', 56, C.mus, 900)}${T(1430, 570, '리터러시', 56, C.mus, 900)}${T(1430, 660, 'OECD 신설 영역', 36, C.text, 800)}</g>` + source(SRC_PISA, 1); };
M.direction = (t, d) => { const a = out(seg(t, 0.2, 0.7)); const conv = ease(seg(t, 0.4, d * 0.4)); const I = [['막기', C.coral, 300], ['바꾸기', C.teal, 540], ['넣기', C.mus, 780]]; let g = '';
  I.forEach(([s, c, y]) => { g += `<g opacity="${a}"><text x="380" y="${y + 16}" text-anchor="middle" font-size="48" font-weight="900" fill="${c}">${s}</text><path d="M480 ${y} C 760 ${y}, 820 540, ${lerp(480, 1060, conv)} ${lerp(y, 540, conv)}" stroke="${c}" stroke-width="10" fill="none" stroke-linecap="round"/></g>`; });
  const T3 = ['생각의 과정', '질문', '판단']; let r = '';
  T3.forEach((s, i) => { const q = back(seg(t, d * 0.55 + i * 0.4, d * 0.55 + i * 0.4 + 0.45)); r += `<g transform="translate(1380,${380 + i * 150}) scale(${clamp(q)})">${card(-220, -55, 440, 110, C.soft, 1, 55)}${T(0, 16, s, 48, C.text, 900)}</g>`; });
  return g + `<circle cx="1080" cy="540" r="26" fill="#fff" opacity="${conv}"/>` + T(1380, 260, 'AI가 대신 못 하는 것', 46, C.mus, 900, 'middle', out(seg(t, d * 0.45, d * 0.45 + 0.4))) + r; };

// ===== 마무리 =====
M.summary = (t, d) => { const I = [['배우는 법을 배우기', '허사비스', C.teal], ['몸으로 푸는 현장 기술', '힌턴', C.mus], ['좋은 질문을 던지기', '올트먼', C.sky], ['AI에게 일을 시키는 힘', '황 · 응', '#76B900'], ['생각하는 근육 기르기', '카파시', C.coral]]; let g = '';
  I.forEach(([s, w, c], i) => { const a = back(seg(t, 0.3 + i * d * 0.13, 0.8 + i * d * 0.13)); g += `<g transform="translate(${420 + (1 - clamp(a)) * -60},${300 + i * 130})" opacity="${clamp(a)}"><circle r="42" fill="${c}"/>${T(0, 16, i + 1, 46, '#0B0F1A', 900)}<text x="80" y="18" font-size="54" font-weight="800" fill="${C.text}">${s}</text><text x="1080" y="16" text-anchor="end" font-size="36" font-weight="700" fill="${c}">${w}</text></g>`; });
  return title('AI가 답을 아는 시대에 키울 능력', 1, 190) + g; };
M.end = (t, d) => { const a = out(seg(t, 0, 0.6)), e = back(seg(t, d - 4.6, d - 4.1));
  return `<g opacity="${a * (1 - seg(t, d - 4.8, d - 4.4))}">${T(960, 420, 'AI 안경이 대신 못 하는 것,', 72, C.text, 900)}${T(960, 530, '그게 진짜 실력', 90, C.mus, 900, 'middle', out(seg(t, 0.8, 1.4)))}</g>` +
    `<g opacity="${clamp(e)}">${T(960, 250, '함께 보기 · AI 시대, 멸종하는 직업', 48, C.coral, 800)}<g transform="translate(960,500) scale(${clamp(e)})"><image href="related.jpg" x="-320" y="-180" width="640" height="360" preserveAspectRatio="xMidYMid slice"/><rect x="-320" y="-180" width="640" height="360" rx="8" fill="none" stroke="#fff" stroke-width="4"/></g>` +
    `<g transform="translate(960,800) scale(${clamp(e)})">${card(-180, -50, 360, 100, C.coral, 1, 50)}${T(0, 16, '구독하기', 46, '#fff', 900)}</g></g>`; };


// intro name card → quote card (no clip)
function introQuote(t, d, name, role, col, ev, lines, src) {
  const sw = d * 0.4, a = 1 - seg(t, sw - 0.3, sw), b = out(seg(t, sw, sw + 0.6));
  return `<g opacity="${a}">${nameCard(960, 440, name, role, col, clamp(back(seg(t, 0, 0.5))))}${eventChip(960, 720, ev, out(seg(t, 0.6, 1.1)))}</g>` +
    (b > 0 ? qcard(lines, name + ' · ' + role.split(' · ')[0], src, b, col) : '');
}
M.huang_iq = (t, d) => introQuote(t, d, '젠슨 황', '엔비디아 CEO', '#76B900', '세계정부정상회의 · 두바이 · 2024.2', ['아무도 프로그래밍할 필요가 없게', '만드는 게 우리 일', '이제 세상 모든 사람이 프로그래머'], '자료: World Government Summit (2024.2) · 요약 번역');
M.hassabis_iq = (t, d) => introQuote(t, d, '데미스 허사비스', '구글 딥마인드 CEO · 2024 노벨 화학상', C.teal, '아테네 헤로데스 아티쿠스 음악당 · 2025.9', ['다음 세대에 가장 중요한 능력은', '배우는 법을 배우는 것', '커리어 내내 계속 배워야 할 것'], '자료: AP (2025.9.12) · 요약 번역');
M.hinton_iq = (t, d) => introQuote(t, d, '제프리 힌턴', 'AI의 대부 · 2024 노벨 물리학상', C.mus, '팟캐스트 The Diary of a CEO · 2025.6', ['평범한 지적 노동은', 'AI가 모두 대체할 것', '배관공이 되라'], '자료: The Diary of a CEO (2025.6) · 요약 번역');
M.karpathy_iq = (t, d) => introQuote(t, d, '안드레이 카파시', '전 테슬라 AI 총괄 · 유레카 랩스 창업자', C.coral, '드와르케시 팟캐스트 · 2025.10', ['AGI 이전의 교육은 쓸모를 위한 것', 'AGI 이후의 교육은 재미를 위한 것', '헬스장에 가듯 학교에 가게 될 것'], '자료: Dwarkesh Podcast (2025.10) · 요약 번역');

// ===== AI illustration scenes (key 'img:<file>') =====
const IMG_OVL = {
  b17: (t, d) => '',
  b26: (t, d) => { const a = back(seg(t, d * 0.35, d * 0.35 + 0.5)); return chip(1400, 170, '평생 배우는 시대', C.teal, clamp(a), clamp(a)); },
  b47: (t, d) => '',
};
function imgScene(name, t, d) {
  const z = 1.04 + 0.08 * clamp(t / d), dx = (name.charCodeAt(name.length - 1) % 2 ? -1 : 1) * 28 * clamp(t / d);
  return `<g transform="translate(${960 + dx},540) scale(${z}) translate(-960,-540)"><image href="ai/${name}.jpg" x="0" y="0" width="1920" height="1080" preserveAspectRatio="xMidYMid slice"/></g>
   <defs><linearGradient id="av" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity=".5"/><stop offset=".3" stop-color="#000" stop-opacity="0"/><stop offset=".7" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".6"/></linearGradient></defs>
   <rect width="1920" height="1080" fill="url(#av)"/>` + (IMG_OVL[name] ? IMG_OVL[name](t, d) : '');
}
const _drawKey = window.drawKey;
window.drawKey = (key, t, d, lead, kicker, text) => {
  if (key.startsWith('img:')) { const name = key.slice(4); document.getElementById('s').innerHTML = imgScene(name, t, d) + TAG(); return; }
  _drawKey(key, t, d, lead, kicker, text);
};

// ===== hook (THEME=ai, scenes 1..5 use ai/h<i>.jpg) =====
if (THEME === 'ai') {
  const glass = (x, y, w, h, o = 1) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="26" fill="rgba(10,14,28,0.62)" stroke="rgba(255,255,255,0.18)" stroke-width="2" opacity="${o}"/>`;
  window.AIO = (i, t, d) => {
    let g = imgScene('h' + i, t, d);
    const a = out(seg(t, 0.4, 1.0));
    if (i === 1) { const c = back(seg(t, d * 0.45, d * 0.45 + 0.5)); g += chip(1480, 200, '2027학년도 수능 · 안경 전수 검사', 'rgba(15,20,35,0.78)', clamp(c), clamp(c)); }
    if (i === 2) { const c = back(seg(t, d * 0.6, d * 0.6 + 0.5)); g += glass(1260, 150, 520, 300, a) + `<text x="1520" y="320" text-anchor="middle" font-size="150" font-weight="900" fill="#FF5A5A" opacity="${clamp(c)}">0점</text>` + `<text x="1520" y="400" text-anchor="middle" font-size="34" font-weight="700" fill="#fff" opacity="${a}">AI 안경 · 모의 수능 국어</text>` + source(SRC_ZD, a); }
    if (i === 3) { const c = back(seg(t, d * 0.5, d * 0.5 + 0.5)); g += chip(960, 200, '1~2년 뒤에도?', '#FF5A5A', clamp(c), clamp(c) * 1.2); }
    if (i === 4) { const c1 = back(seg(t, d * 0.3, d * 0.3 + 0.5)), c2 = back(seg(t, d * 0.6, d * 0.6 + 0.5)); g += chip(620, 200, '시험은 뭘 재야 할까?', 'rgba(15,20,35,0.78)', clamp(c1), clamp(c1)) + chip(1320, 200, '우리는 뭘 키워야 할까?', '#FFC23D', clamp(c2), clamp(c2)); }
    if (i === 5) { const items = [['수능장의 AI 비상', C.coral], ['석학 5인이 꼽은 능력', C.teal], ['수능의 미래', C.mus]]; g += glass(420, 250, 1080, 560, out(seg(t, d * 0.3, d * 0.3 + 0.5)));
      items.forEach(([s, c], k) => { const q = back(seg(t, d * 0.2 + k * 0.5, d * 0.2 + k * 0.5 + 0.45)); g += `<g transform="translate(${520 + (1 - q) * -60},${380 + k * 160})" opacity="${clamp(q)}"><circle r="50" fill="${c}"/><text y="20" text-anchor="middle" font-size="54" font-weight="900" fill="#fff">${k + 1}</text><text x="90" y="22" font-size="64" font-weight="800" fill="#fff">${s}</text></g>`; }); }
    return g;
  };
  window.POST = null;
}
