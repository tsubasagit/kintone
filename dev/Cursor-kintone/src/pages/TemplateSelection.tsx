import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './TemplateSelection.css'

interface Template {
  id: string
  name: string
  description: string
  category: string
}

const templates: Template[] = [
  {
    id: 'blank',
    name: 'はじめから作成',
    description: '白紙の状態からアプリを作成します',
    category: 'basic'
  },
  {
    id: 'excel',
    name: 'Excelを読み込んで作成',
    description: 'Excelファイルを読み込んでアプリを作成します',
    category: 'import'
  },
  {
    id: 'csv',
    name: 'CSVを読み込んで作成',
    description: 'CSVファイルを読み込んでアプリを作成します',
    category: 'import'
  },
  {
    id: 'template',
    name: 'テンプレートファイルを読み込んで作成',
    description: 'テンプレートファイルを読み込んでアプリを作成します',
    category: 'import'
  },
  {
    id: 'reuse',
    name: 'ほかのアプリを再利用',
    description: '既存のアプリを再利用して新しいアプリを作成します',
    category: 'reuse'
  }
]

const appPacks = [
  {
    id: 'sfa',
    name: 'SFA (営業支援) パック',
    description: '営業活動を支援するアプリパック'
  },
  {
    id: 'support',
    name: '顧客サポートパック',
    description: '顧客サポート業務を効率化するアプリパック'
  },
  {
    id: 'hr',
    name: '人事労務パック',
    description: '人事・労務管理を支援するアプリパック'
  },
  {
    id: 'estimate',
    name: '商品見積書パック',
    description: '見積書作成を支援するアプリパック'
  },
  {
    id: 'customer',
    name: '顧客リスト',
    description: '顧客情報を管理するアプリパック'
  }
]

import { getApps, deleteApp, type AppData } from '../utils/storage'

function TemplateSelection() {
  const navigate = useNavigate()
  const [savedApps, setSavedApps] = useState<AppData[]>([])

  useEffect(() => {
    setSavedApps(getApps())
  }, [])

  const handleTemplateSelect = (templateId: string) => {
    if (templateId === 'blank') {
      navigate('/form-builder')
    } else {
      alert(`${templateId}の機能は実装予定です`)
    }
  }

  const handleAppPackSelect = (packId: string) => {
    alert(`${packId}パックの機能は実装予定です`)
  }

  const handleOpenApp = (appId: string) => {
    navigate(`/form-builder?id=${appId}`)
  }

  const handleDeleteApp = (appId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    if (confirm('このアプリを削除しますか？')) {
      deleteApp(appId)
      setSavedApps(getApps())
    }
  }

  return (
    <div className="template-selection">
      <div className="container">
        <h2 className="page-title">新しくアプリをつくる</h2>
        
        <div className="template-grid">
          {templates.map((template) => (
            <div
              key={template.id}
              className="template-card"
              onClick={() => handleTemplateSelect(template.id)}
            >
              <h3 className="template-name">{template.name}</h3>
              <p className="template-description">{template.description}</p>
            </div>
          ))}
        </div>

        {savedApps.length > 0 && (
          <>
            <h2 className="section-title">保存されたアプリ</h2>
            <div className="saved-apps-grid">
              {savedApps.map((app) => (
                <div
                  key={app.id}
                  className="saved-app-card"
                  onClick={() => handleOpenApp(app.id)}
                >
                  <h3 className="saved-app-name">{app.name}</h3>
                  <p className="saved-app-info">
                    コンポーネント数: {app.formComponents.length} | 
                    更新日: {new Date(app.updatedAt).toLocaleDateString('ja-JP')}
                  </p>
                  <button
                    className="delete-app-button"
                    onClick={(e) => handleDeleteApp(app.id, e)}
                  >
                    削除
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        <h2 className="section-title">おすすめのアプリ</h2>
        
        <div className="app-pack-grid">
          {appPacks.map((pack) => (
            <div key={pack.id} className="app-pack-card">
              <h3 className="app-pack-name">{pack.name}</h3>
              <p className="app-pack-description">{pack.description}</p>
              <button
                className="app-pack-button"
                onClick={() => handleAppPackSelect(pack.id)}
              >
                このアプリパックを追加
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TemplateSelection
