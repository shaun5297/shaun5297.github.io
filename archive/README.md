# archive — 已移除区块的素材存档

2026-03 从首页 `index.html` 中移除了项目目录以下的所有区块（数据条、亮点、研究方向、
代表项目、经历、论文、关于、联系），保留本目录作为素材归档，方便后续把素材填进
上面的项目卡片（`#work` 目录区）。

## 文件说明

| 文件 | 内容 |
|---|---|
| `removed-sections.html` | 被移除区块的完整 HTML 原文（含中英双语 `data-en` / `data-zh` 文字与图片引用），需要恢复时直接复制回 `index.html` |
| `removed-styles.css` | 与上述区块配套的样式规则，恢复区块时合并回 `styles.css` 即可 |
| `README.md` | 本文档：素材清单 |

## 图片素材清单（均在 `assets/` 中，未被删除）

### 页面仍在使用（勿删）
| 文件 | 用途 |
|---|---|
| `avatar.jpg` | 导航栏头像 |
| `hero-conference.jpg` | Hero 轮播 1：IEEE SMC 2025 汇报 |
| `hero-lab.jpg` | Hero 轮播 2：考古瓦片数字建档 |
| `hero-industrial.jpg` | Hero 轮播 3：JAKA 机械臂标定 |
| `logo-hzcu.png` | 浙大城市学院 logo |
| `logo-zju-bj.png` | 浙江大学滨江研究院 logo |
| `piper-grasp.gif` | Piper 机械臂抓取演示（曾用于代表项目卡 02） |
| `og.png` | 社交媒体分享图（og:image） |

### 已随区块移除、仍保留备用（做项目卡片时可直接用）
| 文件 | 内容 | 适合填充的项目 |
|---|---|---|
| `egg-vision.png` | 传送带/实验室场景鸡蛋检测结果 | CV·01 传送带鸡蛋检测计数 / RCD-DETR |
| `block-grasp.png` | 机械臂积木抓取静态图 | EI·01~04 抓取类项目 |
| `robot-grasp.gif` | 端侧 AI 机械臂检测并操作彩色积木 | EI·04 昇思平台机械臂 |
| `industrial-vision.jpg` | 工业托盘垛型感知（带检测框） | CV·04 饮料箱拆码垛 / 实习项目 |
| `braincheck-device.png` | BrainCheck EEG/fNIRS 设备传感器布局 | BCI·01/02、BSense 数据平台 |
| `smplx-anthropometry.png` | SMPL-X 人体重建与测量评估 | CV·03 人体重建与维度测量 |
| `dogguard.jpg` | （备用）犬种相关图 | AI·01 智能犬种疾病问答 |
| `profile.jpg` | （备用）个人照片 | 头像/关于 |

### 素材 → 项目卡对应关系（`#work` 目录 13 张占位卡）
- **CV · 01** 传送带鸡蛋检测计数 → `egg-vision.png`
- **CV · 02** 考古陶片计数分档 → 待补充（可参考 `hero-lab.jpg`）
- **CV · 03** 人体重建与维度测量 → `smplx-anthropometry.png`
- **CV · 04** 饮料箱拆码垛视觉 → `industrial-vision.jpg`
- **SP · 05** 声呐数据处理 → 待补充
- **BCI · 01** 疲劳度检测 → `braincheck-device.png`
- **BCI · 02** 脑控机器狗 → 待补充
- **EI · 01** D1 Edu 人体跟随机器狗 → 待补充
- **EI · 02** VR 遥操机械臂 → 待补充
- **EI · 03** 模块化夹取 → `block-grasp.png` / `piper-grasp.gif`
- **EI · 04** 昇思桌面机械臂积木堆叠 → `robot-grasp.gif` / `block-grasp.png`
- **EI · 05** LeRobot ACT 模仿学习 → 待补充
- **AI · 01** 智能犬种疾病问答 → `dogguard.jpg`

## 恢复方法
1. 从 `removed-sections.html` 复制需要的 `<section>...</section>` 到 `index.html` 的 `</main>` 前
2. 从 `removed-styles.css` 复制对应样式块到 `styles.css`
3. 若导航栏需要恢复对应锚点链接，参考 `removed-sections.html` 中的 `id`
