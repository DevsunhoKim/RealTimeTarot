
import Replicate from "replicate";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env.local') });

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
});

// 0번(The Fool)은 이미 성공했으므로 제외. 1번부터 시작.
const cardsToGenerate = [
    // { id: 0, name: "The Fool" }, 
    { id: 1, name: "The Magician" },
    { id: 2, name: "The High Priestess" },
    { id: 3, name: "The Empress" },
    { id: 4, name: "The Emperor" },
    { id: 5, name: "The Hierophant" },
    { id: 6, name: "The Lovers" },
    { id: 7, name: "The Chariot" },
    { id: 8, name: "Strength" },
    { id: 9, name: "The Hermit" },
    { id: 10, name: "Wheel of Fortune" },
    { id: 11, name: "Justice" },
    { id: 12, name: "The Hanged Man" },
    { id: 13, name: "Death" },
    { id: 14, name: "Temperance" },
    { id: 15, name: "The Devil" },
    { id: 16, name: "The Tower" },
    { id: 17, name: "The Star" },
    { id: 18, name: "The Moon" },
    { id: 19, name: "The Sun" },
    { id: 20, name: "Judgement" },
    { id: 21, name: "The World" }
];

const outputDir = path.join(__dirname, '../public/images/cards');
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// 지연 함수 (ms 단위)
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function generateCards() {
    if (!process.env.REPLICATE_API_TOKEN) {
        console.error("❌ 오류: .env.local에 REPLICATE_API_TOKEN이 없습니다.");
        return;
    }

    console.log("🐱 '고양이 타로' 21장 생성 재개 (12초 안전 딜레이 적용)");
    console.log("---------------------------------------------------------");

    for (const card of cardsToGenerate) {
        console.log(`\n▶️  [${card.id}: ${card.name}] 생성 시도...`);

        const prompt = `A tarot card design of ${card.name} featuring a cute, mystical Cat character. 
    Adorable cat wearing tarot costume related to ${card.name}, fantasy digital art style, 
    soft glowing lighting, detailed magical background, sparkles.
    Vibrant colors, high quality, masterpiece, winning anime art. 
    NO text, NO borders, centered composition.`;

        try {
            const output = await replicate.run(
                "black-forest-labs/flux-schnell",
                {
                    input: {
                        prompt: prompt,
                        aspect_ratio: "2:3",
                        output_format: "png",
                        go_fast: true,
                        megapixels: "1"
                    }
                }
            );

            const imageUrl = output[0];

            const response = await fetch(imageUrl);
            const buffer = await response.arrayBuffer();
            const fileName = `card-${card.id}.png`;
            const filePath = path.join(outputDir, fileName);

            fs.writeFileSync(filePath, Buffer.from(buffer));
            console.log(`   ✅ 저장 완료: ${fileName}`);

            // 성공 후 12초 대기
            console.log("   ⏳ 속도 제한 방지를 위해 12초 대기 중...");
            await delay(12000);

        } catch (error) {
            console.error(`   ❌ 실패: ${error.message}`);
            await delay(12000); // 실패 시에도 대기
        }
    }

    console.log("\n✨ 모든 작업 종료!");
}

generateCards();
