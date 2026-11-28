# -*- coding: utf-8 -*-
import json, os, sys
def ts(t): t = int(t); return f'{t // 60:02d}:{t % 60:02d}'
def chapters(P, first):
    plan = json.load(open(f'{P}/full/plan.json')); out = [f'00:00 {first}']
    for p in plan:
        if p.get('ch'): out.append(f'{ts(p["t0"])} {p["ch"][0]} · {p["ch"][1].replace(chr(10), " ")}')
    return '\n'.join(out)

def write(P, up, title, body, tags, publishAt):
    size = os.path.getsize(f'{P}/{os.path.basename(P)}.mp4')
    m = dict(title=title, description=body, tags=tags, publishAt=publishAt, size=size, parts=1 if size <= 67108864 else -(-size // 67108864), chunk=67108864)
    os.makedirs(up, exist_ok=True); json.dump(m, open(f'{up}/meta.json', 'w'), ensure_ascii=False)
    print(title, len(body), size, m['parts'])

which = sys.argv[1]
if which == 'suneung':
    P = '/home/claude/suneung'
    body = ("2027학년도 수능장에선 안경까지 검사했어요. AI 안경으로 커닝할 수 있다는 걱정 때문이에요. 그런데 AI가 웬만한 시험 문제를 다 풀게 되면, 시험은 뭘 재야 하고 우리는 뭘 키워야 할까요?\n"
            "젠슨 황, 앤드루 응, 데미스 허사비스, 제프리 힌턴, 샘 올트먼, 안드레이 카파시의 답과 수능이 앞으로 어떻게 바뀔지 정리했어요.\n\n"
            "⏱ 목차\n" + chapters(P, '수능장의 AI 안경') + "\n\n"
            "인용·영상 출처 (원문은 요약 번역했어요):\n"
            "- 젠슨 황, World Government Summit 대담 (2024.2)\n- 앤드루 응, X 게시물 (2025.3)\n- 데미스 허사비스, 아테네 헤로데스 아티쿠스 음악당 대담 (2025.9.12, AP 보도)\n"
            "- 제프리 힌턴, The Diary of a CEO (2025.6)\n- 샘 올트먼, ReThinking with Adam Grant (2025.1)\n- 안드레이 카파시, Dwarkesh Podcast (2025.10)\n"
            "\n"
            "참고: 교육부 잠정 집계·코리아헤럴드·코리아중앙데일리(2026.11.19), 지디넷코리아(2026.11.19), 머니투데이방송·주간경향(2026.11), 허프포스트코리아·헤럴드경제(2026.11), "
            "한국일보(2026.8.7), 뉴스1(2026.11.17), The Daily Cardinal(2025.11), OECD PISA 2029 미디어·AI 리터러시 평가틀\n\n"
            "▶ 함께 보기: AI 시대, 멸종하는 직업 · 신입 공고 73% 증발, AI가 닫은 첫 출근의 문 (재생목록)\n\n#AI #수능 #AI안경 #AGI #교육 #미래역량")
    write(P, '/home/claude/b1/up13', 'AI가 답을 다 아는 시대, 뭘 키워야 할까? | 수능 AI 안경 비상과 석학 5인의 답', body,
          ['수능', 'AI 안경', 'AI 부정행위', 'AGI', '미래 역량', '배우는 법', '제프리 힌턴', '데미스 허사비스', '젠슨 황', '수능 서논술형', 'NextYou Global'], '2026-12-02T18:00:00Z')
else:
    P = '/home/claude/bubble'
    body = ("엔비디아는 역대 최대 실적을 냈는데, 주가는 일주일 만에 23% 빠졌어요. 같은 주 앤트로픽은 나스닥에 상장했지만 나흘 만에 공모가 아래로 내려왔고, 물러났던 젠슨 황은 11일 만에 CEO로 돌아왔어요.\n"
            "한 달 사이 벌어진 일을 숫자로 짚고, AI 버블 논쟁의 양쪽 이야기와 개인 투자자가 지금 봐야 할 신호 3가지를 정리했어요.\n\n"
            "⏱ 목차\n" + chapters(P, '한 달 사이 벌어진 일') + "\n\n"
            "※ 이 영상은 투자 권유가 아니에요. 투자 판단은 본인의 책임이에요.\n\n"
            "참고: 엔비디아 2027 회계연도 3분기 실적 발표(2026.11.17, SEC 8-K), 엔비디아 CEO 복귀 발표(2026.11.23, SEC 8-K), 야후 파이낸스 실적 라이브·마감 시황(2026.11.17~20), "
            "Opening Bell Daily(2026.11.24), Good Morning America(2026.11.25), 알자지라·악시오스(2026.11.23), MTN 마감시황(2026.11.17)\n"
            "인용(요약 번역): 에고르 톨마체프(프리덤 캐피털), 마이클 캐스퍼(HB 웰스), 리사 쿡(연준 이사), 댄 아이브스(웨드부시증권)\n\n"
            "▶ 함께 보기: 앤트로픽 상장 D-6, 1조 4천억 달러 역대 2위 IPO (재생목록)\n\n#AI버블 #엔비디아 #앤트로픽 #나스닥 #미국주식 #젠슨황")
    write(P, '/home/claude/b1/up12', '실적은 역대 최대인데 주가 23% 폭락? AI 버블의 한 주 | 엔비디아 실적·앤트로픽 상장·젠슨 황 복귀', body,
          ['AI 버블', '엔비디아', '엔비디아 실적', '앤트로픽 상장', '앤트로픽 주가', '젠슨 황', '나스닥', '미국 주식', 'AI 주식', 'NextYou Global'], '2026-11-30T18:00:00Z')
