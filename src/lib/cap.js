// node cap.js '<json job>'  — renders one scene to mp4 (frames piped into ffmpeg)
const { chromium } = require('playwright');
const { spawn } = require('child_process');
(async () => {
  const J = JSON.parse(process.argv[2]);
  const FPS = 30, N = Math.round(J.d * FPS);
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
  await p.goto(`file://${__dirname}/scenes.html?theme=${J.theme}&js=${J.js}`);
  await p.evaluate(() => document.fonts.ready);
  const vf = [];
  if (J.ass) vf.push(`subtitles=${J.ass}:fontsdir=/usr/share/fonts/opentype/noto`);
  if (J.fadeIn) vf.push('fade=t=in:st=0:d=0.6');
  if (J.fadeOut) vf.push(`fade=t=out:st=${(J.d - 0.8).toFixed(2)}:d=0.8`);
  vf.push('format=yuv420p');
  const ff = spawn('ffmpeg', ['-y', '-v', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-i', '-', '-vf', vf.join(','), '-r', String(FPS), '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '20', '-pix_fmt', 'yuv420p', '-an', J.out]);
  ff.stderr.on('data', d => process.stderr.write(d));
  // preload images once
  await p.evaluate(async (J) => {
    if (J.mode === 'hook') window.drawHook(J.i, 0.01, J.d); else window.drawKey(J.key, 0.01, J.d, J.lead || 0, J.kicker || '', J.text || '');
    await Promise.all([...document.querySelectorAll('image')].map(im => new Promise(r => { const i = new Image(); i.onload = i.onerror = r; i.src = im.getAttribute('href'); })));
  }, J);
  for (let k = 0; k < N; k++) {
    const t = k / FPS;
    await p.evaluate(([J, t]) => { if (J.mode === 'hook') window.drawHook(J.i, t, J.d); else window.drawKey(J.key, t, J.d, J.lead || 0, J.kicker || '', J.text || ''); }, [J, t]);
    const buf = await p.screenshot({ type: 'jpeg', quality: 90 });
    if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
  }
  ff.stdin.end();
  await new Promise(r => ff.on('close', r));
  await b.close();
})().catch(e => { console.error(e); process.exit(1); });
