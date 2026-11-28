# -*- coding: utf-8 -*-
"""python3 render.py <project_dir> <out_name> <theme> <scene_js> [ONLY=id,id] [--assemble-only]
project_dir holds script.py (H, S), anim/ (scenes.html, cap.js, <scene_js>, ai/), tts/ (+ tts2/ overrides)."""
import json, os, sys, base64, math, subprocess, importlib.util
from concurrent.futures import ThreadPoolExecutor

P, NAME, THEME, JS = sys.argv[1:5]
ONLY = set(os.environ.get('ONLY', '').split(',')) - {''}
FPS = 30; LEAD = 2.6; PAD = 0.35; END_HOLD = 4.5; JOBS = int(os.environ.get('JOBS', '4'))
spec = importlib.util.spec_from_file_location('scr', f'{P}/script.py'); scr = importlib.util.module_from_spec(spec); spec.loader.exec_module(scr)
W = f'{P}/full'; os.makedirs(f'{W}/aud', exist_ok=True); os.makedirs(f'{W}/ass', exist_ok=True)


def sh(cmd):
    r = subprocess.run(cmd, shell=True, capture_output=True, text=True)
    if r.returncode:
        print(r.stderr[-3000:]); raise SystemExit(f'failed: {cmd[:300]}')
    return r.stdout


def dur(p): return float(sh(f'ffprobe -v error -show_entries format=duration -of csv=p=0 "{p}"').strip())
def frames(t): return math.ceil(t * FPS - 1e-6) / FPS


def chunks(al, rep):
    chars = al['characters']; st = al['character_start_times_seconds']; en = al['character_end_times_seconds']
    out = []; cur = ''; s0 = None
    def flush(i):
        nonlocal cur, s0
        t = cur.strip()
        if t: out.append([s0, en[i], t])
        cur = ''; s0 = None
    for i, c in enumerate(chars):
        if s0 is None and not c.isspace(): s0 = st[i]
        cur += c
        if c in '.?!' or (c == ',' and len(cur.strip()) >= 9) or (len(cur) >= 24 and c == ' '): flush(i)
    if cur.strip(): flush(len(chars) - 1)
    merged = []
    for c in out:
        if merged and len(c[2]) <= 5 and len(merged[-1][2]) + len(c[2]) <= 30: merged[-1][1] = c[1]; merged[-1][2] += ' ' + c[2]
        else: merged.append(c)
    for c in merged:
        t = c[2].rstrip('.,')
        for k, v in sorted((rep or {}).items(), key=lambda kv: -len(kv[0])): t = t.replace(k, v)
        c[2] = t
    return merged


def at(t):
    t = max(0, t); return f'{int(t // 3600)}:{int(t % 3600 // 60):02d}:{t % 60:05.2f}'


HEAD = """[Script Info]
ScriptType: v4.00+
PlayResX: 1920
PlayResY: 1080
WrapStyle: 0

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
__STYLE__

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
"""

STY = {'flat': 'Style: S,Noto Sans CJK KR Bold,54,&H00FFFFFF,&H00FFFFFF,&H30442A1F,&H30442A1F,0,0,0,0,100,100,0,0,3,14,0,2,160,160,40,1'}
HEAD = HEAD.replace('__STYLE__', STY.get(THEME, 'Style: S,Noto Sans CJK KR Bold,58,&H00FFFFFF,&H00FFFFFF,&H00101010,&H96000000,0,0,0,0,100,100,0,0,1,4,2,2,160,160,46,1'))
# ---- plan ----
pre = scr.S[0]['id'][:3]
items = []
for i, h in enumerate(scr.H, 1):
    items.append(dict(id=f'{pre}{i:02d}', mode='hook', i=i, say=h['say'], rep=h.get('rep')))
for s in scr.S:
    if 'clip' in s:
        items.append(dict(id='clip_' + s['clip'], mode='clip', clip=s['clip'])); continue
    items.append(dict(id=s['id'], mode='key', key=('img:' + s['imgname']) if s.get('a') == 'img' else s['a'], ch=s.get('ch'), say=s['say'], rep=s.get('rep')))
plan = []; t0 = 0
for k, it in enumerate(items):
    if it['mode'] == 'clip':
        c = scr.CLIPS[it['clip']]; a0, b0 = c['cut']; T = frames(b0 - a0)
        wav = f'{W}/aud/{it["id"]}.wav'
        if not os.path.exists(f'{P}/clips/{it["clip"]}.mp4'):
            print('missing clip', it['clip'], flush=True); it.update(L=0, d=0, T=0, t0=t0, al=None, first=False, last=False, c=c, missing=True); continue
        sh(f'ffmpeg -y -v error -ss {a0} -to {b0} -i {P}/clips/{it["clip"]}.mp4 -vn -af "loudnorm=I=-17:TP=-2:LRA=11,afade=t=in:d=0.15,afade=t=out:st={max(0, T - 0.3):.2f}:d=0.3,apad=whole_dur={T}" -t {T} -ar 48000 -ac 2 {wav}')
        it.update(L=0, d=T, T=T, t0=t0, al=None, first=False, last=False, c=c); plan.append(it); t0 += T; continue
    src = f'{P}/tts2/{it["id"]}.json' if os.path.exists(f'{P}/tts2/{it["id"]}.json') else f'{P}/tts/{it["id"]}.json'
    x = json.load(open(src))
    mp3 = f'{W}/aud/{it["id"]}.mp3'
    open(mp3, 'wb').write(base64.b64decode(x['audio']))
    d = dur(mp3)
    L = LEAD if it.get('ch') else 0
    tail = END_HOLD if k == len(items) - 1 else PAD
    T = frames(L + d + tail)
    it.update(L=L, d=d, T=T, t0=t0, al=x['alignment'], first=(k == 0), last=(k == len(items) - 1))
    plan.append(it); t0 += T
json.dump([{k: v for k, v in p.items() if k not in ('al',)} for p in plan], open(f'{W}/plan.json', 'w'), ensure_ascii=False, indent=1)
print(f'{len(plan)} scenes, {t0 / 60:.2f} min', flush=True)


def render(p):
    out = f'{W}/v_{p["id"]}.mp4'
    if os.path.exists(out) and p['id'] not in ONLY: return
    if p['mode'] == 'clip':
        c = p['c']; ass = f'{W}/ass/{p["id"]}.ass'; lt = f'{W}/ass/{p["id"]}_lt.png'
        with open(ass, 'w') as f:
            f.write(HEAD.replace('Style: S,', 'Style: S,', 1))
            for s0, s1, tx in c['subs']: f.write(f'Dialogue: 0,{at(s0)},{at(s1)},S,,0,0,0,,{c.get("pos", "")}{tx}\n')
        sh(f'node /home/claude/lt.js {P}/anim/logo.png {lt} "{c["who"]}" "{c["src"]}"')
        a0, b0 = c['cut']
        sh(f'ffmpeg -y -v error -ss {a0} -to {b0} -i {P}/clips/{p["clip"]}.mp4 -loop 1 -i {lt} -filter_complex "[0:v]scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2,setsar=1,fps={FPS}[v];[v][1:v]overlay=0:0:shortest=1,subtitles={ass}:fontsdir=/usr/share/fonts/opentype/noto,format=yuv420p" -t {p["T"]} -r {FPS} -c:v libx264 -preset veryfast -crf 20 -pix_fmt yuv420p -an {out}.tmp.mp4')
        os.replace(out + '.tmp.mp4', out); print('clip', p['id'], flush=True); return
    ass = f'{W}/ass/{p["id"]}.ass'
    with open(ass, 'w') as f:
        f.write(HEAD)
        cs = chunks(p['al'], p.get('rep'))
        for j, (a, b, t) in enumerate(cs):
            nb = cs[j + 1][0] if j + 1 < len(cs) else b + 0.3
            f.write(f'Dialogue: 0,{at(p["L"] + a)},{at(p["L"] + min(nb, b + 0.5))},S,,0,0,0,,{t}\n')
    job = dict(mode=p['mode'], i=p.get('i'), key=p.get('key'), d=p['T'], lead=p['L'], kicker=(p['ch'] or ['', ''])[0] if p.get('ch') else '',
               text=(p['ch'] or ['', ''])[1] if p.get('ch') else '', theme=('ai' if p['mode'] == 'hook' else THEME), js=JS, ass=ass,
               fadeIn=p['first'], fadeOut=p['last'], out=out + '.tmp.mp4')
    sh(f"node {P}/anim/cap.js '{json.dumps(job, ensure_ascii=False)}'")
    os.replace(out + '.tmp.mp4', out)
    print('scene', p['id'], f'{p["T"]:.2f}s', flush=True)


todo = [p for p in plan if (not ONLY or p['id'] in ONLY)]
if any(p.get('missing') for p in items if p['mode'] == 'clip') and not ONLY: raise SystemExit('clips missing')
if '--assemble-only' not in sys.argv:
    with ThreadPoolExecutor(JOBS) as ex: list(ex.map(render, todo))
if ONLY: raise SystemExit
# ---- audio ----
lst = open(f'{W}/aud/list.txt', 'w')
for p in plan:
    wav = f'{W}/aud/{p["id"]}.wav'
    if p['mode'] == 'clip': lst.write(f"file '{wav}'\n"); continue
    sh(f'ffmpeg -y -v error -i {W}/aud/{p["id"]}.mp3 -af "adelay={int(p["L"] * 1000)}:all=1,apad=whole_dur={p["T"]}" -t {p["T"]} -ar 48000 -ac 2 {wav}')
    lst.write(f"file '{wav}'\n")
lst.close()
sh(f'ffmpeg -y -v error -f concat -safe 0 -i {W}/aud/list.txt -c pcm_s16le {W}/narr.wav')
sh(f'ffmpeg -y -v error -i {W}/narr.wav -af loudnorm=I=-14.5:TP=-1.5:LRA=11 -ar 48000 -c:a aac -b:a 192k {W}/mix.m4a')
with open(f'{W}/vlist.txt', 'w') as f:
    for p in plan: f.write(f"file '{W}/v_{p['id']}.mp4'\n")
sh(f'ffmpeg -y -v error -f concat -safe 0 -i {W}/vlist.txt -c copy {W}/video.mp4')
sh(f'ffmpeg -y -v error -i {W}/video.mp4 -i {W}/mix.m4a -map 0:v -map 1:a -c:v copy -c:a copy -shortest -movflags +faststart {P}/{NAME}.mp4')
print('done', f'{P}/{NAME}.mp4', dur(f'{P}/{NAME}.mp4'))
