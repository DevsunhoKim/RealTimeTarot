import { NextResponse } from "next/server";

export const runtime = 'edge';

export async function POST(req: Request) {
    try {
        const { cards } = await req.json();
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            console.error("Missing GEMINI_API_KEY");
            return NextResponse.json({ error: "API 키가 설정되지 않았습니다." }, { status: 500 });
        }

        const cardInfo = cards.map((c: any) => `${c.name} (${c.isReversed ? '역방향' : '정방향'})`).join(", ");

        const prompt = `당신은 MZ 세대에게 인기 있는 탑티어 타로 마스터입니다. 
    선택된 카드들: ${cardInfo}
    
    다음 지침을 엄격히 따라 해석을 작성하세요:
    1. 콘셉트: '츤데레 마스터'. 말투는 반말과 존댓말을 섞어서, 아주 솔직하고 직설적으로 '팩폭'을 날려주세요. 하트나 과한 이모지는 빼고 시니컬하면서도 신뢰감 있게 말하세요.
    2. 구성: 과거-현재-미래의 흐름이 하나로 이어지는 '서사'가 있어야 합니다. 각 카드 설명을 따로 나열하지 마세요.
    3. 분량: 공백 포함 800~1000자 정도로 아주 자세하게 작성하세요.
    4. 내용: 추상적인 말은 빼고, 지금 당장 실천할 수 있는 구체적인 행동(Solution)을 제시하세요.
    5. 형식: 마크다운(##, **, 리스트 등)을 절대 사용하지 마세요. 오직 줄바꿈으로만 가독성을 높이세요.`;

        // gemini-2.5-flash 모델 사용
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }]
                })
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Gemini API Error:", errorData);
            return NextResponse.json({
                error: "AI 서비스 오류",
                details: errorData.error?.message || "Unknown error"
            }, { status: response.status });
        }

        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "해석을 생성하지 못했습니다.";

        return NextResponse.json({ reading: text });
    } catch (error: any) {
        console.error("Server Error:", error);
        return NextResponse.json({
            error: "서버 에러",
            details: error.message
        }, { status: 500 });
    }
}
