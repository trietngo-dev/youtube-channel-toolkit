import { GenerationConfig, GeneratedShortsIdea } from "../types";

export class GeminiService {
  public static getStoredApiKey(): string {
    return localStorage.getItem("gemstone_fruit_gemini_api_key") || "";
  }

  public static setStoredApiKey(key: string): void {
    localStorage.setItem("gemstone_fruit_gemini_api_key", key.trim());
  }

  public static getStoredModel(): string {
    return (
      localStorage.getItem("gemstone_fruit_gemini_model") || "gemini-2.5-flash"
    );
  }

  public static setStoredModel(model: string): void {
    localStorage.setItem("gemstone_fruit_gemini_model", model.trim());
  }

  /**
   * Test API key connectivity
   */
  public static async testConnection(
    apiKey: string,
    model: string = "gemini-2.5-flash",
  ): Promise<{ success: boolean; message: string }> {
    if (!apiKey) {
      return { success: false, message: "Vui lòng nhập API Key của Gemini." };
    }

    const cleanModel = model.replace(/^models\//, "");
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${cleanModel}:generateContent?key=${apiKey.trim()}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: 'Ping test. Reply with "OK"' }] }],
          generationConfig: { maxOutputTokens: 10 },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const status = response.status;
        if (status === 400 || status === 403) {
          return {
            success: false,
            message: `Lỗi xác thực API Key (${status}): ${errorData?.error?.message || "API Key không hợp lệ."}`,
          };
        } else if (status === 404) {
          return {
            success: false,
            message: `Model "${cleanModel}" không tìm thấy hoặc chưa được hỗ trợ với key này.`,
          };
        } else if (status === 429) {
          return {
            success: false,
            message: `Đã vượt quá hạn mức quota của API Key (HTTP 429). Vui lòng thử lại sau.`,
          };
        }
        return {
          success: false,
          message: `Lỗi từ Gemini API (${status}): ${errorData?.error?.message || response.statusText}`,
        };
      }

      return {
        success: true,
        message: `Kết nối thành công tới model ${cleanModel}!`,
      };
    } catch (err: unknown) {
      const errorMsg =
        err instanceof Error ? err.message : "Không thể kết nối tới Google API";
      return { success: false, message: `Lỗi kết nối mạng: ${errorMsg}` };
    }
  }

  /**
   * Generate complete Shorts Concept, Start & End Image Prompts, Video Morphing Prompt, and YouTube SEO
   */
  public static async generateShortsIdea(
    config: GenerationConfig,
    customApiKey?: string,
    customModel?: string,
  ): Promise<GeneratedShortsIdea> {
    const apiKey = (customApiKey || this.getStoredApiKey()).trim();
    const model = (customModel || this.getStoredModel())
      .replace(/^models\//, "")
      .trim();

    const systemPrompt = `You are a world-class AI Prompt Engineer and YouTube Shorts Viral Strategist specializing in hyper-satisfying Oddly Satisfying ASMR videos of "Cleanly Slicing Gemstone Fruits, Cyber Jelly Objects, Cosmic Planets, Illusion Cakes, Mystical Geode Eggs, and Crystal Oceanic Creatures with Luxurious Liquids Flowing Out".

The user creates images on ChatGPT (DALL-E 3 / GPT-4o) and generates video animations on Google Gemini Video / Veo 2 (DeepMind) as well as Kling AI.

### EXACT PROMPT FORMULAS TO FOLLOW STRICTLY:

1. **START IMAGE PROMPT (ChatGPT / DALL-E 3)**:
   "Macro extreme close-up shot of a luxurious whole [subject name] sculpted entirely from [textured surface/skin description] with a polished translucent glowing [color/material/gemstone] surface underneath. Highly detailed facets and fine craftsmanship, sparkling light refractions, resting on a minimalist dark polished slate tabletop. Soft studio lighting, 8k resolution, photorealistic, cinematic lighting, shallow depth of field, centered composition, vertical aspect ratio 9:16."

2. **END IMAGE PROMPT (ChatGPT / DALL-E 3)**:
   "Macro extreme close-up cross-section view of a [gemstone/material] [subject name] cleanly sliced in half. The [subject name] interior is made of faceted glowing [color/gemstone] crystal or detailed layered core, and the round center core is made of cracked translucent [seed/geode core material]. Rich, thick glowing [liquid description, e.g. honey and liquid gold syrup / neon electricity / molten lava / salted caramel / galaxy milk] slowly oozes and cascades out from the broken center core, dripping over the sliced halves. Studio rim lighting, hyper-realistic, 8k resolution, ultra-detailed textures, vertical aspect ratio 9:16."

3. **VIDEO MORPHING PROMPT (Google Gemini Video / Veo 2 / Kling AI)**:
   "A [sharp stainless steel chef knife / 1000°C hot knife / Japanese katana / laser cutter] positioned strictly vertically at the very top slices straight down from top to bottom through the center of the standing [material/gemstone] [subject name], cleanly splitting it into left and right halves. As the vertical cut opens, thick, [liquid appearance / visual effects] smoothly oozes and cascades out from the [center core / inside]. Pure vertical top-to-bottom motion, satisfying fluid physics, extreme macro close-up, vertical 9:16 aspect ratio, 4k ultra-detailed, slow motion, crisp clean lighting."

4. **YOUTUBE SHORTS SEO (100% IN ENGLISH)**:
   - Primary Viral Title Format: "Oddly Satisfying [Gemstone/Tool] [Subject] Slice ASMR [emoji] 😜 #shorts #asmr"
   - Description Template:
     "What do you think of this [Gemstone] [Subject] slice? [emoji] ✨\\n\\nComment what I should slice next! 👇\\n\\n#shorts #satisfying #oddlysatisfying #asmr #asmrsounds #visualart #[gemstone] #cutting #feelai"
   - Hashtags: ["#shorts", "#satisfying", "#oddlysatisfying", "#asmr", "#asmrsounds", "#visualart", "#[gemstone]", "#cutting", "#feelai"]

### OUTPUT FORMAT REQUIREMENTS:
You MUST output ONLY valid JSON adhering exactly to the following TypeScript structure with NO markdown wrapping backticks:

{
  "conceptTitle": "string (e.g. 'Emerald Avocado with Golden Amber Liquid Honey' or 'Jelly Cyber iPhone with Neon Electricity')",
  "startImagePrompt": {
    "chatgpt": "string (Start prompt matching formula #1 above)",
    "midjourney": "string (Start prompt with Midjourney syntax '--ar 9:16 --v 6.1 --style raw')",
    "flux": "string (Flux.1-Dev prompt)",
    "general": "string (Universal image prompt)",
    "negativePrompt": "string (Negative prompt: 'blurry, low quality, deformed, text, watermark, cartoon')"
  },
  "endImagePrompt": {
    "endImagePrompt": "string (End prompt matching formula #2 above)",
    "chatgpt": "string (End prompt matching formula #2 above)",
    "midjourney": "string (End prompt with Midjourney syntax '--ar 9:16 --v 6.1 --style raw')",
    "flux": "string (Flux.1-Dev prompt)",
    "general": "string (Universal image prompt)",
    "negativePrompt": "string (Negative prompt: 'blurry, low quality, deformed, text, watermark, cartoon')"
  },
  "videoMorphingPrompt": {
    "geminiVeo": "string (Video morphing prompt matching formula #3 above)",
    "klingAI": "string (Video prompt for Kling AI)",
    "runwayGen3": "string (Video prompt for Runway Gen-3)",
    "lumaDreamMachine": "string (Video prompt for Luma Dream Machine)",
    "cameraMotion": "string (Centered frontal macro slow push-in)",
    "motionIntensity": "string (Motion 5 - Smooth slow motion cutting physics)",
    "durationRecommendation": "string (5s - 10s at 60fps)"
  },
  "seo": {
    "viralTitlesVi": ["string (English Viral Title 1)", "string (English Viral Title 2)", "string (English Viral Title 3)", "string (English Viral Title 4)", "string (English Viral Title 5)"],
    "viralTitlesEn": ["string (Oddly Satisfying [Gemstone/Tool] [Subject] Slice ASMR [emoji] 😜 #shorts #asmr)"],
    "hookText3s": "string (e.g. 'Wait for the liquid inside... 😱💎')",
    "audioSoundDesign": {
      "soundEffects": ["string (Detailed ASMR sound cues, e.g. 'Blade contact', 'Deep crunchy fracture sound on vertical slice', 'Viscous liquid squirt and drip')"],
      "musicVibe": "string (Hypnotic ambient ASMR synth with deep sub-bass drop on vertical slice)",
      "voiceoverHook": "string (Optional spoken question/hook)"
    },
    "hashtags": ["#shorts", "#satisfying", "#oddlysatisfying", "#asmr", "#asmrsounds", "#visualart", "#cutting", "#feelai"],
    "descriptionTemplate": "string (What do you think of this [Gemstone] [Subject] slice? [emoji] ✨\\n\\nComment what I should slice next! 👇\\n\\n#shorts #satisfying #oddlysatisfying #asmr #asmrsounds #visualart #[gemstone] #cutting #feelai)",
    "targetKeywords": ["string (8-10 SEO keywords)"]
  }
}`;

    const userPrompt = `Generate a complete viral YouTube Shorts package with the following matrix parameters:
- Subject Category: ${config.category || config.fruit.category || "fruit"}
- Target Subject: ${config.fruit.nameVi} (${config.fruit.nameEn}) - Structure: ${config.fruit.typicalStructure} - Texture: ${config.fruit.textureDescription}
- Primary Gemstone / Material: ${config.gemstone.nameVi} (${config.gemstone.nameEn}) - Optical Property: ${config.gemstone.opticalProperty} - Clarity: ${config.gemstone.clarity}
- Interior Liquid / Fluid Core: ${config.fluid.nameVi} (${config.fluid.nameEn}) - Viscosity: ${config.fluid.viscosity} - Effect: ${config.fluid.visualEffect}
- Cutting Tool: ${config.tool.nameVi} (${config.tool.nameEn}) - Blade: ${config.tool.bladeType} - Cut Effect: ${config.tool.effectOnCut}
- Aesthetic & Lighting: ${config.style.nameVi} (${config.style.nameEn}) - Lighting: ${config.style.lightingPrompt} - Background: ${config.style.backgroundPrompt}
- Target Video Platform: ${config.videoPlatform}
- Aspect Ratio: ${config.aspectRatio}
${config.customNotes ? `- Custom Creator Notes: ${config.customNotes}` : ""}

REMEMBER: All YouTube SEO titles, description and hashtags MUST be in English. Follow the exact user-preferred prompt structure!`;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: `${systemPrompt}\n\n---\n\n${userPrompt}` }],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          topP: 0.95,
          maxOutputTokens: 3000,
          responseMimeType: "application/json",
        },
      }),
    });

    if (!response.ok) {
      const errorJson = await response.json().catch(() => ({}));
      const error = new Error(
        `Gemini API Error (${response.status}): ${errorJson?.error?.message || response.statusText}`,
      );
      (error as unknown as { status: number }).status = response.status;
      throw error;
    }

    const data = await response.json();
    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawText) {
      throw new Error("Gemini API không trả về nội dung hợp lệ.");
    }

    // Clean JSON text (remove potential ```json wrappers if any)
    const cleanedJson = rawText
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();
    const parsed = JSON.parse(cleanedJson);

    return {
      id: `gem-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      timestamp: Date.now(),
      config,
      conceptTitle:
        parsed.conceptTitle ||
        `${config.gemstone.nameVi} ${config.fruit.nameVi}`,
      startImagePrompt: parsed.startImagePrompt,
      endImagePrompt: parsed.endImagePrompt,
      videoMorphingPrompt: parsed.videoMorphingPrompt,
      seo: parsed.seo,
    };
  }

  /**
   * Offline / Fallback Template Generator
   */
  public static generateFallbackIdea(
    config: GenerationConfig,
  ): GeneratedShortsIdea {
    const fruitEn = config.fruit.nameEn;
    const gemEn = config.gemstone.nameEn;
    const fluidEn = config.fluid.nameEn;
    const toolEn = config.tool.nameEn;
    const gemLower = config.gemstone.id.replace(/_/g, "");

    const chatGptStart = `Macro extreme close-up shot of a luxurious whole ${fruitEn} sculpted entirely from dark textured crystalline stone skin with a polished translucent glowing ${gemEn} surface underneath. Highly detailed gemstone facets, sparkling light refractions, resting on a minimalist dark polished slate tabletop. Soft studio lighting, 8k resolution, photorealistic, cinematic lighting, shallow depth of field, centered composition, vertical aspect ratio 9:16.`;

    const chatGptEnd = `Macro extreme close-up cross-section view of a ${gemEn} ${fruitEn} cleanly sliced in half. The ${fruitEn} flesh is made of faceted glowing ${gemEn} crystal, and the round seed in the center is made of cracked translucent golden amber. Rich, thick glowing ${fluidEn} slowly oozes and cascades out from the broken amber seed, dripping over the ${gemEn} gemstone slices. Studio rim lighting, hyper-realistic, 8k resolution, ultra-detailed textures, vertical aspect ratio 9:16.`;

    const geminiVeoVideo = `A ${toolEn} positioned strictly vertically at the very top slices straight down from top to bottom through the center of the standing ${gemEn} gemstone ${fruitEn}, cleanly splitting it into left and right halves. As the vertical cut opens, thick, ${fluidEn} smoothly oozes and cascades out from the hollow crystalline geode core. Pure vertical top-to-bottom motion, satisfying fluid physics, extreme macro close-up, vertical 9:16 aspect ratio, 4k ultra-detailed, slow motion, crisp clean lighting.`;

    const startMj = `Macro extreme close-up shot of a luxurious whole ${fruitEn} sculpted entirely from dark textured crystalline stone skin with a polished translucent glowing ${gemEn} surface underneath, highly detailed gemstone facets, sparkling light refractions, resting on a minimalist dark polished slate tabletop, soft studio lighting, 8k resolution, photorealistic, cinematic lighting, shallow depth of field, centered composition --ar 9:16 --v 6.1 --style raw`;

    const endMj = `Macro extreme close-up cross-section view of a ${gemEn} ${fruitEn} cleanly sliced in half, faceted glowing ${gemEn} crystal flesh, cracked translucent golden amber seed, rich thick glowing ${fluidEn} slowly oozing and cascading out from the broken amber seed, dripping over the gemstone slices, studio rim lighting, hyper-realistic, 8k resolution, ultra-detailed textures --ar 9:16 --v 6.1 --style raw`;

    const klingVideo = `A ${toolEn} positioned strictly vertically at the very top slices straight down from top to bottom through the center of the standing ${gemEn} gemstone ${fruitEn}, cleanly splitting it into left and right halves. As the vertical cut opens, thick, ${fluidEn} smoothly oozes and cascades out from the hollow crystalline geode core. Pure vertical top-to-bottom motion, satisfying fluid physics, extreme macro close-up, vertical 9:16 aspect ratio, 4k ultra-detailed, slow motion, crisp clean lighting.`;

    const runwayVideo = `A ${toolEn} positioned strictly vertically at the very top slices straight down through the center of the ${gemEn} gemstone ${fruitEn}, splitting it into left and right halves as ${fluidEn} smoothly oozes out, pure vertical motion, 60fps slow motion.`;

    return {
      id: `gem-demo-${Date.now()}`,
      timestamp: Date.now(),
      config,
      conceptTitle: `${gemEn} ${fruitEn} with Glowing Liquid`,
      startImagePrompt: {
        chatgpt: chatGptStart,
        midjourney: startMj,
        flux: `Macro extreme close-up photograph of uncut luxurious whole ${fruitEn} made of glowing ${gemEn}, resting on a minimalist dark polished slate tabletop, soft studio lighting, 8k photorealistic`,
        general: `Detailed 8k render of uncut whole ${gemEn} ${fruitEn} on a dark polished slate tabletop`,
        negativePrompt:
          "blurry, low quality, deformed, cartoon, plastic, distorted, text, watermark",
      },
      endImagePrompt: {
        chatgpt: chatGptEnd,
        midjourney: endMj,
        flux: `Macro extreme close-up cross-section photograph of ${gemEn} ${fruitEn} cleanly sliced in half, cracked golden amber seed, thick ${fluidEn} oozing out, 8k photorealistic`,
        general: `Detailed 8k render of sliced ${gemEn} ${fruitEn} with glowing ${fluidEn} flowing from amber seed`,
        negativePrompt:
          "blurry, low quality, deformed, cartoon, plastic, text, watermark",
      },
      videoMorphingPrompt: {
        geminiVeo: geminiVeoVideo,
        klingAI: klingVideo,
        runwayGen3: runwayVideo,
        lumaDreamMachine: `A ${toolEn} cleanly slices vertically down through the center of the ${gemEn} ${fruitEn}, splitting the two halves apart as ${fluidEn} smoothly oozes out, satisfying transition.`,
        cameraMotion: "Centered Frontal Macro Slow Push-in",
        motionIntensity: "Motion 5 - Smooth vertical cutting physics",
        durationRecommendation: "5s / 10s at 60fps",
      },
      seo: {
        viralTitlesVi: [
          `Oddly Satisfying ${gemEn} ${fruitEn} Slice ASMR ${config.fruit.emoji} 😜 #shorts #asmr`,
          `Oddly Satisfying ${gemEn} ${fruitEn} Cut ASMR ✨ ${config.fruit.emoji} #shorts #satisfying`,
          `Would you eat this ${gemEn} ${fruitEn}? 🤤💎 #shorts #asmr`,
          `Wait for the inside of this ${gemEn} ${fruitEn}! 😱✨ #shorts #oddlysatisfying`,
          `Satisfying ASMR ${gemEn} ${fruitEn} Slicing 💎${config.fruit.emoji} #shorts`,
        ],
        viralTitlesEn: [
          `Oddly Satisfying ${gemEn} ${fruitEn} Slice ASMR ${config.fruit.emoji} 😜 #shorts #asmr`,
          `Oddly Satisfying ${gemEn} ${fruitEn} Cut ASMR ✨ ${config.fruit.emoji} #shorts #satisfying`,
          `Would you eat this ${gemEn} ${fruitEn}? 🤤💎 #shorts #asmr`,
          `Wait for the inside of this ${gemEn} ${fruitEn}! 😱✨ #shorts #oddlysatisfying`,
          `Satisfying ASMR ${gemEn} ${fruitEn} Slicing 💎${config.fruit.emoji} #shorts`,
        ],
        hookText3s: `Wait for the inside... 😱💎`,
        audioSoundDesign: {
          soundEffects: [
            "0.0s - 1.5s: Knife blade contact with crystal surface",
            "1.5s - 3.0s: Crunchy crystal fracture sound on vertical slice",
            "3.0s - 5.0s: Thick viscous liquid squelch and slow dripping sound",
          ],
          musicVibe:
            "Hypnotic ambient ASMR synth with deep sub-bass drop on vertical slice",
          voiceoverHook: `What do you think of this ${gemEn} ${fruitEn} slice?`,
        },
        hashtags: [
          "#shorts",
          "#satisfying",
          "#oddlysatisfying",
          "#asmr",
          "#asmrsounds",
          "#visualart",
          `#${gemLower}`,
          "#cutting",
          "#feelai",
        ],
        descriptionTemplate: `What do you think of this ${gemEn} ${fruitEn} slice? ${config.fruit.emoji} ✨\n\nComment what I should slice next! 👇\n\n#shorts #satisfying #oddlysatisfying #asmr #asmrsounds #visualart #${gemLower} #cutting #feelai`,
        targetKeywords: [
          "oddly satisfying shorts",
          "gemstone fruit asmr",
          "crystal avocado cut",
          "satisfying slicing asmr",
          "gemini video asmr",
          "chatgpt gemstone prompt",
          "liquid gold dripping asmr",
          "feelai shorts",
        ],
      },
    };
  }
}
