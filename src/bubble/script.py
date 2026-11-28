# -*- coding: utf-8 -*-
# AI 버블의 한 주 — 엔비디아 실적·검은 금요일·앤트로픽 상장·CEO 복귀 (flat theme)
CLIPS = {}
STY_NOTE = "flat"
H = [
 dict(say="실적은 역대 최대였어요. 그런데 주가는 일주일 만에 이십삼 퍼센트 빠졌어요.", rep={"이십삼 퍼센트": "23%"},
      img="a dim stock trading room at night with rows of large wall screens glowing deep red with falling line charts, empty office chairs, scattered papers, dramatic red and blue light, tense atmosphere, wide shot, no readable text"),
 dict(say="같은 주, 역사에 남을 대형 상장이 있었는데, 그 회사 주가는 일주일도 안 돼 공모가 아래로 내려왔어요.",
      img="the grand stone facade of a stock exchange building on a rainy evening, colourful celebration confetti and ribbons lying wet on the steps, umbrellas passing by, fading festive mood, cinematic wide shot, no readable text or logos"),
 dict(say="물러났던 CEO는 열하루 만에 돌아왔고, 주가는 하루에 삼십일 퍼센트 뛰었어요.", rep={"열하루": "11일", "삼십일 퍼센트": "31%"},
      img="an empty modern corporate boardroom at dawn, a long glossy table with leather chairs, one chair at the head turned toward huge windows showing a sunrise over a tech campus, golden light, dramatic quiet mood, no people"),
 dict(say="이게 다 한 달 안에 벌어진 일이에요. AI 버블이 터지는 걸까요, 아니면 잠깐 흔들리는 걸까요?",
      img="a giant translucent soap bubble with glowing circuit patterns inside floating above a night city skyline of skyscrapers and data centers, the bubble surface shimmering and slightly wobbling, dreamy yet tense atmosphere, wide cinematic"),
 dict(say="숫자로 하나씩 짚어 볼게요. 개인 투자자가 지금 봐야 할 신호 세 가지까지요.", rep={"세 가지": "3가지"},
      img="an adult sitting at a tidy desk at night in a cozy apartment, a laptop showing stock charts, a notebook with handwritten notes and a cup of tea, warm lamp light, a calm focused mood, city lights through the window"),
]
S = [
 # 1장
 dict(id="b2s06", say="십일월 십칠 일, 엔비디아가 삼분기 실적을 냈어요. 매출은 천백오십팔억 달러. 일 년 전의 두 배가 넘어요.", a="nv_rev", ch=("1장", "역대 최대 실적"),
      rep={"십일월 십칠 일": "11월 17일", "삼분기": "3분기", "천백오십팔억 달러": "1,158억 달러", "일 년": "1년"}),
 dict(id="b2s07", say="월가 예상은 천팔십팔억 달러였어요. 예상보다 칠십억 달러 많았던 거죠. 다음 분기 전망도 천삼백억 달러로 더 높게 잡았어요.", a="nv_beat",
      rep={"천팔십팔억 달러": "1,088억 달러", "칠십억 달러": "70억 달러", "천삼백억 달러": "1,300억 달러"}),
 dict(id="b2s08", say="엔비디아가 부품을 사겠다고 공급사와 약속한 금액만 삼천구백억 달러예요. 그만큼 더 만들 준비를 한다는 뜻이죠. 회사는 수요가 여전히 공급보다 많다고 했어요.", a="nv_commit",
      rep={"삼천구백억 달러": "3,900억 달러"}),
 dict(id="b2s09", say="그런데 다음 날, 주가는 이 점 구 퍼센트 떨어졌어요.", a="nv_drop1", rep={"이 점 구 퍼센트": "2.9%"}),
 # 2장
 dict(id="b2s10", say="그리고 십일월 이십 일 금요일. 엔비디아 주가는 하루에 십사 퍼센트 빠졌어요.", a="nv_fri", ch=("2장", "검은 금요일"),
      rep={"십일월 이십 일": "11월 20일", "십사 퍼센트": "14%"}),
 dict(id="b2s11", say="나스닥은 오 퍼센트 넘게 떨어져 올해 오른 걸 다 토해 냈어요. S&P 오백과 다우는 고점보다 십 퍼센트 넘게 빠진 조정 구간에 들어갔고요.", a="indices",
      rep={"오 퍼센트": "5%", "S&P 오백": "S&P 500", "십 퍼센트": "10%"}),
 dict(id="b2s12", say="한 주 동안 나스닥은 십 퍼센트, 엔비디아는 이십삼 퍼센트 빠졌어요. 다우는 코로나 충격이 있던 이천이십 년 삼월 이후 최악의 한 주였어요.", a="week",
      rep={"십 퍼센트": "10%", "이십삼 퍼센트": "23%", "이천이십 년 삼월": "2020년 3월"}),
 dict(id="b2s13", say="공포 지수라 불리는 빅스는, 장중 사십까지 치솟았어요. 올해 들어 가장 높은 수준이에요.", a="vix", rep={"빅스": "VIX", "사십": "40"}),
 dict(id="b2s14", say="한국도 흔들렸어요. 코스피는 십칠 일, 이백팔십팔 일 만에 오천 선 아래로 내려갔어요.", a="kospi",
      rep={"십칠 일": "17일", "이백팔십팔 일": "288일", "오천 선": "5,000선"}),
 # 3장
 dict(id="b2s15", say="실적이 좋은데, 왜 이렇게 떨어졌을까요? 이유는 크게 세 가지예요.", a="why3", ch=("3장", "왜 떨어졌나"), rep={"세 가지": "3가지"}),
 dict(id="b2s16", say="첫째, 리더십이에요. 젠슨 황 CEO가 사생활 논란으로 십일월 십이 일 물러나면서, 회사를 누가 이끄느냐가 불확실해졌어요.", a="lead",
      rep={"십일월 십이 일": "11월 12일"}),
 dict(id="b2s17", say="둘째, 금리예요. 연준의 리사 쿡 이사는, 금리 인상을 미루면 뒤처질 위험이 있다고 경고했어요. 금리가 오르면, 먼 미래의 이익에 기대는 AI 주식이 먼저 흔들려요.", a="rate"),
 dict(id="b2s18", say="셋째, 규제예요. 미국 정부는 첨단 AI 칩 수출 허가 대상을, 동남아시아와 브라질까지 넓히는 방안을 내놨어요.", a="export"),
 dict(id="b2s19", say="월가의 댄 아이브스는 이걸 퍼펙트 스톰이라고 불렀어요. 악재가 한꺼번에 몰렸다는 거죠.", a="storm"),
 # 4장
 dict(id="b2s20", say="그 한가운데서, 클로드를 만든 앤트로픽이 나스닥에 상장했어요. 공모가는 팔십삼 달러였어요.", a="ant_ipo", ch=("4장", "앤트로픽 상장"),
      rep={"팔십삼 달러": "83달러"}),
 dict(id="b2s21", say="첫날 시초가는 백십일 달러 오십 센트. 공모가보다 삼십사 퍼센트 높았어요. 종가는 구십칠 달러 십칠 센트로, 십칠 퍼센트 올라 마감했어요.", a="ant_day1",
      rep={"백십일 달러 오십 센트": "111.50달러", "삼십사 퍼센트": "34%", "구십칠 달러 십칠 센트": "97.17달러", "십칠 퍼센트": "17%"}),
 dict(id="b2s22", say="하지만 다음 날 검은 금요일에 팔 점 오 퍼센트 빠졌고, 이십사 일엔 팔십일 달러 구십일 센트로 공모가 아래까지 내려왔어요.", a="ant_down",
      rep={"팔 점 오 퍼센트": "8.5%", "이십사 일": "24일", "팔십일 달러 구십일 센트": "81.91달러"}),
 dict(id="b2s23", say="회사가 나흘 만에 달라졌을 리는 없죠. 주가를 움직인 건 회사보다, 시장 분위기였어요.", a="ant_mood"),
 # 5장
 dict(id="b2s24", say="이십삼 일, 엔비디아 이사회는 만장일치로 젠슨 황을 CEO로 복귀시켰어요. 물러난 지 열하루 만이에요.", a="back", ch=("5장", "CEO의 귀환"),
      rep={"이십삼 일": "23일", "열하루": "11일"}),
 dict(id="b2s25", say="트럼프 대통령이 복귀를 촉구했고, 이사회는 정부 고위 관계자들에게서 국가 안보 위험이 없다는 조언을 받았다고 밝혔어요.", a="trump"),
 dict(id="b2s26", say="그날 엔비디아 주가는 삼십일 퍼센트 뛰었어요. 하지만 다음 이틀 동안, 다시 십 퍼센트 가까이 빠졌어요.", a="rebound",
      rep={"삼십일 퍼센트": "31%", "십 퍼센트": "10%"}),
 dict(id="b2s27", say="이사회 자체 조사와 정부 조사도 아직 끝나지 않았어요.", a="probe"),
 # 6장
 dict(id="b2s28", say="그럼 이건 버블일까요? 양쪽 이야기를 들어 볼게요.", a="debate", ch=("6장", "버블일까?")),
 dict(id="b2s29", say="아니라는 쪽은 숫자를 봐요. 프리덤 캐피털의 에고르 톨마체프는, 돈 버는 힘은 그대로고, 주가엔 이미 위험이 많이 반영됐다고 했어요.", a="bull"),
 dict(id="b2s30", say="걱정하는 쪽은 조건을 봐요. HB 웰스의 마이클 캐스퍼는, 빅테크가 계속 돈을 쓰는 한 AI 수요는 강하다고 했어요. 거꾸로 말하면, 그 돈줄이 멈추면 얘기가 달라진다는 거죠.", a="bear"),
 dict(id="b2s31", say="결국 문제는 실적이 아니라 기대예요. 기대가 실적보다 빨리 달리면, 작은 악재에도 크게 떨어져요.", a="expect"),
 # 7장
 dict(id="b2s32", say="개인 투자자라면, 지금 뭘 봐야 할까요? 신호 세 가지예요.", a="signals", ch=("7장", "지금 봐야 할\n신호 3가지"), rep={"세 가지": "3가지"}),
 dict(id="b2s33", say="첫째, 빅테크의 설비투자 계획이에요. 데이터센터에 쓰는 돈이 줄기 시작하면, AI 칩 수요도 꺾여요.", a="sig1"),
 dict(id="b2s34", say="둘째, 엔비디아의 다음 분기 전망이에요. 이번엔 천삼백억 달러였어요. 이 숫자가 내려가기 시작하면, 그게 진짜 신호예요.", a="sig2",
      rep={"천삼백억 달러": "1,300억 달러"}),
 dict(id="b2s35", say="셋째, 금리예요. 다음 달 연준 회의에서 금리 방향이 정해지면, AI 주식 분위기도 바뀔 수 있어요.", a="sig3"),
 dict(id="b2s36", say="주가는 하루에 삼십 퍼센트씩 오르내릴 수 있어요. 그럴수록 뉴스 한 줄보다, 이 세 가지 숫자를 보세요. 이 영상은 투자 권유가 아니에요.", a="calm",
      rep={"삼십 퍼센트": "30%", "세 가지": "3가지"}),
 dict(id="b2s37", say="앤트로픽이 상장 전에 어떤 회사였는지 궁금하다면, 앤트로픽 상장 편도 함께 보세요.", a="end"),
]
