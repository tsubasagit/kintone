# AppTalentHub: Company as a Filesystem Design (Internal Guide)

AppTalentHub の全資産を、AIエージェントが効率的かつ安全に扱える「OSとしてのファイルシステム」として再定義する構成です。

## ディレクトリ構成

```text
/AppTalentHub
├── 01_management/       # コーポレート・経営管理 (高セキュリティ)
│   ├── 01_legal/        # 契約書、登記、規約
│   ├── 02_accounting/   # 請求書、領収書、確定申告 (月次フォルダ)
│   ├── 03_hr/           # メンバ名簿、給与、採用候補者
│   └── 04_vision/       # 経営戦略、OKRs、ロードマップ
├── 02_product/          # プロダクト・エンジニアリング
│   ├── 01_projects/     # 主要プロダクトのリポジトリ (Michikake, Pilot等)
│   ├── 02_infra/        # インフラ構成（IaC）、クラウド設定
│   └── 03_research/     # AI技術検証、技術スパイク
├── 03_contents/         # オウンドメディア・広報
│   ├── 01_stock/        # 記事原稿（既存の構造を継承）
│   ├── 02_published/    # 公開済み記事
│   └── 03_assets/       # ロゴ、ブランディング、共通素材
├── 04_sales_marketing/  # 営業・マーケティング
│   ├── 01_crm/          # 顧客リスト (JSON形式推奨)、商談メモ
│   ├── 02_proposals/    # 提案書、見積書
│   └── 03_campaigns/    # 広告運用、SNS、レポート
└── 05_operations/       # 日次業務・リソース管理
    ├── 01_meetings/     # 定例、議事録 (日次フォルダ)
    ├── 02_it_assets/    # サブスク管理、機材リスト
    └── 03_security/     # セキュリティ監査、インシデントログ
```

## 運用ルール

-   **Private GitHub**: `01_management` など機密情報の高いディレクトリは、GitHub の Private リポジトリで厳格に管理する。
-   **AI Access**: エージェント（Claude Code 等）は、それぞれのコンテキストに応じた最小限のディレクトリのみをマウント、あるいはコンテキストとして渡す。
-   **Machine Readable**: 管理データは極力 JSON や CSV で保持し、AI が即座に処理・集計できるようにする。
