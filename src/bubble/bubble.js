// AI 버블의 한 주 — flat theme scenes
const SRC_NV = '자료: 엔비디아 3분기 실적 발표 (2026.11.17) · 야후 파이낸스';
const SRC_MKT = '자료: 야후 파이낸스 마감 시황 (2026.11.20)';
const SRC_ANT = '자료: 야후 파이낸스 · Opening Bell Daily (2026.11)';
const SRC_BACK = '자료: 엔비디아 발표 (2026.11.23) · 알자지라 · 악시오스';
const WH = '#FFFFFF';
function panel(x, y, w, h, o = 1, fill) { return `<g opacity="${o}"><rect x="${x + 6}" y="${y + 10}" width="${w}" height="${h}" rx="28" fill="${C.ink}" opacity=".08"/>${card(x, y, w, h, fill || WH, 1, 28)}</g>`; }
function bar(x, base, h, w, col, lab, val, o = 1) { return `<g opacity="${o}"><rect x="${x - w / 2}" y="${base - h}" width="${w}" height="${h}" rx="14" fill="${col}"/>${T(x, base + 56, lab, 38, C.text, 800)}${T(x, base - h - 22, val, 54, col, 900)}</g>`; }
function arrowDown(x, y, s, col, o = 1) { return `<g transform="translate(${x},${y}) scale(${s})" opacity="${o}"><rect x="-26" y="-90" width="52" height="110" rx="10" fill="${col}"/><path d="M-70 10 L0 90 L70 10 Z" fill="${col}"/></g>`; }
function arrowUp(x, y, s, col, o = 1) { return `<g transform="translate(${x},${y}) scale(${s})" opacity="${o}"><rect x="-26" y="-20" width="52" height="110" rx="10" fill="${col}"/><path d="M-70 -10 L0 -90 L70 -10 Z" fill="${col}"/></g>`; }
function chip2(x, y, label, col, o = 1, s = 1, tc = '#fff') { const w = String(label).length * 30 + 56; return `<g transform="translate(${x},${y}) scale(${s})" opacity="${o}"><rect x="${-w / 2}" y="-32" width="${w}" height="64" rx="32" fill="${col}"/><text x="0" y="12" text-anchor="middle" font-size="32" font-weight="800" fill="${tc}">${esc(label)}</text></g>`; }
function chipLogo(x, y, txt, col, o = 1) { return `<g opacity="${o}">${card(x - 150, y - 60, 300, 120, col, 1, 24)}${T(x, y + 16, txt, 46, '#fff', 900)}</g>`; }
function line(points, col, w = 8, p = 1) {
  const n = Math.max(2, Math.ceil(points.length * p)); const pts = points.slice(0, n);
  return `<polyline points="${pts.map(q => q.join(',')).join(' ')}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
}
function qbox(lines, who, src, o, col) {
  col = col || C.coral; const h = 140 + lines.length * 86;
  return `<g opacity="${o}">${panel(300, 520 - h / 2, 1320, h)}<rect x="300" y="${520 - h / 2}" width="16" height="${h}" rx="8" fill="${col}"/>` +
    lines.map((l, i) => T(960, 520 - h / 2 + 120 + i * 86, l, 54, C.text, 800)).join('') + T(960, 520 + h / 2 + 70, who, 38, col, 800) + '</g>' + (src ? source(src, o) : '');
}

// ===== 1장 =====
M.nv_rev = (t, d) => { const a = ease(seg(t, 0.4, 1.6)), b = ease(seg(t, d * 0.4, d * 0.4 + 1.2)); const base = 820;
  return title('엔비디아 분기 매출', 1, 210) + `<line x1="560" y1="${base}" x2="1360" y2="${base}" stroke="${C.ink}" stroke-width="4" opacity=".3"/>` +
    bar(760, base, 250 * a, 220, C.grey, '1년 전', Math.round(570 * a) + '억 달러', clamp(a * 3)) + bar(1160, base, 508 * b, 220, '#76B900', '2026년 3분기', fmt(1158 * b) + '억 달러', clamp(b * 3)) +
    chip2(1520, 380, '+103%', C.coral, out(seg(t, d * 0.65, d * 0.65 + 0.4)), 1.3) + source(SRC_NV, 1); };
M.nv_beat = (t, d) => { const a = out(seg(t, 0.2, 0.8)), b = out(seg(t, d * 0.25, d * 0.25 + 0.6)), c = back(seg(t, d * 0.55, d * 0.55 + 0.6));
  return `${panel(220, 300, 680, 420, a)}<g opacity="${a}">${T(560, 390, '월가 예상', 44, C.grey, 800)}${T(560, 500, '1,088억', 96, C.grey, 900)}</g>` +
    `${panel(1020, 300, 680, 420, b)}<g opacity="${b}">${T(1360, 390, '실제 매출', 44, C.text, 800)}${T(1360, 500, '1,158억', 96, '#2E9E44', 900)}${chip2(1360, 620, '+70억 달러', '#2E9E44', 1, 1.1)}</g>` +
    `<g transform="translate(960,850) scale(${clamp(c)})">${card(-420, -60, 840, 120, C.ink, 1, 60)}${T(0, 18, '다음 분기 전망 1,300억 달러', 46, C.mus, 900)}</g>` + source(SRC_NV, 1); };
M.nv_commit = (t, d) => { const p = ease(seg(t, 0.3, d * 0.45)); let boxes = '';
  for (let i = 0; i < 39; i++) { const c = i % 13, r = Math.floor(i / 13); const on = i < Math.round(39 * p);
    boxes += `<g transform="translate(${470 + c * 82},${330 + r * 92})" opacity="${on ? 1 : 0.15}"><rect x="-32" y="-32" width="64" height="64" rx="10" fill="${C.teal}"/><rect x="-18" y="-18" width="36" height="36" rx="4" fill="${WH}" opacity=".5"/></g>`; }
  return title('공급사와 약속한 구매 금액', 1, 210) + boxes + T(960, 690, fmt(3900 * p) + '억 달러', 84, C.text, 900) +
    chip2(960, 820, '"수요가 여전히 공급보다 많다"', C.ink, out(seg(t, d * 0.6, d * 0.6 + 0.5)), 1, C.mus) + T(960, 900, '칩 하나 = 100억 달러', 28, C.grey, 700) + source(SRC_NV, 1); };
M.nv_drop1 = (t, d) => { const p = ease(seg(t, 0.3, d * 0.7));
  const pts = [[400, 560], [700, 520], [1000, 470], [1150, 450]]; const after = [[1150, 450], [1300, 470], [1500, 520]];
  return title('실적 다음 날 엔비디아 주가', 1, 210) + `<line x1="1150" y1="300" x2="1150" y2="760" stroke="${C.grey}" stroke-width="3" stroke-dasharray="10 10"/>${T(1150, 800, '실적 발표', 32, C.grey, 700)}` +
    line(pts, C.teal, 10) + line(after, C.coral, 10, p) + chip2(1560, 560, '-2.9%', C.coral, out(seg(t, d * 0.5, d * 0.5 + 0.4)), 1.4) + source(SRC_NV, 1); };

// ===== 2장 =====
M.nv_fri = (t, d) => { const p = ease(seg(t, 0.4, d * 0.6)); const v = lerp(145.98, 125.53, p);
  return T(960, 300, '11월 20일 · 금요일', 50, C.grey, 800) + T(960, 520, '$' + v.toFixed(2), 180, C.text, 900) + arrowDown(1530, 470, 1.2, C.coral, clamp(p * 2)) +
    chip2(960, 700, '하루 -14%', C.coral, out(seg(t, d * 0.5, d * 0.5 + 0.4)), 1.6) + T(960, 860, '엔비디아 종가', 36, C.grey, 700) + source(SRC_MKT, 1); };
M.indices = (t, d) => { const I = [['나스닥', '-5.3%', '올해 상승분 반납'], ['S&P 500', '-3.6%', '조정 구간 진입'], ['다우', '-1.9%', '조정 구간 진입']]; let g = '';
  I.forEach(([n, v, s], i) => { const a = back(seg(t, 0.3 + i * d * 0.2, 0.8 + i * d * 0.2)); g += `<g transform="translate(${480 + i * 480},560) scale(${clamp(a)})">${panel(-200, -200, 400, 400)}${T(0, -110, n, 50, C.text, 900)}${T(0, 30, v, 96, C.coral, 900)}${T(0, 130, s, 34, C.grey, 800)}</g>`; });
  return title('검은 금요일 · 11월 20일', 1, 210) + g + source(SRC_MKT, 1); };
M.week = (t, d) => { const base = 330; const I = [['나스닥', 10, C.ink], ['다우', 8, C.grey], ['엔비디아', 23, '#76B900']]; let g = '';
  I.forEach(([n, v, c], i) => { const a = ease(seg(t, 0.3 + i * 0.4, 1.3 + i * 0.4)); const h = v * 20 * a;
    g += `<g opacity="${clamp(a * 3)}"><rect x="${560 + i * 320 - 90}" y="${base}" width="180" height="${h}" rx="14" fill="${c}"/>${T(560 + i * 320, base - 30, n, 40, C.text, 900)}${T(560 + i * 320, base + h + 64, '-' + Math.round(v * a) + '%', 56, c === C.grey ? C.text : c, 900)}</g>`; });
  return title('한 주 동안 (11월 16~20일)', 1, 210) + `<line x1="400" y1="${base}" x2="1520" y2="${base}" stroke="${C.ink}" stroke-width="4" opacity=".3"/>` + g +
    chip2(960, 960, '다우 · 2020년 3월 이후 최악의 한 주', C.coral, out(seg(t, d * 0.6, d * 0.6 + 0.4)), 1) + source(SRC_MKT, 1); };
M.vix = (t, d) => { const p = ease(seg(t, 0.3, d * 0.55)); const ang = lerp(-90, 70, p); const v = Math.round(lerp(15, 40, p));
  let ticks = ''; for (let i = 0; i <= 8; i++) { const a = (-90 + i * 20) * Math.PI / 180; ticks += `<line x1="${960 + Math.sin(a) * 300}" y1="${700 - Math.cos(a) * 300}" x2="${960 + Math.sin(a) * 340}" y2="${700 - Math.cos(a) * 340}" stroke="${C.ink}" stroke-width="6" opacity=".4"/>`; }
  return title('공포 지수 VIX', 1, 210) + `<path d="M620 700 A340 340 0 0 1 1300 700" fill="none" stroke="${C.soft}" stroke-width="60"/><path d="M1180 460 A340 340 0 0 1 1300 700" fill="none" stroke="${C.coral}" stroke-width="60" opacity=".6"/>` + ticks +
    `<g transform="translate(960,700) rotate(${ang})"><rect x="-8" y="-290" width="16" height="290" rx="8" fill="${C.ink}"/></g><circle cx="960" cy="700" r="30" fill="${C.ink}"/>` + T(960, 830, '장중 ' + v, 72, C.coral, 900) + T(960, 900, '2026년 최고', 36, C.grey, 800) + source(SRC_MKT, 1); };
M.kospi = (t, d) => { const p = ease(seg(t, 0.3, d * 0.6)); const v = lerp(5100.5, 4968.48, p);
  return title('코스피 · 11월 17일', 1, 210) + `<line x1="400" y1="560" x2="1520" y2="560" stroke="${C.coral}" stroke-width="5" stroke-dasharray="18 12"/>${T(1520, 530, '5,000', 36, C.coral, 900, 'end')}` +
    line([[400, 470], [650, 480], [900, 500], [1150, 520], [1150 + 300 * p, 520 + 80 * p]], C.ink, 10) + T(960, 760, v.toFixed(2), 96, C.text, 900) +
    chip2(960, 880, '288일 만에 5,000선 아래 · -2.59%', C.coral, out(seg(t, d * 0.55, d * 0.55 + 0.4)), 1) + source('자료: MTN 마감시황 (2026.11.17)', 1); };

// ===== 3장 =====
M.why3 = (t, d) => { const I = [['리더십', C.coral], ['금리', C.mus], ['규제', C.teal]]; let g = '';
  I.forEach(([s, c], i) => { const a = back(seg(t, 0.3 + i * 0.35, 0.7 + i * 0.35)); g += `<g transform="translate(${560 + i * 400},560) scale(${clamp(a)})">${panel(-160, -180, 320, 360)}<circle cy="-60" r="70" fill="${c}"/>${T(0, -30, i + 1, 80, '#fff', 900)}${T(0, 120, s, 58, C.text, 900)}</g>`; });
  return T(960, 240, '실적은 좋은데, 왜?', 64, C.text, 900, 'middle', out(seg(t, 0, 0.5))) + g; };
M.lead = (t, d) => { const a = out(seg(t, 0.2, 0.7)); const q = out(seg(t, d * 0.45, d * 0.45 + 0.5));
  return chip2(960, 200, '1 · 리더십', C.coral, 1, 1.1) + `${panel(560, 300, 800, 460, a)}<g opacity="${a}"><rect x="860" y="420" width="200" height="200" rx="30" fill="${C.soft}"/>${T(960, 560, '?', 150, C.coral, 900)}${T(960, 700, 'CEO 자리', 44, C.text, 900)}</g>` +
    T(960, 860, '11월 12일 · 젠슨 황 사임 (사생활 논란)', 42, C.text, 800, 'middle', q) + T(960, 920, '임시 CEO: 콜렛 크레스 (CFO)', 34, C.grey, 700, 'middle', q) + source('자료: 엔비디아 발표 · 야후 파이낸스 (2026.11)', 1); };
M.rate = (t, d) => { const a = out(seg(t, 0.2, 0.7)), b = out(seg(t, d * 0.5, d * 0.5 + 0.6)); const tilt = 14 * ease(seg(t, d * 0.55, d * 0.55 + 1));
  return chip2(960, 200, '2 · 금리', C.mus, 1, 1.1, C.ink) + qbox(['금리 인상을 미루면', '뒤처질 위험이 있다'], '리사 쿡 · 연준 이사', SRC_MKT, a * (1 - b), C.mus) +
    `<g opacity="${b}" transform="translate(960,560)"><g transform="rotate(${tilt})"><rect x="-460" y="-14" width="920" height="28" rx="14" fill="${C.ink}"/><g transform="translate(-360,-14)">${card(-110, -150, 220, 150, C.mus, 1, 20)}${T(0, -60, '금리 ↑', 44, C.ink, 900)}</g><g transform="translate(360,-14)">${card(-130, -110, 260, 110, C.teal, 1, 20)}${T(0, -42, 'AI 주가', 40, '#fff', 900)}</g></g><path d="M-40 70 L0 14 L40 70 Z" fill="${C.grey}"/>${T(0, 200, '먼 미래 이익에 기대는 주식이 먼저 흔들려요', 40, C.text, 800)}</g>`; };
M.export = (t, d) => { const a = out(seg(t, 0.2, 0.7)); const C5 = ['말레이시아', '태국', '인도네시아', '싱가포르', '브라질']; let g = '';
  C5.forEach((s, i) => { const q = back(seg(t, d * 0.3 + i * 0.25, d * 0.3 + i * 0.25 + 0.4)); g += `<g transform="translate(${1180 + (i % 2) * 300},${360 + Math.floor(i / 2) * 150}) scale(${clamp(q)})">${card(-135, -50, 270, 100, C.soft, 1, 50)}${T(0, 14, s, 38, C.text, 800)}</g>`; });
  return chip2(960, 200, '3 · 규제', C.teal, 1, 1.1) + `<g opacity="${a}"><g transform="translate(560,560)"><rect x="-160" y="-160" width="320" height="320" rx="40" fill="${C.ink}"/><rect x="-100" y="-100" width="200" height="200" rx="20" fill="${C.teal}"/>${T(0, 18, 'AI 칩', 56, '#fff', 900)}${[...Array(6)].map((_, i) => `<rect x="${-140 + i * 52}" y="-200" width="18" height="40" fill="${C.ink}"/><rect x="${-140 + i * 52}" y="160" width="18" height="40" fill="${C.ink}"/>`).join('')}</g>${arrowR(780, 560, 1000, C.coral, 1, 10)}${T(890, 520, '수출 허가', 32, C.coral, 900)}</g>` + g + source('자료: 미국 상무부 제안 · 야후 파이낸스 (2026.11)', 1); };
M.storm = (t, d) => { const a = out(seg(t, 0.2, 0.7)); let drops = '';
  for (let i = 0; i < 40; i++) { const x = (i * 97) % 1920, y = ((t * 900 + i * 173) % 1200) - 100; drops += `<line x1="${x}" y1="${y}" x2="${x - 20}" y2="${y + 60}" stroke="${C.teal}" stroke-width="4" opacity=".4"/>`; }
  const cloud = (x, y, s) => `<g transform="translate(${x},${y}) scale(${s})"><circle r="90" fill="${C.grey}"/><circle cx="-100" cy="30" r="70" fill="${C.grey}"/><circle cx="100" cy="30" r="75" fill="${C.grey}"/><rect x="-170" y="30" width="340" height="70" rx="35" fill="${C.grey}"/></g>`;
  const I = [['리더십 공백', 600], ['금리 인상 우려', 960], ['수출 규제', 1320]];
  return drops + `<g opacity="${a}">${cloud(600, 380, 0.9)}${cloud(960, 330, 1.1)}${cloud(1320, 380, 0.9)}</g>` + I.map(([s, x], i) => chip2(x, 560, s, C.ink, out(seg(t, 0.5 + i * 0.3, 0.9 + i * 0.3)), 1, '#fff')).join('') +
    `<g opacity="${out(seg(t, d * 0.5, d * 0.5 + 0.5))}">${panel(460, 720, 1000, 200)}${T(960, 810, '"퍼펙트 스톰"', 72, C.coral, 900)}${T(960, 880, '댄 아이브스 · 웨드부시증권', 36, C.grey, 800)}</g>` + source(SRC_MKT, 1); };

// ===== 4장 =====
M.ant_ipo = (t, d) => { const a = back(seg(t, 0.2, 0.8)); const b = out(seg(t, d * 0.5, d * 0.5 + 0.5));
  return `<g transform="translate(960,470) scale(${clamp(a)})">${panel(-420, -200, 840, 400)}${T(0, -90, '앤트로픽', 72, C.text, 900)}${T(0, -20, 'NASDAQ · ANT', 40, C.grey, 800)}<rect x="-200" y="30" width="400" height="2" fill="${C.soft}"/>${T(0, 130, '공모가 $83', 80, '#D97757', 900)}</g>` +
    chip2(960, 820, '11월 19일 상장 · 클로드 개발사', C.ink, b, 1, '#fff') + source(SRC_ANT, 1); };
M.ant_day1 = (t, d) => { const base = 800, sc = 4.2, y = v => base - (v - 60) * sc; const p = ease(seg(t, 0.3, d * 0.7));
  const pts = [[460, y(83)], [700, y(111.5)], [1000, y(104)], [1300, y(97.17)]];
  return title('상장 첫날 · 11월 19일', 1, 210) + `<line x1="400" y1="${y(83)}" x2="1500" y2="${y(83)}" stroke="${C.grey}" stroke-width="4" stroke-dasharray="14 10"/>${T(1500, y(83) + 46, '공모가 $83', 34, C.grey, 800, 'end')}` +
    line(pts, '#D97757', 10, p) + chip2(700, y(111.5) - 60, '시초가 $111.50 · +34%', '#D97757', out(seg(t, 1, 1.4)), 1) + chip2(1300, y(97.17) - 60, '종가 $97.17 · +17%', C.ink, out(seg(t, d * 0.6, d * 0.6 + 0.4)), 1) + source(SRC_ANT, 1); };
M.ant_down = (t, d) => { const base = 820, sc = 9, y = v => base - (v - 70) * sc; const p = ease(seg(t, 0.3, d * 0.75));
  const D = [['19일', 97.17], ['20일', 88.91], ['23일', 87.6], ['24일', 81.91]]; const pts = D.map(([_, v], i) => [480 + i * 320, y(v)]);
  return title('앤트로픽 주가', 1, 210) + `<line x1="400" y1="${y(83)}" x2="1520" y2="${y(83)}" stroke="${C.coral}" stroke-width="4" stroke-dasharray="14 10"/>${T(400, y(83) - 16, '공모가 $83', 34, C.coral, 900, 'start')}` +
    line(pts, C.ink, 10, p) + D.map(([l, v], i) => T(480 + i * 320, base + 70, l, 36, C.grey, 800) + (i !== 2 ? T(480 + i * 320, i === 3 ? y(v) + 64 : y(v) - 30, '$' + v.toFixed(2), 38, i === 3 ? C.coral : C.text, 900, 'middle', clamp(p * 4 - i)) : '')).join('') + source(SRC_ANT, 1); };
M.ant_mood = (t, d) => { const a = out(seg(t, 0.2, 0.7)), b = out(seg(t, d * 0.4, d * 0.4 + 0.6)); const sw = Math.sin(t * 2.2) * 40;
  return `${panel(300, 320, 560, 420, a)}<g opacity="${a}">${T(580, 420, '회사', 50, C.text, 900)}<rect x="480" y="480" width="200" height="160" rx="16" fill="${C.soft}"/><rect x="540" y="560" width="80" height="80" fill="${C.grey}"/>${T(580, 700, '나흘 사이 그대로', 36, C.grey, 800)}</g>` +
    `${panel(1060, 320, 560, 420, b)}<g opacity="${b}">${T(1340, 420, '시장 분위기', 50, C.text, 900)}<g transform="translate(1340,${560 + sw})">${line([[-180, 40], [-90, -60], [0, 50], [90, -70], [180, 30]], C.coral, 10)}</g>${T(1340, 700, '주가를 움직인 건 이쪽', 36, C.coral, 900)}</g>`; };

// ===== 5장 =====
M.back = (t, d) => { const a = back(seg(t, 0.3, 0.9)); const days = Math.round(lerp(0, 11, ease(seg(t, 0.5, d * 0.5))));
  return `<g transform="translate(960,460) scale(${clamp(a)})">${panel(-460, -200, 920, 400)}${T(0, -80, '11월 23일', 48, C.grey, 800)}${T(0, 30, '젠슨 황 CEO 복귀', 80, C.text, 900)}${T(0, 120, '이사회 만장일치', 40, '#2E9E44', 900)}</g>` +
    chip2(960, 800, '물러난 지 ' + days + '일 만', '#76B900', out(seg(t, 0.6, 1.0)), 1.3) + source(SRC_BACK, 1); };
M.trump = (t, d) => { const a = out(seg(t, 0.2, 0.7)), b = out(seg(t, d * 0.45, d * 0.45 + 0.6));
  return `${panel(240, 300, 660, 420, a)}<g opacity="${a}">${T(570, 400, '트럼프 대통령', 48, C.text, 900)}${T(570, 480, '복귀 촉구', 44, C.coral, 900)}<g transform="translate(570,600)"><path d="M-60 -40 L40 -70 L40 70 L-60 40 Z" fill="${C.coral}"/><rect x="-100" y="-40" width="40" height="80" rx="8" fill="${C.ink}"/></g></g>` +
    `${panel(1020, 300, 660, 420, b)}<g opacity="${b}">${T(1350, 400, '이사회 발표', 48, C.text, 900)}${T(1350, 480, '정부 고위 관계자 자문', 38, C.grey, 800)}<g transform="translate(1350,585) scale(0.8)"><path d="M0 -80 L70 -50 L70 10 Q70 60 0 90 Q-70 60 -70 10 L-70 -50 Z" fill="${C.teal}"/>${check(0, 5, 0.9, '#fff', 1)}</g>${T(1350, 702, '"국가 안보 위험 없다"', 32, C.teal, 900)}</g>` + source(SRC_BACK, 1); };
M.rebound = (t, d) => { const base = 820, sc = 9, y = v => base - (v - 115) * sc; const p = ease(seg(t, 0.3, d * 0.8));
  const D = [['20일', 125.53], ['23일', 165.1], ['24일', 155.38]]; const pts = D.map(([_, v], i) => [560 + i * 360, y(v)]);
  return title('엔비디아 주가 (종가 기준)', 1, 210) + line(pts, C.ink, 10, p) + D.map(([l, v], i) => T(560 + i * 360, base + 70, l, 36, C.grey, 800) + T(560 + i * 360, y(v) + 60, '$' + v.toFixed(2), 34, C.text, 900, 'middle', clamp(p * 3 - i))).join('') +
    chip2(920, y(165.1) - 70, '+31%', '#2E9E44', out(seg(t, 0.9, 1.3)), 1.3) + chip2(1460, y(155.38) - 160, '24일 -5.9% · 25일 약 -4%', C.coral, out(seg(t, d * 0.65, d * 0.65 + 0.4)), 1) + source('자료: Opening Bell Daily (2026.11.24) · GMA (2026.11.25)', 1); };
M.probe = (t, d) => { const I = ['이사회 독립위원회 조사', '국가안보·수출통제 위원회 신설', '정부 조사 협조 중']; let g = '';
  I.forEach((s, i) => { const a = back(seg(t, 0.3 + i * 0.4, 0.7 + i * 0.4)); g += `<g transform="translate(960,${380 + i * 150}) scale(${clamp(a)})">${panel(-460, -55, 920, 110)}<circle cx="-390" cy="0" r="24" fill="${C.mus}"/>${T(30, 16, s, 44, C.text, 800)}</g>`; });
  return title('아직 끝나지 않은 조사', 1, 220) + g + source('자료: 엔비디아 발표 (2026.11.23)', 1); };

// ===== 6장 =====
M.debate = (t, d) => { const a = out(seg(t, 0.2, 0.7)); const tilt = Math.sin(t * 1.6) * 6;
  return `<g opacity="${a}" transform="translate(960,560)"><g transform="rotate(${tilt})"><rect x="-500" y="-12" width="1000" height="24" rx="12" fill="${C.ink}"/><g transform="translate(-400,-12)">${card(-170, -150, 340, 150, '#2E9E44', 1, 24)}${T(0, -60, '아니다', 54, '#fff', 900)}</g><g transform="translate(400,-12)">${card(-170, -150, 340, 150, C.coral, 1, 24)}${T(0, -60, '버블이다', 54, '#fff', 900)}</g></g><path d="M-50 90 L0 12 L50 90 Z" fill="${C.grey}"/></g>` + T(960, 820, 'AI 버블일까?', 60, C.text, 900, 'middle', a); };
M.bull = (t, d) => chip2(960, 200, '아니라는 쪽 · 숫자', '#2E9E44', 1, 1.1) + qbox(['돈 버는 힘은 그대로다', '주가엔 이미 위험이 많이 반영됐다'], '에고르 톨마체프 · 프리덤 캐피털', '자료: 야후 파이낸스 (2026.11.17) · 요약 번역', out(seg(t, 0.2, 0.8)), '#2E9E44');
M.bear = (t, d) => { const a = out(seg(t, 0.2, 0.8)), b = out(seg(t, d * 0.55, d * 0.55 + 0.5));
  return chip2(960, 200, '걱정하는 쪽 · 조건', C.coral, 1, 1.1) + `<g opacity="${1 - b * 0.85}">${qbox(['빅테크가 계속 돈을 쓰는 한', 'AI 수요는 강하다'], '마이클 캐스퍼 · HB 웰스', '자료: 야후 파이낸스 (2026.11.17) · 요약 번역', a, C.coral)}</g>` +
    `<g opacity="${b}" transform="translate(960,600)">${card(-480, -90, 960, 180, C.ink, 1, 40)}${T(0, -10, '거꾸로 말하면,', 40, C.sky, 800)}${T(0, 55, '돈줄이 멈추면 얘기가 달라진다', 52, C.mus, 900)}</g>`; };
M.expect = (t, d) => { const p = ease(seg(t, 0.3, d * 0.6)); const gap = out(seg(t, d * 0.5, d * 0.5 + 0.6));
  const r1 = [[400, 780], [700, 700], [1000, 610], [1300, 520], [1500, 460]], r2 = [[400, 760], [700, 600], [1000, 440], [1300, 300], [1500, 230]];
  return title('실적 vs 기대', 1, 180) + line(r1, '#2E9E44', 10, p) + line(r2, C.coral, 10, p) + T(1560, 470, '실적', 40, '#2E9E44', 900, 'start', clamp(p * 2)) + T(1560, 240, '기대', 40, C.coral, 900, 'start', clamp(p * 2)) +
    `<g opacity="${gap}"><line x1="1450" y1="250" x2="1450" y2="470" stroke="${C.ink}" stroke-width="5" stroke-dasharray="10 8"/>${chip2(1180, 360, '이 차이가 클수록 크게 떨어져요', C.ink, 1, 0.95, '#fff')}</g>`; };

// ===== 7장 =====
M.signals = (t, d) => { const I = [['빅테크 설비투자', C.teal], ['엔비디아 다음 분기 전망', '#76B900'], ['금리', C.mus]]; let g = '';
  I.forEach(([s, c], i) => { const a = back(seg(t, 0.3 + i * 0.4, 0.7 + i * 0.4)); g += `<g transform="translate(960,${380 + i * 160}) scale(${clamp(a)})">${panel(-480, -60, 960, 120)}<circle cx="-410" cy="0" r="40" fill="${c}"/>${T(-410, 16, i + 1, 46, '#fff', 900)}${T(40, 18, s, 50, C.text, 900)}</g>`; });
  return title('지금 봐야 할 신호', 1, 230) + g; };
M.sig1 = (t, d) => { const a = out(seg(t, 0.2, 0.7)); const k = ease(seg(t, d * 0.5, d * 0.5 + 1));
  let racks = ''; for (let i = 0; i < 5; i++) racks += `<g transform="translate(${520 + i * 120},560)"><rect x="-45" y="-160" width="90" height="320" rx="10" fill="${C.ink}"/>${[0, 1, 2, 3, 4, 5].map(j => `<rect x="-32" y="${-140 + j * 50}" width="64" height="30" rx="4" fill="${C.road}"/><circle cx="20" cy="${-125 + j * 50}" r="5" fill="${C.teal}"/>`).join('')}</g>`;
  return chip2(960, 200, '1 · 빅테크 설비투자', C.teal, 1, 1.1) + `<g opacity="${a}">${racks}</g>` + `<g opacity="${a}">${arrowR(1120, 560, 1280, C.grey, 1, 10)}<g transform="translate(1440,560)">${arrowDown(0, 0, 1.2 * k, C.coral, k)}${T(0, 180, 'AI 칩 수요 ↓', 44, C.coral, 900, 'middle', k)}</g></g>` + T(720, 820, '데이터센터에 쓰는 돈', 42, C.text, 800, 'middle', a); };
M.sig2 = (t, d) => { const a = out(seg(t, 0.2, 0.7)); const k = out(seg(t, d * 0.55, d * 0.55 + 0.5));
  return chip2(960, 200, '2 · 엔비디아 다음 분기 전망', '#76B900', 1, 1.1) + `${panel(560, 330, 800, 340, a)}<g opacity="${a}">${T(960, 430, '2026년 4분기 매출 전망', 40, C.grey, 800)}${T(960, 560, '1,300억 달러', 104, C.text, 900)}${T(960, 630, '±3%', 36, C.grey, 700)}</g>` +
    `<g opacity="${k}">${arrowDown(1480, 500, 0.9, C.coral, 1)}${chip2(960, 800, '이 숫자가 내려가면 = 진짜 신호', C.coral, 1, 1.1)}</g>` + source(SRC_NV, 1); };
M.sig3 = (t, d) => { const a = out(seg(t, 0.2, 0.7)); const p = (Math.sin(t * 2) + 1) / 2;
  return chip2(960, 200, '3 · 금리', C.mus, 1, 1.1, C.ink) + `<g opacity="${a}">${panel(660, 300, 600, 460)}<rect x="700" y="340" width="520" height="70" rx="16" fill="${C.coral}"/>${T(960, 390, '12월', 46, '#fff', 900)}${[...Array(14)].map((_, i) => `<rect x="${730 + (i % 7) * 68}" y="${450 + Math.floor(i / 7) * 80}" width="50" height="56" rx="8" fill="${C.soft}"/>`).join('')}<circle cx="${730 + 2 * 68 + 25}" cy="${450 + 80 + 28}" r="40" fill="none" stroke="${C.coral}" stroke-width="8"/>${T(960, 720, '연준 금리 결정', 40, C.text, 900)}</g>` +
    `<g opacity="${a}" transform="translate(1480,560)">${arrowUp(0, -60 * p, 0.7, C.coral, 0.4 + p * 0.6)}${arrowDown(0, 60 * (1 - p), 0.7, '#2E9E44', 1 - p * 0.6)}</g>`; };
M.calm = (t, d) => { const a = out(seg(t, 0.2, 0.7)); let w = ''; for (let i = 0; i < 40; i++) w += `${1060 + i * 18},${560 + Math.sin(t * 3 + i * 0.6) * 120 * Math.exp(-i / 50)} `;
  return `<g opacity="${a}"><polyline points="${w}" fill="none" stroke="${C.coral}" stroke-width="8" opacity=".7"/>${T(1420, 760, '뉴스 한 줄', 40, C.grey, 800)}</g>` +
    `<g opacity="${out(seg(t, d * 0.3, d * 0.3 + 0.5))}">${panel(280, 330, 620, 420)}${['설비투자', '분기 전망', '금리'].map((s, i) => `<circle cx="360" cy="${430 + i * 110}" r="26" fill="${[C.teal, '#76B900', C.mus][i]}"/>${T(400, 444 + i * 110, s, 48, C.text, 900, 'start')}`).join('')}</g>` +
    `<g opacity="${out(seg(t, d * 0.75, d * 0.75 + 0.4))}">${chip2(960, 900, '투자 권유가 아니에요', C.grey, 1, 1)}</g>`; };
M.end = (t, d) => { const a = out(seg(t, 0, 0.6)), e = back(seg(t, d - 4.6, d - 4.1));
  return `<g opacity="${a * (1 - seg(t, d - 4.8, d - 4.4))}">${T(960, 420, '주가는 흔들려도,', 72, C.text, 900)}${T(960, 530, '숫자는 거짓말을 안 해요', 84, C.coral, 900, 'middle', out(seg(t, 0.8, 1.4)))}</g>` +
    `<g opacity="${clamp(e)}">${T(960, 250, '함께 보기 · 앤트로픽 상장 편', 48, C.coral, 900)}<g transform="translate(960,500) scale(${clamp(e)})"><image href="related.jpg" x="-320" y="-180" width="640" height="360" preserveAspectRatio="xMidYMid slice"/><rect x="-320" y="-180" width="640" height="360" rx="8" fill="none" stroke="${C.ink}" stroke-width="4"/></g>` +
    `<g transform="translate(960,800) scale(${clamp(e)})">${card(-180, -50, 360, 100, C.coral, 1, 50)}${T(0, 16, '구독하기', 46, '#fff', 900)}</g></g>`; };

// ===== hook =====
function imgScene(name, t, d) {
  const z = 1.04 + 0.08 * clamp(t / d), dx = (name.charCodeAt(name.length - 1) % 2 ? -1 : 1) * 28 * clamp(t / d);
  return `<g transform="translate(${960 + dx},540) scale(${z}) translate(-960,-540)"><image href="ai/${name}.jpg" x="0" y="0" width="1920" height="1080" preserveAspectRatio="xMidYMid slice"/></g>
   <defs><linearGradient id="av" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity=".5"/><stop offset=".3" stop-color="#000" stop-opacity="0"/><stop offset=".7" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".6"/></linearGradient></defs>
   <rect width="1920" height="1080" fill="url(#av)"/>`;
}
if (THEME === 'ai') {
  const glass = (x, y, w, h, o = 1) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="26" fill="rgba(10,14,28,0.62)" stroke="rgba(255,255,255,0.18)" stroke-width="2" opacity="${o}"/>`;
  const big = (x, y, txt, col, o, size = 150) => `<text x="${x}" y="${y}" text-anchor="middle" font-size="${size}" font-weight="900" fill="${col}" opacity="${o}">${txt}</text>`;
  window.AIO = (i, t, d) => {
    let g = imgScene('h' + i, t, d); const a = out(seg(t, 0.4, 1.0));
    if (i === 1) { const c = back(seg(t, d * 0.5, d * 0.5 + 0.5)); g += glass(1220, 150, 600, 330, a) + T(1520, 230, '엔비디아 · 일주일', 38, '#fff', 800, 'middle', a) + big(1520, 400, '-23%', '#FF5A5A', clamp(c)) + source('자료: 야후 파이낸스 (2026.11.20)', a); }
    if (i === 2) { const c = back(seg(t, d * 0.55, d * 0.55 + 0.5)); g += glass(1220, 150, 600, 330, a) + T(1520, 230, '앤트로픽 · 공모가 $83', 38, '#fff', 800, 'middle', a) + big(1520, 400, '$81.91', '#FF5A5A', clamp(c), 130) + T(1520, 455, '11월 24일 종가', 30, '#fff', 700, 'middle', clamp(c)); }
    if (i === 3) { const c = back(seg(t, d * 0.55, d * 0.55 + 0.5)); g += glass(1220, 150, 600, 330, a) + T(1520, 230, '11일 만의 CEO 복귀', 38, '#fff', 800, 'middle', a) + big(1520, 400, '+31%', '#4ADE80', clamp(c)); }
    if (i === 4) { const c = back(seg(t, d * 0.5, d * 0.5 + 0.5)); g += chip(960, 190, 'AI 버블, 터지는 걸까?', '#FF5A5A', clamp(c), clamp(c) * 1.15); }
    if (i === 5) { const items = [['역대 최대 실적과 검은 금요일', '#FF5A5A'], ['앤트로픽 상장과 CEO의 귀환', '#4FC3F7'], ['지금 봐야 할 신호 3가지', '#FFC23D']]; g += glass(360, 250, 1200, 560, out(seg(t, d * 0.2, d * 0.2 + 0.5)));
      items.forEach(([s, c], k) => { const q = back(seg(t, d * 0.2 + k * 0.5, d * 0.2 + k * 0.5 + 0.45)); g += `<g transform="translate(${460 + (1 - q) * -60},${380 + k * 160})" opacity="${clamp(q)}"><circle r="50" fill="${c}"/><text y="20" text-anchor="middle" font-size="54" font-weight="900" fill="#fff">${k + 1}</text><text x="90" y="22" font-size="60" font-weight="800" fill="#fff">${s}</text></g>`; }); }
    return g;
  };
}
