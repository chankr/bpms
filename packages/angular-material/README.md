# angular-material

> 共通方針は [../../README.md](../../README.md) を参照してください。  
> この README には、Angular Material 固有の方針のみを記載します。

## この package の目的

この package では、Angular Material を用いて、  
BPMS 向けのタスク管理画面を Angular で実装します。

目的は、Angular と高い親和性を持つ Material Design ベースの UI 基盤で、  
一覧・検索・状態表示・詳細導線を備えた業務画面を  
どこまで自然に構成できるかを検証することです。

ここで重視するのは、Angular の component / template / state 分離と、  
Angular Material の規律を活かして、  
再現性の高い業務 UI を作れるかどうかです。

---

## なぜ Angular Material を候補に入れるのか

Angular Material は Angular チームが提供する UI component library であり、  
Angular への統合性が高く、Material Design の範囲内で一貫した画面を構築できます。

今回の比較では、特に以下を期待しています。

- Angular との統合性が高いこと
- 業務画面で必要な基本部品が揃っていること
- Material Design に基づいた一貫性を維持しやすいこと
- theming によって色、typography、density を制御しやすいこと
- AI に対して Angular 的な責務分離を明示しやすいこと

---

## 公式ドキュメント

- Angular Material  
  https://material.angular.dev/

- Getting started  
  https://material.angular.dev/guide/getting-started

- Guides  
  https://material.angular.dev/guides

- Theming  
  https://material.angular.dev/guide/theming

- Theming your components  
  https://material.angular.dev/guide/theming-your-components

- Design System  
  https://m3.material.io/

---

## この package の実装対象

最初に実装するのは **BPMS のタスク管理画面** です。

対象とするユースケース例:

- 自分の担当タスク一覧
- 承認待ちタスク一覧
- 検索 / 絞り込み
- ステータス、期限、優先度の可視化
- タスク詳細への導線
- 主操作 / 副操作 / 一括操作の整理

この package では、Angular Material の標準コンポーネントを優先しつつ、  
Angular の責務分離を活かした業務画面構成を目指します。

---

## Angular Material 固有の方針

### 1. Angular らしい責務分離を保つ

Angular Material を使う場合でも、  
template にすべてを押し込まず、責務を整理してください。

- container 的な役割
- presentational な role
- filter / list / action の分離
- state と view の関係整理

を意識し、保守しやすい構成にします。

### 2. Material Design の範囲内で設計する

Angular Material は、Material Design の範囲内でカスタマイズする前提です。  
画面を無理に独自化せず、まず Material のルールで成立させてください。

- 視覚的一貫性を保つ
- 状態表現を規律あるものにする
- ナビゲーションや操作配置に説明可能性を持たせる

### 3. theming を基準にする

theme は場当たり的な色調整の置き場ではなく、  
アプリ全体の設計ルールです。

- color
- typography
- density
- base styles

を theme 起点で管理してください。

### 4. Angular Material の標準部品を優先する

まずは標準部品で画面を成立させてください。

- toolbar
- sidenav
- list
- form-field
- input
- select
- button
- table
- chips
- icon
- progress / badge / menu

必要な独自部品は、その後に最小限で追加します。

### 5. 独自スタイルは節度を持つ

Angular Material は Sass ベースの theming を前提としています。  
局所的な CSS での場当たり対応ではなく、  
theme と component 単位の責務で整理してください。

### 6. 他 package に寄せない

Angular Material だからといって、  
React 側の package に構成を合わせる必要はありません。

揃えようとしない対象の例:

- page shell の構成
- navigation の表現
- filter panel の出し方
- table と詳細の関係
- action bar の置き方

---

## Claude Code への実装指示

Claude Code には、以下の指示で実装させてください。

### 基本指示

- 共通方針は `../../README.md` を読むこと
- Angular Material 固有の方針はこの README を読むこと
- Angular Material の標準コンポーネントを優先利用すること
- Material Design の範囲内で画面を成立させること
- BPMS のタスク管理画面を実装すること
- 他 package の UI に寄せないこと
- Angular らしい責務分離を保つこと
- theme を基準に一貫性を設計すること

### 画面設計指示

最初の画面は、以下の役割を持つタスク管理画面とします。

- 画面タイトル
- フィルタ / 検索エリア
- タスク一覧エリア
- 状態や優先度の可視化
- 主要アクション
- 詳細への導線

### 実装指示

- Angular Material の標準部品を優先して組むこと
- フィルタ、一覧、アクションの責務を分けること
- theme に基づいて color / typography / density を扱うこと
- CSS の場当たり対応より、theme / structure を先に見直すこと
- Angular の component 分割を明確にすること
- テンプレートを肥大化させすぎないこと
- 一覧画面としての読みやすさと操作性を優先すること

### 禁止事項

- React package の page structure を模倣すること
- Material Design の規律を無視して独自 UI に寄せること
- theme を使わずに色や余白を場当たり的に決めること
- template にロジックを押し込みすぎること
- 比較のために無理にナビゲーション構成を揃えること
- ダッシュボード風の画面に逃げて、タスク管理画面の責務を曖昧にすること

---

## 実装の目安

初期段階では、以下が成立していれば十分です。

- タスク一覧画面として意味が通る
- Angular Material の標準部品で自然に構成されている
- フィルタ、一覧、操作の責務が整理されている
- theme による一貫性がある
- Angular の構造として保守しやすい
- 次の詳細画面実装へ自然につながる

---

## 最低限の技術メモ

- package: `@angular/material`
- theming は Angular Material の方法に従う
- Sass ベースの theme 設計を前提にする
- component 単位の責務分離を維持する
- まずは標準部品で成立させる
- 独自コンポーネントは必要最小限にとどめる

---

## この package で見たいこと

この package では、最終的に次を確認したいと考えています。

- Angular Material は BPMS の業務画面に自然に適用できるか
- Angular の構造と UI 規律を両立できるか
- theming と component 分割を AI に指示しやすいか
- 一覧中心画面で保守しやすい構成を作れるか
- 感覚的レビューを減らせるだけの実装規律を持てるか