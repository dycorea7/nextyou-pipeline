// node thumb.js <anim_dir> <img> <out.jpg> '<json lines>'
const { chromium } = require('playwright');
(async () => {
  const [dir, img, outp, J] = process.argv.slice(2); const o = JSON.parse(J);
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
  await p.goto(`file://${dir}/scenes.html?theme=channel&js=none.js`); await p.evaluate(() => document.fonts.ready);
  await p.evaluate(([img, o]) => {
    const s = document.getElementById('s');
    s.innerHTML = `<image href="ai/${img}" x="560" y="0" width="1360" height="1080" preserveAspectRatio="xMidYMid slice"/>` +
      `<defs><linearGradient id="g" x1="0" x2="1"><stop offset="0" stop-color="#0B0F1A"/><stop offset=".42" stop-color="#0B0F1A"/><stop offset=".62" stop-color="#0B0F1A" stop-opacity="0"/></linearGradient></defs><rect width="1920" height="1080" fill="url(#g)"/>` +
      `<image href="logo.png" x="80" y="60" height="110" width="196" preserveAspectRatio="xMinYMid meet"/>` +
      `<text x="90" y="390" font-size="140" font-weight="900" fill="#FFFFFF">${o.l1}</text>` +
      `<text x="90" y="550" font-size="140" font-weight="900" fill="${o.c2 || '#FFFFFF'}">${o.l2}</text>` +
      `<text x="90" y="710" font-size="96" font-weight="900" fill="#FFC23D">${o.l3}</text>` +
      `<text x="90" y="830" font-size="54" font-weight="700" fill="#A9BDD8">${o.sub}</text>` +
      `<g transform="rotate(-8,1600,180)"><rect x="${1890 - o.badge.length * 62}" y="110" width="${o.badge.length * 62 + 40}" height="130" rx="22" fill="#FF5A5A"/><text x="${1910 - o.badge.length * 31}" y="198" text-anchor="middle" font-size="58" font-weight="900" fill="#fff">${o.badge}</text></g>`;
  }, [img, o]);
  await p.waitForTimeout(300);
  await p.screenshot({ path: outp, type: 'jpeg', quality: 92 }); await b.close();
})();
