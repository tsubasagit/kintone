# Company as a Filesystem — ディレクトリ設計原則

## 概要
AppTalentHubは会社の全情報を「ファイルシステム」として構造化します。
このリポジトリ自体がその実践です。

## ディレクトリ構造

```
AppTalentHub/
├── 00_core/                    # 会社のOS — アイデンティティ・方針
│   └── system_prompt/          # Mission, Vision, Credo, 設計原則
├── 01_management/              # 管理部門
│   ├── 01_legal/               # 法務・契約
│   ├── 02_accounting/          # 経理・財務
│   └── 03_hr/                  # 人事・採用
├── 02_product/                 # プロダクト開発
│   ├── 00_prototypes/          # プロトタイプ（実験・検証）
│   ├── 01_projects/            # 本番プロジェクト
│   └── 02_infra/               # インフラ・DevOps
├── 03_contents/                # コンテンツ
│   ├── 01_stock/               # ストック型（コラム原稿・素材）
│   ├── 02_published/           # 公開済みコンテンツ
│   └── 03_assets/              # 画像・動画素材
├── 04_sales_marketing/         # 営業・マーケティング
│   ├── 00_prototypes/          # LP・営業ツールの試作
│   ├── 01_crm/                 # 顧客管理
│   └── 02_proposals/           # 提案書・見積
└── 05_operations/              # 業務運用
    ├── 01_meetings/            # 議事録
    └── 02_it_assets/           # IT資産管理
```

## 設計の3原則

### 1. 階層構造 (Hierarchy)
情報にはすべて「住所」がある。迷わずたどり着ける構造を維持する。

### 2. 抽象化 (Abstraction)
各ディレクトリは外部に対しシンプルなインターフェースを提供する。
内部の詳細を知らなくてもアクセスできる。

### 3. 自律性 (Autonomy)
各サブディレクトリは独立したリポジトリとして動作可能。
親ディレクトリの状態に依存せず、プロジェクト単位で意思決定・デプロイできる。
