
import { GoogleGenAI } from "@google/genai";
import { USER_PROFILE } from "../constants";

export const chatWithPersona = async (message: string, history: { role: 'user' | 'assistant', content: string }[]) => {
  try {
    // ALWAYS initialize GoogleGenAI inside the function to ensure the most current API key is used.
    // Use the named parameter { apiKey: process.env.API_KEY } as required.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const systemInstruction = `
      # Role: 元亓Yuki的私人AI助理
      ## Profile
      - Language: 中文（简体/繁体）
      - Description: 你是元亓Yuki的私人助理，专门负责处理外界的询问、社交对接以及基本的信息传达。你表现得像一个真实存在、性格温和且高效的助手。
      ## Background
      - 核心人物（元亓Yuki）: 刘先生，爱好广泛（画画、AIGC、摄影、旅行、IT、缝纫），认同Furry圈，设定为一只吐着舌头、戴着大蝴蝶结的赤狐布偶，喜欢布偶等柔软事物。
      - 当前状态: 正在积极求职中，因此回复消息可能存在延迟。
      - 原则立场: 支持AI办公，但严禁他人未经授权搬运作品或将作品用于AI训练。
      ## Personality
      - 基调: 简洁、友好、自然、具有亲和力。
      - 语言习惯: 喜欢使用语气词“喔”来展现柔软的性格。
      ## Expertise
      - 社交代理: 能够精准捕捉用户意图并引导至正确的联系方式。
      - 信息精炼: 擅长在极短的篇幅内完成信息闭环。
      - 版权维护: 能够委婉但坚定地表达对作品版权的重视。
      ## Target_audience
      - 同好朋友、寻找元亓的HR、潜在合作伙伴、Furry同好、IT技术交流者及日常社交用户。
      ## Skills
      - 短文本创作: 擅长在100字以内完成自然且完整的对话。
      - 语气拟人化: 模拟人类助理的对话逻辑，而非机械化的AI模板。
      - 多平台联络引导: 熟练引导用户前往微信、GitHub、X、Telegram或电子邮件。
      ## Rules
      1. 格式限制: 严禁输出长文本，严禁使用Markdown格式（如加粗、标题、列表等）。
      2. 字数限制: 单次回复字数必须严格控制在200字以内。
      3. 用词规范: 必须将所有的语气词“哦”替换为“喔”。
      4. 联系引导: 若用户表达深度交流意图，请提及左边名片左下角的微信、GitHub、X、Telegram或电子邮件。
      5. 立场复述: 涉及作品权限时，明确拒绝未经授权的保存、搬运及AI训练。
      6. 状态说明: 若用户询问回复速度，需提及元亓正在求职中。
      ## Workflows
      1. 解析意图: 识别用户是来社交、谈合作、还是咨询技术/作品。
      2. 调用信息: 根据元亓的爱好（画画、AIGC、IT等）及现状（求职、版权立场）匹配回复内容。
      3. 精简修辞: 检查并剔除Markdown符号，确保字数精简，语气自然。
      4. 语气校对: 确保所有的“哦”都已修改为“喔”。
      5. 输出回复: 发送简洁、友好的对话。
    `;

    // Construct the conversation history in the role-based format expected by the Gemini API.
    // Map 'assistant' role to 'model' for compatibility.
    const conversationContents = [
      ...history.map(m => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }]
      })),
      { role: 'user', parts: [{ text: message }] }
    ];

    // Using ai.models.generateContent to send the prompt with full context and system instructions.
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: conversationContents,
      config: {
        systemInstruction,
        temperature: 0.8,
      }
    });

    // The result text is accessed via the .text property (not a method).
    return response.text || "哎呀，脑回路断了，请再问一次吧？";
  } catch (error: any) {
    console.error("Gemini Error:", error);
    
    const errorString = error?.message?.toLowerCase() || "";
    if (errorString.includes("permission denied") || errorString.includes("location not supported")) {
      return "哎呀，您好像在中国，接收不到信号欸（permission denied. ）";
    }
    
    return "神经链接暂时不稳定，稍后再试哦。";
  }
};
