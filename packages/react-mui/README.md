# react-mui

> 共通方針は [../../README.md](../../README.md) を参照してください。  
> この README には、MUI 固有の方針のみを記載します。

## この package の目的

この package では、MUI を用いて、  
BPMS 向けのタスク管理画面を React で実装します。

目的は、Material Design 2 系の明快な情報構造と、  
MUI の theme / system を活用しながら、  
業務画面として破綻しにくい UI を組み立てられるかを検証することです。

ここで重視するのは、単に部品が多いことではありません。

- 情報階層が明確であること
- 一覧とフィルタが整理されていること
- 主操作と副操作が分離されていること
- theme と token に基づいて一貫性を保てること
- AI に実装ルールを渡しやすいこと

---

## なぜ MUI を候補に入れるのか

MUI は、Material Design 2 をベースにした包括的な React UI ライブラリです。  
業務画面で必要になる部品、レイアウト、theme、スタイルユーティリティが揃っており、  
比較的広い自由度を保ちながらも、一定の規律を維持できます。

今回の比較では、特に以下を期待しています。

- 業務画面で必要な画面部品を素直に組めること
- theme によってトーンを統制しやすいこと
- MUI System によって layout をルールベースで組みやすいこと
- React における定番構成として AI への指示が書きやすいこと
- 必要な柔軟性を持ちつつ、設計の軸を失いにくいこと

---

## 公式ドキュメント

- Overview  
  https://mui.com/material-ui/getting-started/

- Installation  
  https://mui.com/material-ui/getting-started/installation/

- Usage  
  https://mui.com/material-ui/getting-started/usage/

- Theming  
  https://mui.com/material-ui/customization/theming/

- How to customize  
  https://mui.com/material-ui/customization/how-to-customize/

- MUI System Overview  
  https://mui.com/system/getting-started/

- MUI System Usage  
  https://mui.com/system/getting-started/usage/

- Components  
  https://mui.com/components/

- Design System  
  https://m2.material.io/

---

## この package の実装対象

最初に実装するのは **BPMS のタスク管理画面** です。

対象とするユースケース例:

- 自分の担当タスク一覧
- 承認待ちタスク一覧
- ステータス別の絞り込み
- 期限、優先度、申請種別の把握
- タスク詳細への導線
- 主操作と副操作の整理

この package では、Material Design と MUI の思想に沿って、  
情報整理と視認性を重視した管理画面を構築します。

---

## MUI 固有の方針

### 1. theme を設計の基準にする

MUI では、見た目の調整を場当たり的に行うのではなく、  
theme を基準にして色、余白、タイポグラフィ、影、状態表現を統制してください。

- palette を起点に状態色を整理する
- typography を統一する
- spacing を統一する
- component override は theme を起点に検討する

### 2. layout は MUI System を優先する

レイアウトや余白調整は、まず `Box`、`Container`、`Stack`、必要に応じて `Grid` を優先してください。

- `sx` は token ベースの調整に使う
- ad-hoc な CSS を先に書かない
- レイアウトの責務を component と style で混線させない

### 3. 柔軟性を乱用しない

MUI は柔軟性が高い一方で、  
無秩序に使うと感覚的な UI になりやすいです。

- その場しのぎの `sx` を積み重ねない
- 同じ役割の要素に異なる余白ルールを持ち込まない
- component ごとに見出しサイズや spacing をばらつかせない

### 4. BPMS らしい一覧性を優先する

MUI はカード寄りにも dense な管理画面寄りにも振れます。  
この package では、タスク管理画面としての一覧性を優先してください。

- フィルタ条件が把握しやすいこと
- 一覧の状態列や属性列が読み取りやすいこと
- 操作導線が散らばりすぎないこと
- 視線移動が過剰にならないこと

### 5. 他 package に寄せない

MUI の柔軟性を使って、他 package と見た目を揃えることは禁止します。

揃えようとしない対象の例:

- ナビゲーションの位置
- フィルタ UI の構成
- ヘッダーの密度
- 一覧の表現方法
- 操作ボタンの配置

---

## Claude Code への実装指示

Claude Code には、以下の指示で実装させてください。

### 基本指示

- 共通方針は `../../README.md` を読むこと
- MUI 固有の方針はこの README を読むこと
- MUI の標準コンポーネントを優先利用すること
- theme と MUI System を設計の基準にすること
- BPMS のタスク管理画面を実装すること
- 他 package の UI に寄せないこと
- 比較のために構成を揃えないこと
- 感覚ではなく theme / token / layout rules で判断すること

### 画面設計指示

最初の画面は、以下の役割を持つタスク管理画面とします。

- 画面タイトル
- フィルタ条件エリア
- タスク一覧エリア
- 状態や優先度の可視化
- 主操作と副操作の分離
- 詳細への導線

### 実装指示

- layout は `Container`、`Box`、`Stack` を優先して組むこと
- 一貫した余白ルールを持つこと
- typography を明示的に設計すること
- 状態表示は palette / theme に寄せて考えること
- 一時的な装飾より、情報構造を優先すること
- 強引な global CSS override を避けること
- `sx` の使用は許容するが、無秩序に肥大化させないこと

### 禁止事項

- 他 package と比較しやすいようにレイアウトを寄せること
- 画面全体を ad-hoc な `sx` の積み重ねで作ること
- theme を使わずに場当たり的に色や余白を決めること
- ダッシュボード風の見た目に逃げて、タスク管理画面としての一覧性を失うこと
- MUI の柔軟性を理由に一貫性を犠牲にすること

---

## 実装の目安

初期段階では、以下が成立していれば十分です。

- タスク一覧画面として意味が通る
- 情報階層が明確
- フィルタと一覧の関係が分かりやすい
- 状態や優先度が識別しやすい
- MUI の theme / system を基準に設計されている
- 次の詳細画面実装へ自然につながる

---

## 最低限の技術メモ

- package: `@mui/material`
- peer / styling: `@emotion/react`, `@emotion/styled`
- theme を基準に調整する
- layout は MUI System を優先する
- 大きな customization は theme から検討する
- 一時的な見た目合わせより、再現可能な設計ルールを優先する

---

## この package で見たいこと

この package では、最終的に次を確認したいと考えています。

- MUI は BPMS の業務画面に自然に適用できるか
- 柔軟性と規律を両立できるか
- theme / system によって AI への指示を安定化できるか
- 一覧中心画面で情報密度を適切に制御できるか
- 感覚的レビューを減らせるだけの設計規律を作れるか