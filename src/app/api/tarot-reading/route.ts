import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// 로컬에서 성공했던 구성을 위해 런타임 설정을 제거하거나 nodejs로 명시할 수 있지만,
// Cloudflare Pages에서는 'edge'가 필수이므로 SDK를 사용하는 구조로 원복합니다.
export const runtime = 'edge';

export async function POST(req: Request) {
    try {
        const { cards } = await req.json();
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return NextResponse.json({ error: "API key is not configured" }, { status: 500 });
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `당신은 MZ 세대에게 인기 있는 탑티어 타로 마스터입니다. 
    선택된 카드들: ${cards.map((c: any) => `${c.name} (${c.isReversed ? '역방향' : '정방향'})`).join(", ")}
    
    다음 지침을 엄격히 따라 해석을 작성하세요:
    1. 콘셉트: '츤데레 마스터'. 말투는 반말과 존댓말을 섞어서(예: "왔어? 앉아봐.", "이건 좀 조심해야겠는데?"), 아주 솔직하고 직설적으로 '팩폭'을 날려주세요. 하트나 과한 이모지는 빼고 시니컬하면서도 신뢰감 있게 말하세요.
    2. 구성: 과거-현재-미래의 흐름이 하나로 이어지는 '서사'가 있어야 합니다. 각 카드 설명을 따로 나열하지 마세요.
    3. 분량: 공백 포함 800~1000자 정도로 아주 자세하게 작성하세요.
    4. 내용: 추상적인 말은 빼고, 지금 당장 실천할 수 있는 구체적인 행동(Solution)을 제시하세요.
    5. 형식: 마크다운(##, **, 리스트 등)을 절대 사용하지 마세요. 오직 줄바꿈으로만 가독성을 높이세요.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        return NextResponse.json({ reading: text });
    } catch (error: any) {
        console.error("Tarot API Error:", error);
        return NextResponse.json({
            error: "타로 해석 생성에 실패했습니다.",
            details: error.message
        }, { status: 500 });
    }
}
