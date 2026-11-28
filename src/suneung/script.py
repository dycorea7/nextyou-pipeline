# -*- coding: utf-8 -*-
# 수능장의 AI 안경, 그리고 AGI 시대에 키울 능력 — 장면표
# say = 나레이션(숫자는 한글로 읽기), rep = 자막 표기, a = 애니메이션 키, img = AI 일러스트 프롬프트, ch = 장 카드
# CLIPS cut/subs 는 클립을 받은 뒤 STT로 확정 (지금은 자리만)
CLIPS = {
 'huang': dict(who='젠슨 황 · 엔비디아 CEO', src='World Government Summit (두바이) · 2024.2', cut=(0, 20), subs=[]),
 'hassabis': dict(who='데미스 허사비스 · 구글 딥마인드 CEO', src='아테네 대담 · 2025.9', cut=(0, 20), subs=[]),
 'hinton': dict(who='제프리 힌턴 · 2024 노벨 물리학상', src='팟캐스트 The Diary of a CEO · 2025.6', cut=(0, 20), subs=[]),
 'altman': dict(who='샘 올트먼 · 오픈AI CEO', src='인터뷰', cut=(0, 20), subs=[]),
 'karpathy': dict(who='안드레이 카파시 · 유레카 랩스 창업자', src='드와르케시 팟캐스트 · 2025.10', cut=(0, 20), subs=[]),
}
H = [
 dict(say="지난 십구 일 수능장에선, 수험생 안경까지 하나하나 검사했어요. 안경에 카메라가 숨어 있을지 모르니까요.", rep={"십구 일": "19일"},
      img="a quiet school classroom set up as an exam hall in early morning light, rows of wooden desks with answer sheets and pencils, an adult exam proctor's hands in the foreground carefully inspecting a pair of black-framed glasses held up to the window light, no faces visible, calm tense atmosphere"),
 dict(say="같은 날, 한 기자가 AI 안경을 쓰고 수능 국어 모의시험을 직접 풀어 봤어요. 결과는, 영 점이었어요.",
      rep={"영 점": "0점"},
      img="a modern company meeting room turned into a mock exam room, an adult journalist in a blazer sitting alone at a long table wearing thick smart glasses, looking down at a printed test paper with a puzzled expression, a laptop and recorder nearby, soft afternoon light"),
 dict(say="커닝 도구로는 아직 서툴다는 거죠. 그런데 일이 년 뒤에도 그럴까요?",
      rep={"일이 년": "1~2년"},
      img="a pair of sleek futuristic smart glasses resting on a desk at night, a faint glowing interface reflected on the lenses, blurred city lights through the window behind, mysterious cinematic close-up"),
 dict(say="AI가 웬만한 시험 문제를 다 풀게 되면, 시험은 뭘 재야 하고, 우리는 뭘 키워야 할까요?",
      img="an empty school exam hall at sunset, long golden light streaming across rows of empty desks with neatly placed answer sheets, dust motes in the air, reflective quiet mood, wide shot"),
 dict(say="세계적인 AI 석학과 CEO들의 답을 직접 들어 볼게요. 수능이 앞으로 어떻게 바뀔지도요.",
      img="an adult standing on a hill at dawn looking toward a distant futuristic city skyline with soft glowing lights, a winding path leading forward through grass, hopeful wide cinematic landscape"),
]
S = [
 # 1장
 dict(id="q1s06", say="지난 십구 일 치러진 수능, 오십오만 천팔백육십사 명이 시험을 봤어요.", a="ch_csat", ch=("1장", "수능장의\nAI 비상"),
      rep={"십구 일": "19일", "오십오만 천팔백육십사 명": "55만 1,864명"}),
 dict(id="q1s07", say="이번엔 감독이 유난히 깐깐했어요. 안경은 모두 검사했고, 옷 단추엔 스티커를 붙였어요. 초소형 카메라를 막으려고요.", a="check"),
 dict(id="q1s08", say="시험 중엔 전국에 재난 문자를 세 번 보냈어요. 꺼지지 않은 휴대폰을 찾으려고요. 이걸로만 마흔아홉 명이 걸렸어요.", a="alert",
      rep={"세 번": "3번", "마흔아홉 명": "49명"}),
 dict(id="q1s09", say="교육부 잠정 집계로 부정행위는 아흔여덟 건이었어요. 이 중 다섯 건은 스마트 기기를 쓴 경우예요. 스마트 안경, 초소형 카메라와 무선 이어폰, 시험지를 찍은 휴대폰까지요.", a="count98",
      rep={"아흔여덟 건": "98건", "다섯 건": "5건"}),
 dict(id="q1s10", say="이렇게까지 한 이유가 있어요. 수능 일주일 전, 세무사 시험 수석 합격자가 초소형 카메라와 생성형 AI로 부정행위를 했다고 직접 털어놨거든요.", a="tax"),
 dict(id="q1s11", say="정부는 최근 삼 년에서 오 년 치 세무사 시험을 다시 들여다보고, 올해 치른 국가자격시험 오백이십팔 개를 전수조사하기로 했어요.", a="tax2",
      rep={"삼 년에서 오 년": "3~5년", "오백이십팔 개": "528개"}),
 dict(id="q1s14", say="걸리면 성적 무효, 입학 취소, 형사처벌까지 추진하는, 원스트라이크 원칙도 내놨어요.", a="onestrike"),
 dict(id="q1s17", imgname="b17", say="AI가 시험장에 들어오면서, 실력을 어떻게 증명하느냐가 흔들리고 있어요.", a="img",
      img="a lone wooden school desk in the middle of a vast dim exam hall, a single shaft of pale light falling on a blank answer sheet and a pencil, the rest of the room fading into shadow, quiet contemplative atmosphere"),
 dict(id="q1s18", say="재밌는 건, 지금의 AI 안경은 아직 서툴다는 거예요. 지디넷코리아 기자는 AI 안경으로 오십 분을 버텼는데, 여섯 문제 중 하나도 못 맞혔어요. AI를 부르는 데만 십 분이 걸렸고요.", a="zdnet",
      rep={"오십 분": "50분", "여섯 문제": "6문제", "십 분": "10분"}),
 dict(id="q1s19", say="하지만 AI는 해마다 더 많은 시험에서 사람 점수를 따라잡고 있어요. 그러면 질문이 바뀌어요. AI가 답을 아는 세상에서, 사람은 뭘 배워야 할까요?", a="shift"),

 # 2장
 dict(id="q1s20", say="먼저 엔비디아의 젠슨 황이에요. 이천이십사 년 두바이 세계정부정상회의에서, 이렇게 말했어요.", a="huang_intro", ch=("2장", "코딩을\n배우지 마라?"),
      rep={"이천이십사 년": "2024년"}),
 dict(clip='huang'),
 dict(id="q1s21", say="이제는 사람의 말이 곧 프로그래밍 언어라는 거예요. 그러니 코딩 대신, 생물학이나 교육, 제조, 농업 같은 분야의 전문성을 쌓으라고 했어요.", a="domains"),
 dict(id="q1s22", say="반론도 거세요. 구글 브레인을 만든 앤드루 응은, 코딩을 배우지 말라는 말이 역사상 최악의 진로 조언 중 하나로 남을 거라고 했어요.", a="ng"),
 dict(id="q1s23", say="코딩이 쉬워질수록 더 많은 사람이 코딩해야 한다고요. 두 사람이 같은 걸 가리키는 부분도 있어요. AI에게 일을 시키는 쪽에 서라는 거예요.", a="common"),

 # 3장
 dict(id="q1s24", say="구글 딥마인드의 데미스 허사비스는, 노벨 화학상을 받은 AI 과학자예요. 작년 구월, 그리스 아테네의 고대 극장에서 이렇게 말했어요.", a="hassabis_intro", ch=("3장", "배우는 법을\n배워라"),
      rep={"구월": "9월"}),
 dict(clip='hassabis'),
 dict(id="q1s25", say="무엇을 배우느냐보다, 새로운 걸 빨리 익히는 힘이 더 중요해진다는 거예요. 지식은 금방 낡지만, 배우는 근육은 남으니까요.", a="learn"),
 dict(id="q1s26", imgname="b26", say="학교를 졸업하면 공부가 끝나는 게 아니라, 평생 계속되는 시대가 오는 거죠.", a="img",
      img="an adult in their thirties studying late at night at a kitchen table with a laptop, open notebooks and a mug of tea, warm lamp light, a city skyline visible through the window, focused determined mood"),

 # 4장
 dict(id="q1s27", say="노벨 물리학상을 받은, AI의 대부 제프리 힌턴은 더 직설적이에요. 작년 유월 한 팟캐스트에서, 진로 조언을 묻자 이렇게 답했어요.", a="hinton_intro", ch=("4장", "배관공이\n되라고?"),
      rep={"유월": "6월"}),
 dict(clip='hinton'),
 dict(id="q1s28", say="평범한 지적 노동은 AI가 대신하지만, 현장에서 손으로 하는 일은 로봇이 따라오기까지 오래 걸린다는 거예요.", a="plumber"),
 dict(id="q1s29", say="여기서 배울 건 배관공이라는 직업 자체보다, 현실 세계에서 몸으로 문제를 푸는 능력이에요.", a="hands"),

 # 5장
 dict(id="q1s30", say="오픈AI의 샘 올트먼은 조직심리학자 애덤 그랜트의 팟캐스트에서, 앞으로 중요한 능력이 머리 좋은 것 자체는 아닐 거라고 했어요.", a="altman_q", ch=("5장", "답보다\n질문")),
 dict(id="q1s31", say="답을 찾는 것보다, 어떤 질문을 할지 정하는 게 더 중요해진다고요.", a="altman_q2"),
 dict(id="q1s33", say="AI는 묻는 말에 답해요. 그래서 좋은 질문을 던지는 사람이, AI를 가장 잘 쓰는 사람이 되는 거예요.", a="question"),

 # 6장
 dict(id="q1s34", say="테슬라 AI를 이끌었던 안드레이 카파시는, 지금 AI 교육 회사를 하고 있어요. 작년 시월 한 팟캐스트에서 이렇게 말했어요.", a="karpathy_intro", ch=("6장", "학교는\n헬스장처럼"),
      rep={"시월": "10월"}),
 dict(clip='karpathy'),
 dict(id="q1s35", say="운동선수가 아니어도 헬스장에 가잖아요. 건강하고, 즐거우니까요. AI가 일을 대신해도, 생각하는 힘은 직접 길러야 한다는 거예요.", a="gym"),
 dict(id="q1s36", say="그는 그 전까지는, 많이 알아야 AI와 함께 일하는 자리에 남을 수 있다고도 했어요.", a="loop"),

 # 7장
 dict(id="q1s37", say="그럼 수능 같은 시험은 어떻게 될까요? 크게 세 갈래가 보여요.", a="ch_three", ch=("7장", "수능은\n어떻게 될까"), rep={"세 갈래": "3갈래"}),
 dict(id="q1s38", say="첫째, 막는 거예요. 이번 수능처럼 기기를 차단하고, 감독을 늘리는 거죠.", a="block"),
 dict(id="q1s39", say="미국 대학에선 손으로 쓰는 시험지, 블루북이 돌아왔어요. 판매가 플로리다대에선 오십 퍼센트, UC 버클리에선 팔십 퍼센트 늘었어요.", a="bluebook",
      rep={"오십 퍼센트": "50%", "팔십 퍼센트": "80%"}),
 dict(id="q1s40", say="둘째, 시험을 바꾸는 거예요. 정답을 고르는 대신, 직접 쓰고 말하게 하는 거죠.", a="change"),
 dict(id="q1s41", say="국가교육위원회는 지금 초등학교 육 학년이 치를 이천삼십삼 학년도 대입부터, 수능 전 과목 절대평가와 서술형, 논술형 문항 도입을 검토하고 있어요. 최종안은 내년 삼월에 나와요.", a="kedu",
      rep={"육 학년": "6학년", "이천삼십삼 학년도": "2033학년도", "삼월": "3월"}),
 dict(id="q1s43", say="물론 걱정도 있어요. 채점이 공정할지, 사교육만 늘지 않을지 우려하는 목소리가 커요.", a="concerns"),
 dict(id="q1s44", say="셋째, AI를 아예 시험에 넣는 거예요. OECD는 이천이십구 년 국제학업성취도평가부터, AI 도구가 있는 가상 환경에서 정보를 판단하고 AI를 책임 있게 쓰는 능력을 평가해요.", a="pisa",
      rep={"이천이십구 년": "2029년"}),
 dict(id="q1s45", say="막든, 바꾸든, 넣든, 방향은 하나예요. AI가 대신 못 하는 걸 재는 쪽으로요. 생각의 과정, 질문, 그리고 판단이요.", a="direction"),

 # 마무리
 dict(id="q1s46", say="정리해 볼게요. AI가 답을 아는 시대에 키울 능력, 석학들의 답은 이랬어요.", a="summary"),
 dict(id="q1s47", imgname="b47", say="AI 안경은 답을 알려 줄 수는 있어도, 이 능력들은 대신 키워 주지 못해요. 커닝으로는 얻을 수 없는 것들이죠.", a="img",
      img="a bright school library in the morning, an adult student sitting by a large window writing by hand in a notebook with concentration, books stacked beside, warm sunlight and green trees outside, hopeful atmosphere"),
 dict(id="q1s48", say="AI 시대에 어떤 직업이 사라지는지 궁금하다면, 멸종하는 직업 편도 함께 보세요.", a="end"),
]
