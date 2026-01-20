import { useState } from 'react'
import './Settings.css'

interface SettingSection {
  id: string
  title: string
  icon: string
  items: SettingItem[]
}

interface SettingItem {
  id: string
  name: string
  description?: string
}

const settingSections: SettingSection[] = [
  {
    id: 'general',
    title: '一般設定',
    icon: '⚙️',
    items: [
      { id: 'icon', name: 'アイコンと説明' },
      { id: 'theme', name: 'デザインテーマ' },
      { id: 'process', name: 'プロセス管理' }
    ]
  },
  {
    id: 'notification',
    title: '通知',
    icon: '🔔',
    items: [
      { id: 'app-notification', name: 'アプリの条件通知' },
      { id: 'record-notification', name: 'レコードの条件通知' },
      { id: 'reminder', name: 'リマインダーの条件通知' }
    ]
  },
  {
    id: 'customize',
    title: 'カスタマイズ/サービス連携',
    icon: '🔧',
    items: [
      { id: 'plugin', name: 'プラグイン' },
      { id: 'javascript', name: 'JavaScript / CSSでカスタマイズ' },
      { id: 'api-token', name: 'API トークン' },
      { id: 'webhook', name: 'Webhook' }
    ]
  },
  {
    id: 'access',
    title: 'アクセス権',
    icon: '🔐',
    items: [
      { id: 'app-access', name: 'アプリ' },
      { id: 'record-access', name: 'レコード' },
      { id: 'field-access', name: 'フィールド' }
    ]
  },
  {
    id: 'other',
    title: 'その他の設定',
    icon: '⚙️',
    items: [
      { id: 'category', name: 'カテゴリー' },
      { id: 'language', name: '言語ごとの名称' },
      { id: 'title', name: 'レコードのタイトル' },
      { id: 'advanced', name: '高度な設定' },
      { id: 'action', name: 'アクション' }
    ]
  },
  {
    id: 'management',
    title: '運用管理',
    icon: '☁️',
    items: [
      { id: 'test', name: 'アプリの動作テスト' },
      { id: 'template', name: 'アプリをテンプレートとしてダウンロード' },
      { id: 'space', name: 'アプリの所属するスペースを変更' },
      { id: 'reference', name: 'このアプリを参照しているアプリ' },
      { id: 'maintenance', name: 'アプリのメンテナンスモード' }
    ]
  }
]

function Settings() {
  const [hasChanges, setHasChanges] = useState(false)

  const handleSettingClick = (sectionId: string, itemId: string) => {
    alert(`${sectionId} > ${itemId} の設定画面は実装予定です`)
  }

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h2 className="settings-title">アプリの設定</h2>
        <div className="settings-actions">
          <button className="action-button">アプリ作成ガイド</button>
          <button className="action-button">変更を中止</button>
          <button 
            className="action-button primary"
            disabled={!hasChanges}
          >
            アプリを更新
          </button>
        </div>
      </div>

      {hasChanges && (
        <div className="alert-banner">
          <span>反映前の変更があります</span>
          <span className="alert-text">
            変更した設定をアプリに反映するには、[アプリを更新]ボタンをクリックします。
          </span>
        </div>
      )}

      <div className="settings-content">
        <div className="settings-grid">
          {settingSections.map((section) => (
            <div key={section.id} className="settings-column">
              <div className="settings-section">
                <div className="section-header">
                  <span className="section-icon">{section.icon}</span>
                  <h3 className="section-title">{section.title}</h3>
                </div>
                <div className="section-items">
                  {section.items.map((item) => (
                    <div
                      key={item.id}
                      className="setting-item"
                      onClick={() => handleSettingClick(section.id, item.id)}
                    >
                      <span className="item-name">{item.name}</span>
                      {item.description && (
                        <span className="item-description">{item.description}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Settings
