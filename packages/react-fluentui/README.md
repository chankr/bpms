# react-fluentui

> 共通方針は [../../README.md](../../README.md) を参照してください。  
> この README には、Fluent UI 固有の方針のみを記載します。

## この package の目的

この package では、Fluent UI React v9 を用いて、  
BPMS 向けのタスク管理画面を React で実装します。

目的は、Microsoft Fluent 2 の思想に従いながら、  
タスク中心の業務アプリケーションに必要な情報設計・操作導線・一覧性を  
自然に実現できるかを検証することです。

ここで重視するのは、Microsoft らしい一貫した UX の中で、  
業務画面としての整理性と操作性を保てるかどうかです。

---

## なぜ Fluent UI を候補に入れるのか

Fluent UI は、Microsoft Fluent 2 に基づく React UI 基盤です。  
コンポーネントだけでなく、文章表現、フィールド説明、ナビゲーション、ツールバー、  
状態表現まで含めて、一貫した設計原則が整備されています。

今回の比較では、特に以下を期待しています。

- 強いプロダクト言語に基づく UI 構成ができること
- ナビゲーションや操作導線を規律ある形で設計しやすいこと
- テキストや補助説明までルール化しやすいこと
- AI に対して具体的な component guidance を渡しやすいこと
- 一覧とアクションが多い業務画面でも破綻しにくいこと

---

## 公式ドキュメント

- Fluent 2 Design System  
  https://fluent2.microsoft.design/

- Develop  
  https://fluent2.microsoft.design/get-started/develop

- React Overview  
  https://fluent2.microsoft.design/components/web/react/

- FluentProvider  
  https://fluent2.microsoft.design/components/web/react/core/fluentprovider/usage

- Nav  
  https://fluent2.microsoft.design/components/web/react/core/nav/usage

- Toolbar  
  https://fluent2.microsoft.design/components/web/react/core/toolbar/usage

- Field  
  https://fluent2.microsoft.design/components/web/react/core/field/usage

- Input  
  https://fluent2.microsoft.design/components/web/react/core/input/usage

- Text  
  https://fluent2.microsoft.design/components/web/react/core/text/usage

- List  
  https://fluent2.microsoft.design/components/web/react/core/list/usage/

---

## この package の実装対象

最初に実装するのは **BPMS のタスク管理画面** です。

対象とするユースケース例:

- 自分の担当タスク一覧
- 承認待ちタスク一覧
- ナビゲーションからのカテゴリ切り替え
- ステータスや優先度の把握
- タスク詳細への導線
- 頻出操作への素早いアクセス

この package では、Fluent 2 の情報設計と wayfinding の考え方に沿って、  
一覧・導線・操作群を整理します。

---

## Fluent UI 固有の方針

### 1. FluentProvider を前提にする

アプリ root には `FluentProvider` を配置してください。  
theme と style の基準は、常に Provider を起点に扱います。

### 2. high-level wayfinding を重視する

Fluent では、ナビゲーションや現在地の把握が重要です。  
タスク管理画面でも、単に一覧を置くだけでなく、  
「今どのタスク群を見ているのか」が明確であることを優先してください。

- 自分のタスク
- 承認待ち
- 期限超過
- 完了済み
- 委任 / 代理対応

といった切り口を、必要に応じて自然な wayfinding として表現してください。

### 3. アクションを論理的に束ねる

Fluent の toolbar / menu / nav の考え方に従い、  
アクションは頻度と文脈に応じて整理してください。

- 現在の view に対する主操作
- 補助操作
- 一括操作
- フィルタや並び替え

を無秩序に並べないでください。

### 4. テキストと補助説明も設計対象にする

Fluent は文言や helper text の扱いにも規律があります。  
placeholder や helper text は、単なる装飾ではなく、  
操作を支援するための一貫した情報として扱ってください。

- placeholder は必須情報の代替にしない
- helper text は必要な場面だけに使う
- ラベルを省略しない
- 意味のない短文を並べない

### 5. Microsoft 的な整然さを優先する

Fluent UI では、過度な装飾や視覚的ノイズを避けてください。

- 情報の塊を整理する
- アクションをグルーピングする
- 余白で関係性を示す
- コンポーネント guidance に反する使い方をしない

### 6. 他 package に寄せない

Fluent UI の情報設計を優先し、  
MUI や React Spectrum に寄せることは禁止します。

揃えようとしない対象の例:

- nav の位置
- toolbar の構成
- 一覧と詳細の関係
- card / list / pane の使い方
- 主操作と副操作の分離方法

---

## Claude Code への実装指示

Claude Code には、以下の指示で実装させてください。

### 基本指示

- 共通方針は `../../README.md` を読むこと
- Fluent UI 固有の方針はこの README を読むこと
- `FluentProvider` を root に配置すること
- Fluent UI React v9 の標準コンポーネントを優先利用すること
- BPMS のタスク管理画面を実装すること
- 他 package の UI に寄せないこと
- wayfinding と操作導線を明確に設計すること
- 感覚ではなく component guidance と design language に従うこと

### 画面設計指示

最初の画面は、以下の役割を持つタスク管理画面とします。

- 現在見ているタスクカテゴリが分かること
- タスク一覧の状態が把握しやすいこと
- 主操作と副操作が整理されていること
- フィルタ、並び替え、検索が文脈に沿って配置されていること
- 詳細画面または詳細領域への導線があること

### 実装指示

- navigation は高レベルの wayfinding として機能させること
- 頻出操作は toolbar などに論理的にまとめること
- field / input / helper text は Fluent guidance に従って使うこと
- text hierarchy を明確にすること
- 状態表示は視覚だけに依存しないこと
- list / card / pane の使い分けに理由を持つこと
- 装飾よりも、理解しやすい構造を優先すること

### 禁止事項

- MUI 的な密な管理画面をそのまま再現すること
- React Spectrum 的な強い抑制を模倣すること
- 比較しやすさを理由に nav / toolbar 構成を揃えること
- placeholder をラベル代わりに使うこと
- helper text を無意味に常時表示すること
- Fluent の guidance を無視した独自 UI を作ること

---

## 実装の目安

初期段階では、以下が成立していれば十分です。

- タスクカテゴリの現在地が分かる
- 一覧と操作導線が整理されている
- 主操作と副操作が分かれている
- テキストと補助説明が一貫している
- Fluent UI の思想から逸脱していない
- 次の詳細画面実装へ自然につながる

---

## 最低限の技術メモ

- package: `@fluentui/react-components`
- root に `FluentProvider` を置く
- theme は Provider を基準に扱う
- CSS-in-JS 前提の styling を尊重する
- component guidance を優先し、見た目合わせのための override を避ける
- 情報設計と文言設計を component 選定と同じ重みで扱う

---

## この package で見たいこと

この package では、最終的に次を確認したいと考えています。

- Fluent UI は BPMS のタスク管理画面に自然に適用できるか
- wayfinding と action organization を強く設計できるか
- AI に対してコンポーネント選定理由を明確に渡せるか
- テキストと補助説明まで含めてルールベース化できるか
- 感覚的レビューを減らせるだけの規律を持てるか