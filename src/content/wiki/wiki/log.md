---
kind: wiki
slug: log
title: 操作日志 (Log)
published: 2026-08-04T00:00:00.000Z
featured: false
draft: true
---
# 操作日志 (Log)

追加式记录。每条带前缀便于 `grep "^## \[" log.md` 检索。

## [2026-07-25] init | 初始化个人知识库（项目级）
按用户要求，知识库建于 `E:\bigdata\bosley\wiki-knowledge\`（覆盖技能默认的用户级路径）。
三层结构：raw/（原始资料，不可变，含 assets/）、wiki/（LLM 维护页面：index.md / log.md / overview.md / pages/{entities,concepts,sources,comparisons,syntheses}）、WIKI-SCHEMA.md（约定与配置，可演化）。
等待用户投放资料进行首次摄入。

## [2026-07-25] ingest | 批量摄入14篇摘抄（首次大规模摄入）

用户投放 raw/ 下全部 md 文件（排除 Obsidian 默认的"欢迎.md"和 README），共摄入 14 篇有效摘抄。

**产出 34 个页面：**
- 14 个 source-summary 页（pages/sources/）
- 18 个 concept 页（pages/concepts/）
- 2 个 entity 页（pages/entities/）

**主题分布：**
- 经济学/消费心理：边际效用递减、沉没成本谬误、科斯定律、婚姻经济学、美貌贬值经济学、价格歧视、后悔理论、控制错觉
- 自我成长：积极主动、知彼解己、差异化竞争、天人合一
- 社会/心理：社会建构论、自我肯定感、公开承诺效应、信息茧房与决策迟缓
- 科技/时代：后隐私时代、数字游民
- 实体：奥尔加·托卡尔丘克、纪伯伦

**跨文件高频概念：** 婚姻经济学（3次）、积极主动（2次）、美貌贬值经济学（2次）、托卡尔丘克（2次）、社会建构论（2次+间接）。

**核心思想脉络：** 面对不完美的世界，如何主动而非被动地活着——经济学揭示冷酷逻辑，认知偏差揭示非理性，进化心理学揭示快乐稀缺，而破解之道始终是积极主动 + 知彼解己 + 差异化竞争。

已更新 index.md（完整目录）与 overview.md（知识图谱概览 + 5个开放问题/数据缺口）。
