import { TarotCardData } from '@/data/tarotCards';

interface ReadingContext {
    cards: TarotCardData[];
    positions: string[];
}

const PAST_INTROS = [
    "과거를 돌아보면",
    "지난날을 되돌아보니",
    "과거의 너는",
    "예전의 너를 보면",
];

const PRESENT_INTROS = [
    "지금 이 순간",
    "현재의 너는",
    "지금 상황을 보면",
    "요즘 너를 보니",
];

const FUTURE_INTROS = [
    "앞으로는",
    "미래의 너는",
    "앞으로 너에게",
    "앞날을 보면",
];

const CONNECTIONS = [
    "그리고",
    "그래서",
    "하지만",
    "그런데",
    "그리고 지금은",
    "그래서 지금",
    "하지만 앞으로는",
];

const ENDINGS = [
    "기억해, 네가 선택한 길이야.",
    "믿어봐, 모든 게 잘 될 거야.",
    "너는 충분히 잘하고 있어.",
    "네 직감을 따라가도 돼.",
];

export function generateTarotReading(cards: TarotCardData[]): string {
    if (cards.length !== 3) {
        return "3장의 카드가 필요합니다.";
    }

    const [past, present, future] = cards;

    // 카드 키워드와 설명을 기반으로 운세 생성
    const pastText = generateCardText(past, "과거");
    const presentText = generateCardText(present, "현재");
    const futureText = generateCardText(future, "미래");

    // 자연스러운 연결로 운세 텍스트 생성
    const pastIntro = PAST_INTROS[Math.floor(Math.random() * PAST_INTROS.length)];
    const presentIntro = PRESENT_INTROS[Math.floor(Math.random() * PRESENT_INTROS.length)];
    const futureIntro = FUTURE_INTROS[Math.floor(Math.random() * FUTURE_INTROS.length)];
    const connection1 = CONNECTIONS[Math.floor(Math.random() * CONNECTIONS.length)];
    const connection2 = CONNECTIONS[Math.floor(Math.random() * CONNECTIONS.length)];
    const ending = ENDINGS[Math.floor(Math.random() * ENDINGS.length)];

    const reading = `${pastIntro} ${pastText}

${connection1} ${presentIntro} ${presentText}

${connection2} ${futureIntro} ${futureText}

${ending}`;

    return reading;
}

function generateCardText(card: TarotCardData, position: string): string {
    const keywords = card.keywords.join(", ");
    const descriptions: Record<string, string[]> = {
        "바보": [
            "순수한 마음으로 새로운 도전을 시작했어. 두려움 없이 앞으로 나아가는 모습이 인상적이었지.",
            "미지의 세계를 향해 발걸음을 내딛었어. 그 순수함과 호기심이 지금의 너를 만들었어.",
        ],
        "마법사": [
            "무엇이든 할 수 있다는 자신감이 넘쳤어. 능력과 의지로 상황을 바꿀 수 있었지.",
            "목표를 향해 집중력을 발휘했어. 네 의지와 능력이 모든 것을 가능하게 만들었어.",
        ],
        "고위 여사제": [
            "직관을 믿고 내면의 목소리에 귀 기울였어. 보이지 않는 진실을 꿰뚫어 봤지.",
            "깊은 지혜와 통찰력으로 상황을 이해했어. 네 직감이 정답이었어.",
        ],
        "여황제": [
            "풍요롭고 안락한 시기였어. 사랑과 편안함이 넘치는 순간들이었지.",
            "모든 것이 넉넉하고 평화로웠어. 따뜻한 마음으로 주변을 채워갔어.",
        ],
        "황제": [
            "책임감 있고 확고한 자세로 일을 이끌어갔어. 권위와 리더십을 발휘했지.",
            "질서 정연하게 목표를 향해 나아갔어. 성공을 위한 기반을 다졌어.",
        ],
        "교황": [
            "전통과 지혜를 따르며 성장했어. 배움과 가르침의 시기였지.",
            "조언과 가이드를 받으며 올바른 길을 찾았어. 규칙과 원칙을 중요하게 생각했어.",
        ],
        "연인": [
            "사랑과 조화가 가득했어. 깊은 유대감과 선택의 순간이었지.",
            "관계에서 조화를 이루며 성장했어. 중요한 선택을 내렸어.",
        ],
        "전차": [
            "의지를 가지고 목표를 향해 돌진했어. 승리와 전진의 시기였지.",
            "막힘 없이 앞으로 나아갔어. 강한 의지로 장애물을 극복했어.",
        ],
        "힘": [
            "부드러운 힘으로 상황을 헤쳐나갔어. 인내와 용기가 빛을 발했지.",
            "카리스마와 부드러움으로 문제를 해결했어. 진정한 힘을 보여줬어.",
        ],
        "은둔자": [
            "혼자만의 시간을 보내며 깊이 성찰했어. 지혜를 찾기 위해 탐구했지.",
            "고독 속에서 큰 깨달음을 얻었어. 내면의 목소리에 집중했어.",
        ],
        "운명의 수레바퀴": [
            "운명이 돌고 도는 것을 체감했어. 변화와 행운이 함께했지.",
            "타이밍이 모든 것을 결정했어. 운명의 흐름에 맡겼어.",
        ],
        "정의": [
            "공정함과 균형을 추구했어. 진실을 밝히며 공정한 판단을 내렸지.",
            "공정하고 객관적인 시각으로 상황을 봤어. 정의와 균형을 이루었어.",
        ],
        "매달린 사람": [
            "기다림과 희생의 시간이었어. 새로운 관점을 얻기 위해 멈췄지.",
            "다른 각도에서 상황을 바라봤어. 인내와 수용의 시간이었어.",
        ],
        "죽음": [
            "끝과 시작이 공존했어. 변화와 재탄생의 순간이었지.",
            "낡은 것을 버리고 새로운 것을 맞이했어. 큰 변화의 시기였어.",
        ],
        "절제": [
            "균형과 조절을 중요하게 생각했어. 화합과 치유를 이루었지.",
            "인내심으로 완벽한 균형을 찾았어. 조절과 화합으로 문제를 해결했어.",
        ],
        "악마": [
            "유혹과 집착에 빠졌을 수도 있어. 하지만 그 경험이 너를 성장시켰지.",
            "욕망과 구속의 시기였어. 하지만 그 덕분에 자유의 소중함을 알았어.",
        ],
        "탑": [
            "예상치 못한 충격이 있었어. 하지만 그 파괴가 새로운 시작이었지.",
            "완전히 무너졌지만 더 튼튼하게 다시 일어섰어. 변화의 순간이었어.",
        ],
        "별": [
            "희망과 영감이 넘쳤어. 치유와 순수한 에너지가 흐르는 시기였지.",
            "밝은 미래를 향해 나아갔어. 희망을 잃지 않고 꿈을 향해 달렸어.",
        ],
        "달": [
            "불안과 환상 사이에서 헤맸어. 하지만 직감이 네게 힌트를 줬지.",
            "무의식의 세계를 탐험했어. 두려움을 넘어 진실을 찾았어.",
        ],
        "태양": [
            "성공과 활력이 넘쳤어. 모든 일이 밝게 빛나는 시기였지.",
            "기쁨과 명확함이 가득했어. 긍정적인 에너지가 모든 것을 밝혔어.",
        ],
        "심판": [
            "중요한 소식과 각성이 있었어. 부활과 새로운 시작의 신호였지.",
            "기다리던 기쁜 소식을 들었어. 각성과 결과의 순간이었어.",
        ],
        "세계": [
            "완성과 성취의 시기였어. 모든 것이 통합되고 완벽해졌지.",
            "목표를 완성했어. 통합과 성취의 순간이었어.",
        ],
    };

    const cardDescriptions = descriptions[card.nameKr] || [
        `${card.description} ${position}를 나타내는 카드야.`,
    ];

    const baseText = cardDescriptions[Math.floor(Math.random() * cardDescriptions.length)];
    
    // 키워드를 자연스럽게 통합
    const advice = getAdviceForKeywords(card.keywords, position);
    
    return `${baseText} ${advice}`;
}

function getAdviceForKeywords(keywords: string[], position: string): string {
    const adviceMap: Record<string, string> = {
        "순수": "순수한 마음으로 임하라.",
        "모험": "새로운 도전을 두려워하지 마라.",
        "능력": "네 능력을 믿어라.",
        "지혜": "내면의 지혜를 따라라.",
        "사랑": "사랑을 베풀어라.",
        "성공": "성공을 위한 준비를 하라.",
        "변화": "변화를 받아들여라.",
        "인내": "인내심을 갖고 기다려라.",
        "희망": "희망을 잃지 마라.",
        "균형": "균형을 유지하라.",
    };

    const relevantAdvice = keywords
        .map(keyword => adviceMap[keyword])
        .filter(advice => advice)
        .slice(0, 2)
        .join(" ");

    return relevantAdvice || "네 직감을 믿고 나아가라.";
}
