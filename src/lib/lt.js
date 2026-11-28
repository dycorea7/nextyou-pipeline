// node lt.js <logo.png> <out.png> <who> <src>  — transparent overlay: logo + lower-third (top-left)
const { chromium } = require('playwright');
(async () => {
  const [logo, outp, who, src] = process.argv.slice(2);
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
  const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  await p.setContent(`<html><body style="margin:0;background:transparent"><svg width="1920" height="1080" style="font-family:'Noto Sans CJK KR'">
   <image href="file://${logo}" x="40" y="32" height="84" width="149" preserveAspectRatio="xMinYMid meet" style="filter:drop-shadow(0 0 3px rgba(0,0,0,.9))"/>
   <g transform="translate(40,140)"><rect x="0" y="0" width="${Math.max(who.length * 34, src.length * 19) + 70}" height="118" rx="14" fill="rgba(11,15,26,0.82)"/><rect x="0" y="0" width="10" height="118" rx="5" fill="#FFC23D"/>
   <text x="34" y="52" font-size="38" font-weight="900" fill="#fff">${esc(who)}</text><text x="34" y="96" font-size="27" font-weight="500" fill="#A9BDD8">${esc(src)}</text></g></svg></body></html>`);
  await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(200);
  await p.screenshot({ path: outp, omitBackground: true }); await b.close();
})();
