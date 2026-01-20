import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import './FormBuilder.css'
import { getApp, saveApp, type AppData, type FormComponent } from '../utils/storage'

interface FormComponentLocal {
  id: string
  type: string
  label: string
  value?: string
}

interface ComponentDefinition {
  id: string
  name: string
  icon: string
  type: string
}

const availableComponents: ComponentDefinition[] = [
  { id: 'label', name: 'ラベル', icon: '📝', type: 'label' },
  { id: 'text-single', name: '文字列(1行)', icon: '📄', type: 'text' },
  { id: 'text-multi', name: '文字列(複数行)', icon: '📋', type: 'textarea' },
  { id: 'number', name: '数値', icon: '🔢', type: 'number' },
  { id: 'date', name: '日付', icon: '📅', type: 'date' },
  { id: 'datetime', name: '日時', icon: '🕐', type: 'datetime' },
  { id: 'time', name: '時刻', icon: '⏰', type: 'time' },
  { id: 'radio', name: 'ラジオボタン', icon: '🔘', type: 'radio' },
  { id: 'checkbox', name: 'チェックボックス', icon: '☑️', type: 'checkbox' },
  { id: 'dropdown', name: 'ドロップダウン', icon: '📌', type: 'select' },
  { id: 'multi-select', name: '複数選択', icon: '✅', type: 'multiselect' },
  { id: 'file', name: '添付ファイル', icon: '📎', type: 'file' },
  { id: 'link', name: 'リンク', icon: '🔗', type: 'link' },
  { id: 'user', name: 'ユーザー選択', icon: '👤', type: 'user' },
  { id: 'org', name: '組織選択', icon: '🏢', type: 'organization' },
  { id: 'group', name: 'グループ選択', icon: '👥', type: 'group' },
  { id: 'space', name: 'スペース', icon: '⬜', type: 'space' },
  { id: 'divider', name: '罫線', icon: '➖', type: 'divider' },
  { id: 'group-field', name: 'グループ', icon: '📦', type: 'group-field' },
  { id: 'table', name: 'テーブル', icon: '📊', type: 'table' },
  { id: 'calc', name: '計算', icon: '🧮', type: 'calculation' },
  { id: 'record-number', name: 'レコード番号', icon: '🔢', type: 'record-number' },
  { id: 'created-date', name: '作成日時', icon: '📆', type: 'created-date' },
  { id: 'updated-date', name: '更新日時', icon: '🔄', type: 'updated-date' },
  { id: 'creator', name: '作成者', icon: '✍️', type: 'creator' },
  { id: 'updater', name: '更新者', icon: '👤', type: 'updater' },
]

function FormBuilder() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const appId = searchParams.get('id')
  const packId = searchParams.get('pack')
  const [appName, setAppName] = useState('新しいアプリ')
  const [formComponents, setFormComponents] = useState<FormComponentLocal[]>([])
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null)
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)

  useEffect(() => {
    if (appId) {
      const app = getApp(appId)
      if (app) {
        setAppName(app.name)
        setFormComponents(app.formComponents as FormComponentLocal[])
      }
    } else if (packId === 'customer') {
      // 顧客パックの初期コンポーネントを設定
      setAppName('顧客リスト')
      const customerComponents: FormComponentLocal[] = [
        { id: 'company-name', type: 'text', label: '会社名' },
        { id: 'contact-name', type: 'text', label: '担当者名' },
        { id: 'email', type: 'text', label: 'メールアドレス' },
        { id: 'phone', type: 'text', label: '電話番号' },
        { id: 'address', type: 'textarea', label: '住所' },
        { id: 'industry', type: 'select', label: '業種' },
        { id: 'created-date', type: 'created-date', label: '作成日時' }
      ]
      setFormComponents(customerComponents)
    }
  }, [appId, packId])

  const handleAddComponent = (component: ComponentDefinition) => {
    const newComponent: FormComponent = {
      id: `${component.type}-${Date.now()}`,
      type: component.type,
      label: component.name,
      value: ''
    }
    setFormComponents([...formComponents, newComponent])
  }

  const handleDeleteComponent = (id: string) => {
    setFormComponents(formComponents.filter(comp => comp.id !== id))
    if (selectedComponent === id) {
      setSelectedComponent(null)
    }
  }

  const handleDragStart = (index: number) => {
    setDraggedIndex(index)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault()
    if (draggedIndex === null || draggedIndex === dropIndex) return

    const newComponents = [...formComponents]
    const draggedItem = newComponents[draggedIndex]
    newComponents.splice(draggedIndex, 1)
    newComponents.splice(dropIndex, 0, draggedItem)
    setFormComponents(newComponents)
    setDraggedIndex(null)
  }

  const handleDragEnd = () => {
    setDraggedIndex(null)
  }

  const handleLabelChange = (id: string, newLabel: string) => {
    setFormComponents(formComponents.map(comp => 
      comp.id === id ? { ...comp, label: newLabel } : comp
    ))
  }

  const handleSave = () => {
    const finalAppId = appId || `app-${Date.now()}`
    const appData: AppData = {
      id: finalAppId,
      name: appName,
      formComponents: formComponents as FormComponent[],
      settings: {},
      createdAt: appId ? getApp(finalAppId)?.createdAt || new Date().toISOString() : new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    saveApp(appData)
    alert('アプリを保存しました！')
  }

  const handlePublish = () => {
    if (formComponents.length === 0) {
      alert('フォームにコンポーネントを追加してください')
      return
    }
    
    const appNameInput = prompt('アプリ名を入力してください:', appName)
    if (!appNameInput) return
    
    setAppName(appNameInput)
    const finalAppId = appId || `app-${Date.now()}`
    const appData: AppData = {
      id: finalAppId,
      name: appNameInput,
      formComponents: formComponents as FormComponent[],
      settings: {},
      createdAt: appId ? getApp(finalAppId)?.createdAt || new Date().toISOString() : new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    saveApp(appData)
    alert('アプリを公開しました！')
    navigate('/')
  }

  const handleCancel = () => {
    if (confirm('作成を中止しますか？')) {
      navigate('/')
    }
  }

  const renderComponent = (component: FormComponentLocal, index: number) => {
    const baseClasses = `form-field ${selectedComponent === component.id ? 'selected' : ''} ${draggedIndex === index ? 'dragging' : ''}`
    
    switch (component.type) {
      case 'label':
        return (
          <div
            key={component.id}
            className={baseClasses}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
            onDragEnd={handleDragEnd}
            onClick={() => setSelectedComponent(component.id)}
          >
            <div className="drag-handle">⋮⋮</div>
            {selectedComponent === component.id ? (
              <input
                type="text"
                className="label-edit-input"
                value={component.label}
                onChange={(e) => handleLabelChange(component.id, e.target.value)}
                onClick={(e) => e.stopPropagation()}
                onBlur={() => setSelectedComponent(null)}
                autoFocus
              />
            ) : (
              <label className="field-label">{component.label}</label>
            )}
            <button className="delete-btn" onClick={(e) => { e.stopPropagation(); handleDeleteComponent(component.id) }}>×</button>
          </div>
        )
      case 'text':
        return (
          <div
            key={component.id}
            className={baseClasses}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
            onDragEnd={handleDragEnd}
            onClick={() => setSelectedComponent(component.id)}
          >
            <div className="drag-handle">⋮⋮</div>
            <label className="field-label">{component.label}</label>
            <input type="text" className="field-input" placeholder="入力してください" />
            <button className="delete-btn" onClick={(e) => { e.stopPropagation(); handleDeleteComponent(component.id) }}>×</button>
          </div>
        )
      case 'textarea':
        return (
          <div
            key={component.id}
            className={baseClasses}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
            onDragEnd={handleDragEnd}
            onClick={() => setSelectedComponent(component.id)}
          >
            <div className="drag-handle">⋮⋮</div>
            <label className="field-label">{component.label}</label>
            <textarea className="field-textarea" placeholder="入力してください" rows={3}></textarea>
            <button className="delete-btn" onClick={(e) => { e.stopPropagation(); handleDeleteComponent(component.id) }}>×</button>
          </div>
        )
      case 'number':
        return (
          <div
            key={component.id}
            className={baseClasses}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
            onDragEnd={handleDragEnd}
            onClick={() => setSelectedComponent(component.id)}
          >
            <div className="drag-handle">⋮⋮</div>
            <label className="field-label">{component.label}</label>
            <input type="number" className="field-input" placeholder="0" />
            <button className="delete-btn" onClick={(e) => { e.stopPropagation(); handleDeleteComponent(component.id) }}>×</button>
          </div>
        )
      case 'date':
        return (
          <div
            key={component.id}
            className={baseClasses}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
            onDragEnd={handleDragEnd}
            onClick={() => setSelectedComponent(component.id)}
          >
            <div className="drag-handle">⋮⋮</div>
            <label className="field-label">{component.label}</label>
            <input type="date" className="field-input" />
            <button className="delete-btn" onClick={(e) => { e.stopPropagation(); handleDeleteComponent(component.id) }}>×</button>
          </div>
        )
      case 'datetime':
        return (
          <div
            key={component.id}
            className={baseClasses}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
            onDragEnd={handleDragEnd}
            onClick={() => setSelectedComponent(component.id)}
          >
            <div className="drag-handle">⋮⋮</div>
            <label className="field-label">{component.label}</label>
            <input type="datetime-local" className="field-input" />
            <button className="delete-btn" onClick={(e) => { e.stopPropagation(); handleDeleteComponent(component.id) }}>×</button>
          </div>
        )
      case 'time':
        return (
          <div
            key={component.id}
            className={baseClasses}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
            onDragEnd={handleDragEnd}
            onClick={() => setSelectedComponent(component.id)}
          >
            <div className="drag-handle">⋮⋮</div>
            <label className="field-label">{component.label}</label>
            <input type="time" className="field-input" />
            <button className="delete-btn" onClick={(e) => { e.stopPropagation(); handleDeleteComponent(component.id) }}>×</button>
          </div>
        )
      case 'select':
        const industryOptions = component.label === '業種' 
          ? ['----', 'IT・ソフトウェア', '製造業', '建設業', '小売業', 'サービス業', '金融業', 'その他']
          : ['----']
        return (
          <div
            key={component.id}
            className={baseClasses}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
            onDragEnd={handleDragEnd}
            onClick={() => setSelectedComponent(component.id)}
          >
            <div className="drag-handle">⋮⋮</div>
            <label className="field-label">{component.label}</label>
            <select className="field-select">
              {industryOptions.map((option, i) => (
                <option key={i}>{option}</option>
              ))}
            </select>
            <button className="delete-btn" onClick={(e) => { e.stopPropagation(); handleDeleteComponent(component.id) }}>×</button>
          </div>
        )
      case 'space':
        return (
          <div
            key={component.id}
            className={`${baseClasses} space-field`}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
            onDragEnd={handleDragEnd}
            onClick={() => setSelectedComponent(component.id)}
          >
            <div className="drag-handle">⋮⋮</div>
            <div className="space-indicator">スペース</div>
            <button className="delete-btn" onClick={(e) => { e.stopPropagation(); handleDeleteComponent(component.id) }}>×</button>
          </div>
        )
      case 'divider':
        return (
          <div
            key={component.id}
            className={`${baseClasses} divider-field`}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
            onDragEnd={handleDragEnd}
            onClick={() => setSelectedComponent(component.id)}
          >
            <div className="drag-handle">⋮⋮</div>
            <hr />
            <button className="delete-btn" onClick={(e) => { e.stopPropagation(); handleDeleteComponent(component.id) }}>×</button>
          </div>
        )
      case 'created-date':
        return (
          <div
            key={component.id}
            className={baseClasses}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
            onDragEnd={handleDragEnd}
            onClick={() => setSelectedComponent(component.id)}
          >
            <div className="drag-handle">⋮⋮</div>
            <label className="field-label">{component.label}</label>
            <input type="datetime-local" className="field-input" disabled />
            <button className="delete-btn" onClick={(e) => { e.stopPropagation(); handleDeleteComponent(component.id) }}>×</button>
          </div>
        )
      default:
        return (
          <div
            key={component.id}
            className={baseClasses}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
            onDragEnd={handleDragEnd}
            onClick={() => setSelectedComponent(component.id)}
          >
            <div className="drag-handle">⋮⋮</div>
            <label className="field-label">{component.label}</label>
            <div className="field-placeholder">{component.type} フィールド</div>
            <button className="delete-btn" onClick={(e) => { e.stopPropagation(); handleDeleteComponent(component.id) }}>×</button>
          </div>
        )
    }
  }

  return (
    <div className="form-builder">
      <div className="builder-sidebar">
        <div className="sidebar-section">
          <h3 className="sidebar-title">フォームを保存</h3>
          <input
            type="text"
            value={appName}
            onChange={(e) => setAppName(e.target.value)}
            className="app-name-input"
            placeholder="アプリ名"
          />
          <button className="save-button" onClick={handleSave}>保存</button>
        </div>
        
        <div className="sidebar-section">
          <h3 className="sidebar-title">コンポーネント</h3>
          <div className="component-list">
            {availableComponents.map((component) => (
              <div
                key={component.id}
                className="component-item"
                onClick={() => handleAddComponent(component)}
                title={component.name}
              >
                <span className="component-icon">{component.icon}</span>
                <span className="component-name">{component.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="builder-canvas">
        <div className="canvas-header">
          <h2>フォーム</h2>
          <div className="canvas-actions">
            <button className="action-button">アプリ作成ガイド</button>
            <button className="action-button" onClick={handleCancel}>作成を中止</button>
            <button className="action-button primary" onClick={handlePublish}>アプリを公開</button>
          </div>
        </div>
        
        <div className="form-canvas">
          {formComponents.length === 0 ? (
            <div className="empty-canvas">
              <p>左側のコンポーネントをクリックして、フォームに追加してください</p>
            </div>
          ) : (
            <div className="form-fields">
              {formComponents.map((component, index) => renderComponent(component, index))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default FormBuilder
