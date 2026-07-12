<div align="center">

# 元亓的个人主页 · Yuki's Homepage

**一张赛博朋克风格的数字名片**

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-latest-646CFF?style=flat-square&logo=vite)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)

</div>

---

> **⚠️ AI 生成声明**
>
> 本项目的页面设计、组件结构、样式代码及大部分实现均由 AI（Claude）辅助生成。
> 内容由本人（元亓 Yuki）提供与审核，AI 负责代码落地与迭代。

---

## 项目简介

这是元亓（Yuki）的个人主页，以赛博朋克 / 暗色科技风为主视觉，集成了 AI 智能体对话功能，访客可以直接与页面内的 AI 助理对话，了解关于作者的基本信息、联系方式等。

**核心功能：**
- 3D 视差名片（桌面端鼠标跟踪倾斜效果）
- 悬停展开的联系方式 / 微信二维码
- 接入 Agnes 2.0 Flash API 的内嵌 AI 助理
- 动态粒子背景
- 全响应式布局（移动端 / 桌面端）

---

## 技术栈

| 层级 | 技术 |
|------|------|
| 框架 | React 19 + TypeScript |
| 构建 | Vite |
| 样式 | Tailwind CSS |
| AI   | Agnes 2.0 Flash |

---

## 本地运行

**前置条件：** Node.js 18+

```bash
# 1. 安装依赖
npm install

# 2. 配置环境变量
# 在项目根目录创建 .env.local，写入：
Agnes_api_key=你的_Agnes_API_Key

# 3. 启动开发服务器
npm run dev
```

## 部署环境变量

对话接口只支持 `POST /api/chat`；网页不会直接暴露 API Key。

- **Vercel**：在项目的 Environment Variables 中添加 `Agnes_api_key`。
- **Cloudflare Workers**：执行 `wrangler secret put Agnes_api_key` 后再部署。`worker.ts` 会将 `/api/chat` 的 POST 请求转发到 Agnes，其余请求仍由静态站点处理。

---

## 项目结构

```
YukisHomePage/
├── App.tsx                # 主布局与交互逻辑
├── constants.tsx          # 个人信息配置（名字、社交链接等）
├── types.ts               # TypeScript 类型定义
├── components/
│   ├── AIAssistant.tsx    # AI 对话界面组件
│   └── Background.tsx     # 动态背景
└── services/
    └── gemini.ts          # Agnes API 调用与系统提示词
```

---

## 自定义配置

修改 [`constants.tsx`](constants.tsx) 中的 `USER_PROFILE` 对象即可替换个人信息、头像、社交链接等所有内容。

AI 助理的人设与系统提示词位于 [`services/gemini.ts`](services/gemini.ts)。

---

<div align="center">

页面由 AI 辅助生成 · 内容由 元亓 Yuki 提供

</div>
