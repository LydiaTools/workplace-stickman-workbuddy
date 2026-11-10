# 职场火柴人动画

给 WorkBuddy 一个职场主题，由 Agent 完成故事、分镜、动作和剪辑，输出带配乐、字幕的 MP4。

## 实际效果

![本期动画首帧](examples/first-frame.jpg)

[播放或下载24秒动画](examples/stickman.mp4) · 横屏1920×1080 · 60fps · 配乐与中文字幕。

## 怎么用

下载并解压完整项目。把文件夹位置发给 WorkBuddy，然后输入：

> 读取这个文件夹里的 SKILL.md，帮我做一条“为什么忙了一天，正事却没推进”的火柴人动画，直接生成完整视频。

每次只换主题；故事、动作和画面安排由 Agent 根据 Skill 生成。首次需要免费依赖：Python、Node.js、Sharp 0.35.5 和 FFmpeg，由 Agent 检查安装。

默认横屏 1920×1080、60fps、约24秒、有配乐和中文字幕。自带配乐；新旁白需使用已批准稿件和可用的配音流程，不包含个人声音模型或付费接口。

## 文件

- SKILL.md：给 Agent 的完整制作规则
- assets/narrative-motion：角色、连续动作、镜头与音乐
- scripts/create_narrative_project.py：为每条视频创建独立工程
- SOURCE.md 与 LICENSE-upstream：来源和许可

不同主题需要 Agent 设计相应情节与动作，不是只替换标题。

## 许可与来源

原创补充工程采用 MIT，见 LICENSE。导演流程的上游项目与许可保留在 SOURCE.md 和 LICENSE-upstream。运行依赖各自遵循其许可；不打包个人声音模型、账号或本机配置。
