# AppTalentHub — Company Filesystem

> 未来を見せて、始める。

AppTalentHub株式会社の全社ファイルシステムです。
Credo「**Company as a Filesystem**」に基づき、会社の情報・プロセス・プロジェクトをディレクトリ構造として管理します。

## Structure

| Directory | Purpose |
|---|---|
| `00_core/` | 会社のOS — Mission, Vision, Credo, 設計原則 |
| `01_management/` | 管理部門 — 法務・経理・人事 |
| `02_product/` | プロダクト開発 — プロトタイプ・プロジェクト・インフラ |
| `03_contents/` | コンテンツ — コラム原稿・公開済み記事・素材 |
| `04_sales_marketing/` | 営業・マーケティング — CRM・提案書・LP試作 |
| `05_operations/` | 業務運用 — 議事録・IT資産管理 |

## Principles

1. **階層構造** — 情報には明確な住所がある
2. **抽象化** — 外部からシンプルにアクセスできる
3. **自律性** — 各ディレクトリは独立して動作可能

## Setup

初期構築スクリプト:

```powershell
.\build_os.ps1
```
