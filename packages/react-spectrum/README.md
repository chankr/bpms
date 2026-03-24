# react-spectrum

> 共通方針は [../../README.md](../../README.md) を参照してください。  
> この README には、React Spectrum 固有の方針のみを記載します。

## この package の目的

この package では、Adobe React Spectrum を用いて、  
BPMS 向けのタスク管理画面を React で実装します。

ここで重視するのは、React Spectrum を使って  
単に「それらしい管理画面」を作ることではありません。

目的は、React Spectrum / Spectrum 2 の思想に従ったうえで、  
BPMS のような業務アプリケーションにどこまで自然に適用できるかを検証することです。

---

## なぜ React Spectrum を候補に入れるのか

React Spectrum は、厳格なデザインシステムとアクセシビリティを前提にした React UI 基盤です。

今回の比較では、特に以下を期待しています。

- 強い設計原則に従って UI を構築できること
- 一貫した情報設計を維持しやすいこと
- AI に対してルールベースで指示しやすいこと
- 業務画面でも破綻しにくいこと
- 感覚的なデザイン調整を減らせること

---

## 公式ドキュメント

- Getting started  
  https://react-spectrum.adobe.com/getting-started

- Provider  
  https://react-spectrum.adobe.com/Provider

- Styling  
  https://react-spectrum.adobe.com/styling

- Style macro  
  https://react-spectrum.adobe.com/style-macro

- Components  
  https://react-spectrum.adobe.com/

- Releases  
  https://react-spectrum.adobe.com/releases/

---

## この package の実装対象

最初に実装するのは **BPMS のタスク管理画面** です。

対象とするユースケース例:

- 自分の担当タスク一覧
- 承認待ちタスク一覧
- 期限超過タスクの把握
- ステータス別の絞り込み
- タスク詳細への導線
- 主操作と副操作の整理

この package では、Flowable や Camunda のような  
プロセス / タスク中心の業務ドメインを参考にしますが、  
見た目を模倣することは目的ではありません。

---

## React Spectrum 固有の方針

### 1. Spectrum の思想を優先する

React Spectrum において重要なのは、  
Adobe Spectrum の一貫した体験を React で実装することです。

そのため、他の package に寄せるための無理な調整は行いません。

たとえば以下を揃えようとしないでください。

- ヘッダーの構成
- ナビゲーションの置き方
- 一覧の密度
- フィルタエリアの表現
- 操作ボタンの並べ方
- ページ内の余白設計

### 2. 情報設計を先に決める

React Spectrum では、表層の装飾よりも、  
アプリ全体としての一貫性・可読性・操作性を優先してください。

実装順は次を推奨します。

1. 画面の役割を定義する
2. 情報の階層を決める
3. 主操作と副操作を分ける
4. コンポーネントを選定する
5. 必要最小限のスタイル調整を行う

### 3. Provider を前提にする

アプリ root には React Spectrum の Provider を配置してください。  
locale、背景、color scheme、router 連携などのアプリレベル設定は Provider を基準に扱います。

### 4. カスタマイズは節度を持つ

React Spectrum の設計を壊すような過剰な独自スタイルは避けてください。

- 強引な global CSS override は行わない
- コンポーネント内部構造に依存した CSS を書かない
- spacing / typography / color の調整は、まず公式の方法で解決を試みる
- 独自スタイルが必要なら、Spectrum の token / style macro の思想に沿う

### 5. CSS reset は導入しない

この package では CSS reset を導入しません。  
React Spectrum / Spectrum 2 の styling 方針を優先します。

---

## Claude Code への実装指示

Claude Code には、以下の指示で実装させてください。

### 基本指示

- 共通方針は `../../README.md` を読むこと
- React Spectrum 固有の方針はこの README を読むこと
- React Spectrum の公式コンポーネントを優先利用すること
- root に Provider を配置すること
- BPMS のタスク管理画面を実装すること
- 他 package の UI に寄せないこと
- 比較のためにレイアウトを揃えないこと
- デザインは感覚ではなくルールに基づいて決めること

### 画面設計指示

最初の画面は、以下の役割を持つタスク管理画面とします。

- 画面タイトル
- 現在の絞り込み条件が分かること
- タスクの一覧性が高いこと
- タスクの状態や優先度が識別しやすいこと
- 主操作と副操作が明確に分かれていること
- 詳細画面または詳細領域への導線があること

### ナビゲーション設計指示

ナビゲーションは、他 package と揃えないでください。

React Spectrum / Spectrum の思想に照らして自然な構成を優先します。  
必要であれば、以下を検討してください。

- グローバルナビゲーション
- ローカルナビゲーション
- セクション見出し
- ページヘッダー
- フィルタ / ソート / ビュー切替
- 一覧と詳細の関係性

### 禁止事項

- MUI 的な情報密度をそのまま再現すること
- Fluent UI 的な操作構成を模倣すること
- 比較しやすさを理由に画面構成を揃えること
- global CSS で強引に見た目を上書きすること
- CSS reset を導入すること
- 感覚的な装飾を優先すること
- タスク管理画面ではなく、汎用ダッシュボードのような画面に逃げること

---

## 実装の目安

初期段階では、以下が成立していれば十分です。

- タスク一覧画面として意味が通る
- 情報階層が明確
- 操作対象と状態が分かる
- React Spectrum の思想から逸脱していない
- 次の詳細画面実装へ自然につながる

---

## 最低限の技術メモ

- package: `@react-spectrum/s2`
- React アプリの root に `Provider` を置く
- スタイリングは Spectrum の方法を優先する
- style macro を使える場面では、安易に生 CSS へ逃げない
- 実装の自由度より、一貫性を優先する

---

## この package で見たいこと

この package では、最終的に次を確認したいと考えています。

- React Spectrum は BPMS のような業務画面に自然に適用できるか
- 一覧・状態・操作が多い画面でも一貫性を維持しやすいか
- AI に設計意図を伝えやすいか
- 実装ルールを README として安定して記述できるか
- 感覚的レビューを減らせるだけの強い規律があるか