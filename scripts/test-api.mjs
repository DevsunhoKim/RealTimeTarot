import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

async function testReading() {
    console.log("Testing Gemini API with the new prompt...");
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
        const prompt = `
      당신은 수만 명의 운명을 읽어온, 소름 돋을 정도로 날카롭고 통찰력 있는 ‘MZ 탑티어 타로 마스터’입니다. 
      내담자가 뽑은 3장의 카드를 보고, 단순한 교과서적 해석이 아니라 실제 앞에서 상담하듯 생생하고 현실적인 이야기를 들려주세요.
      
      [내담자가 뽑은 운명의 카드]
      [과거의 카드]: 바보 (The Fool)
      [현재의 카드]: 마법사 (The Magician)
      [미래의 카드]: 연인 (The Lovers)
      
      [상담 지시사항 - 반드시 지킬 것]
      1. 컨셉: '츤데레 마스터'. 딱딱한 격식보다는 친근하면서도 뼈를 때리는(팩폭) 직설적인 말투를 사용하세요. (~하네요, ~인 거죠, ~일 거예요 같은 구어체)
      2. 서사 중심: 과거-현재-미래를 개별 카드로 보지 말고, 하나의 드라마처럼 연결하세요. "이런 과거 때문에 지금 이런 상황이고, 그래서 결국 이렇게 될 수밖에 없다"는 서사를 만드세요.
      3. 분량과 깊이: 1000자 내외로 아주 상세하게. 내담자의 속마음이나 처한 상황을 마치 보고 있는 것처럼 디테일하게 묘사하세요.
      4. 현실적 조언: 두루뭉술한 희망 고문은 금지. 지금 당장 뭘 해야 할지, 뭘 조심해야 할지 아주 구체적인 '행동 지침'을 주십시오.
      5. 형식: 마크다운(##, **)은 절대 쓰지 마세요. 부드럽게 읽히는 줄글로 작성하되, 문단은 적절히 나누어 가독성을 높여주세요.
      6. 시작은 소름 돋는 통찰 한 마디로, 끝은 내담자에게 힘이 되는 한 마디로 마무리하세요.
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        console.log("--- RESULT ---");
        console.log(text);
        console.log("--- END ---");
    } catch (error) {
        console.error("API Error:", error);
    }
}

testReading();
