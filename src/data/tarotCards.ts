export interface TarotCardData {
    id: number;
    name: string;
    nameKr: string;
    image: string; // Image filename in public/images/
    keywords: string[];
    description: string;
    animal: string;
}

export const TAROT_CARDS: TarotCardData[] = [
    {
        id: 0,
        name: "The Fool",
        nameKr: "바보",
        image: "/images/cards/card-0.png",
        keywords: ["순수", "모험", "호기심", "자유"],
        description: "나비만 보고 절벽 끝을 따라가는 천진난만한 아기 고양이입니다. 두려움 없이 새로운 세상을 향해 발을 내딛네요!",
        animal: "Foolish Cat"
    },
    {
        id: 1,
        name: "The Magician",
        nameKr: "마법사",
        image: "/images/cards/card-1.png",
        keywords: ["능력", "창조", "집중", "시작"],
        description: "앞발로 츄르와 장난감을 자유자재로 다루는 능력자 마법사 고양이입니다. 무엇이든 이룰 수 있는 힘이 있어요.",
        animal: "Magic Cat"
    },
    {
        id: 2,
        name: "The High Priestess",
        nameKr: "고위 여사제",
        image: "/images/cards/card-2.png",
        keywords: ["지혜", "직관", "비밀", "신비"],
        description: "달빛 아래 조용히 눈을 감고 있는 신비로운 하얀 고양이입니다. 보이지 않는 진실을 꿰뚫어 보고 있어요.",
        animal: "Mystic Cat"
    },
    {
        id: 3,
        name: "The Empress",
        nameKr: "여황제",
        image: "/images/cards/card-3.png",
        keywords: ["풍요", "편안함", "사랑", "모성"],
        description: "폭신한 방석 위에서 그루밍을 즐기는 우아한 여왕 고양이입니다. 모든 것이 넉넉하고 평화롭네요.",
        animal: "Queen Cat"
    },
    {
        id: 4,
        name: "The Emperor",
        nameKr: "황제",
        image: "/images/cards/card-4.png",
        keywords: ["권위", "책임", "질서", "성공"],
        description: "가장 높은 캣타워 꼭대기에 앉아 영역을 감시하는 대장 고양이입니다. 든든하고 위엄이 넘쳐요.",
        animal: "King Cat"
    },
    {
        id: 5,
        name: "The Hierophant",
        nameKr: "교황",
        image: "/images/cards/card-5.png",
        keywords: ["배움", "다정함", "조언", "규칙"],
        description: "어린 고양이들에게 사냥법을 가르쳐주는 지혜로운 선생님 고양이입니다. 올바른 길로 안내해 줄 거예요.",
        animal: "Teacher Cat"
    },
    {
        id: 6,
        name: "The Lovers",
        nameKr: "연인",
        image: "/images/cards/card-6.png",
        keywords: ["사랑", "조화", "선택", "유대감"],
        description: "서로 꼬리를 감고 다정하게 뺨을 부비는 두 마리의 고양이입니다. 사랑과 우정이 가득한 순간이네요.",
        animal: "Loving Cats"
    },
    {
        id: 7,
        name: "The Chariot",
        nameKr: "전차",
        image: "/images/cards/card-7.png",
        keywords: ["전진", "승리", "의지", "이동"],
        description: "박스 자동차를 타고 거침없이 달리는 용감한 고양이입니다. 목표를 향해 망설임 없이 돌진하세요!",
        animal: "Rider Cat"
    },
    {
        id: 8,
        name: "Strength",
        nameKr: "힘",
        image: "/images/cards/card-8.png",
        keywords: ["인내", "용기", "부드러움", "포용"],
        description: "커다란 사자의 갈기를 장난감처럼 빗겨주는 작은 고양이입니다. 부드러운 카리스마가 진짜 힘이에요.",
        animal: "Strong Cat"
    },
    {
        id: 9,
        name: "The Hermit",
        nameKr: "은둔자",
        image: "/images/cards/card-9.png",
        keywords: ["성찰", "탐구", "홀로 있음", "지혜"],
        description: "어두운 상자 속에서 반딧불이를 관찰하는 철학자 고양이입니다. 혼자만의 시간은 깊은 깨달음을 줍니다.",
        animal: "Hermit Cat"
    },
    {
        id: 10,
        name: "Wheel of Fortune",
        nameKr: "운명의 수레바퀴",
        image: "/images/cards/card-10.png",
        keywords: ["변화", "운명", "행운", "타이밍"],
        description: "빙글빙글 돌아가는 챗바퀴를 신나게 타는 고양이입니다. 행운은 돌고 돌아 결국 당신에게 올 거예요.",
        animal: "Lucky Cat"
    },
    {
        id: 11,
        name: "Justice",
        nameKr: "정의",
        image: "/images/cards/card-11.png",
        keywords: ["공정", "균형", "진실", "결단"],
        description: "간식의 무게를 정확하게 재고 있는 판사 고양이입니다. 치우침 없이 공정하게 판단합니다.",
        animal: "Judge Cat"
    },
    {
        id: 12,
        name: "The Hanged Man",
        nameKr: "매달린 사람",
        image: "/images/cards/card-12.png",
        keywords: ["희생", "기다림", "새로운 관점", "정지"],
        description: "커튼에 거꾸로 매달려 세상을 바라보는 엉뚱한 고양이입니다. 가끔은 다른 각도로 봐야 답이 보이죠.",
        animal: "Hanging Cat"
    },
    {
        id: 13,
        name: "Death",
        nameKr: "죽음",
        image: "/images/cards/card-13.png",
        keywords: ["끝과 시작", "이별", "변화", "재탄생"],
        description: "낡은 털실 뭉치를 버리고 새 장난감을 맞이하는 고양이입니다. 끝은 곧 새로운 시작을 의미해요.",
        animal: "Reborn Cat"
    },
    {
        id: 14,
        name: "Temperance",
        nameKr: "절제",
        image: "/images/cards/card-14.png",
        keywords: ["조절", "치유", "화합", "인내"],
        description: "두 개의 물그릇 사이에서 물을 섞어 완벽한 온도를 맞추는 고양이입니다. 균형이 중요해요.",
        animal: "Angel Cat"
    },
    {
        id: 15,
        name: "The Devil",
        nameKr: "악마",
        image: "/images/cards/card-15.png",
        keywords: ["유혹", "집착", "구속", "욕망"],
        description: "맛있는 츄르의 유혹에 빠져 꼼짝 못 하는 고양이입니다. 너무 달콤한 유혹은 조심해야 해요!",
        animal: "Devil Cat"
    },
    {
        id: 16,
        name: "The Tower",
        nameKr: "탑",
        image: "/images/cards/card-16.png",
        keywords: ["파괴", "충격", "추락", "변화"],
        description: "열심히 쌓은 캣타워가 와르르 무너져 깜짝 놀란 고양이입니다. 하지만 더 튼튼하게 다시 지으면 되죠.",
        animal: "Tower Cat"
    },
    {
        id: 17,
        name: "The Star",
        nameKr: "별",
        image: "/images/cards/card-17.png",
        keywords: ["희망", "영감", "치유", "순수"],
        description: "밤하늘의 반짝이는 별을 잡으려고 손을 뻗는 꿈 많은 고양이입니다. 희망을 잃지 마세요.",
        animal: "Star Cat"
    },
    {
        id: 18,
        name: "The Moon",
        nameKr: "달",
        image: "/images/cards/card-18.png",
        keywords: ["불안", "환상", "무의식", "직감"],
        description: "달빛에 비친 그림자를 보고 꼬리를 부풀린 고양이입니다. 두려워하지 마세요, 그저 그림자일 뿐이에요.",
        animal: "Moon Cat"
    },
    {
        id: 19,
        name: "The Sun",
        nameKr: "태양",
        image: "/images/cards/card-19.png",
        keywords: ["성공", "활력", "기쁨", "명확함"],
        description: "따스한 햇살 아래 배를 드러내고 꿀잠을 자는 행복한 고양이입니다. 모든 일이 밝게 빛날 거예요!",
        animal: "Sun Cat"
    },
    {
        id: 20,
        name: "Judgement",
        nameKr: "심판",
        image: "/images/cards/card-20.png",
        keywords: ["부활", "소식", "각성", "결과"],
        description: "캔 따는 소리에 벌떡 일어난 고양이입니다. 기다리던 기쁜 소식을 듣게 될 거예요.",
        animal: "Angel Cat"
    },
    {
        id: 21,
        name: "The World",
        nameKr: "세계",
        image: "/images/cards/card-21.png",
        keywords: ["완성", "통합", "여행", "성취"],
        description: "지구본 위에서 만족스런 표정으로 골골송을 부르는 고양이입니다. 당신의 세상은 이제 완벽해요.",
        animal: "World Cat"
    }
];
