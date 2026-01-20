import { useState } from 'react'
import './FormBuilder.css'

interface FormComponent {
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
  const [formComponents, setFormComponents] = useState<FormComponent[]>([])
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null)

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

  const renderComponent = (component: FormComponent) => {
    const baseClasses = `form-field ${selectedComponent === component.id ? 'selected' : ''}`
    
    switch (component.type) {
      case 'label':
        return (
          <div key={component.id} className={baseClasses} onClick={() => setSelectedComponent(component.id)}>
            <label className="field-label">{component.label}</label>
            <button className="delete-btn" onClick={(e) => { e.stopPropagation(); handleDeleteComponent(component.id) }}>×</button>
          </div>
        )
      case 'text':
        return (
          <div key={component.id} className={baseClasses} onClick={() => setSelectedComponent(component.id)}>
            <label className="field-label">{component.label}</label>
            <input type="text" className="field-input" placeholder="入力してください" />
            <button className="delete-btn" onClick={(e) => { e.stopPropagation(); handleDeleteComponent(component.id) }}>×</button>
          </div>
        )
      case 'textarea':
        return (
          <div key={component.id} className={baseClasses} onClick={() => setSelectedComponent(component.id)}>
            <label className="field-label">{component.label}</label>
            <textarea className="field-textarea" placeholder="入力してください" rows={3}></textarea>
            <button className="delete-btn" onClick={(e) => { e.stopPropagation(); handleDeleteComponent(component.id) }}>×</button>
          </div>
        )
      case 'number':
        return (
          <div key={component.id} className={baseClasses} onClick={() => setSelectedComponent(component.id)}>
            <label className="field-label">{component.label}</label>
            <input type="number" className="field-input" placeholder="0" />
            <button className="delete-btn" onClick={(e) => { e.stopPropagation(); handleDeleteComponent(component.id) }}>×</button>
          </div>
        )
      case 'date':
        return (
          <div key={component.id} className={baseClasses} onClick={() => setSelectedComponent(component.id)}>
            <label className="field-label">{component.label}</label>
            <input type="date" className="field-input" />
            <button className="delete-btn" onClick={(e) => { e.stopPropagation(); handleDeleteComponent(component.id) }}>×</button>
          </div>
        )
      case 'datetime':
        return (
          <div key={component.id} className={baseClasses} onClick={() => setSelectedComponent(component.id)}>
            <label className="field-label">{component.label}</label>
            <input type="datetime-local" className="field-input" />
            <button className="delete-btn" onClick={(e) => { e.stopPropagation(); handleDeleteComponent(component.id) }}>×</button>
          </div>
        )
      case 'time':
        return (
          <div key={component.id} className={baseClasses} onClick={() => setSelectedComponent(component.id)}>
            <label className="field-label">{component.label}</label>
            <input type="time" className="field-input" />
            <button className="delete-btn" onClick={(e) => { e.stopPropagation(); handleDeleteComponent(component.id) }}>×</button>
          </div>
        )
      case 'select':
        return (
          <div key={component.id} className={baseClasses} onClick={() => setSelectedComponent(component.id)}>
            <label className="field-label">{component.label}</label>
            <select className="field-select">
              <option>----</option>
            </select>
            <button className="delete-btn" onClick={(e) => { e.stopPropagation(); handleDeleteComponent(component.id) }}>×</button>
          </div>
        )
      case 'space':
        return (
          <div key={component.id} className={`${baseClasses} space-field`} onClick={() => setSelectedComponent(component.id)}>
            <div className="space-indicator">スペース</div>
            <button className="delete-btn" onClick={(e) => { e.stopPropagation(); handleDeleteComponent(component.id) }}>×</button>
          </div>
        )
      case 'divider':
        return (
          <div key={component.id} className={`${baseClasses} divider-field`} onClick={() => setSelectedComponent(component.id)}>
            <hr />
            <button className="delete-btn" onClick={(e) => { e.stopPropagation(); handleDeleteComponent(component.id) }}>×</button>
          </div>
        )
      default:
        return (
          <div key={component.id} className={baseClasses} onClick={() => setSelectedComponent(component.id)}>
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
          <button className="save-button">保存</button>
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
            <button className="action-button">作成を中止</button>
            <button className="action-button primary">アプリを公開</button>
          </div>
        </div>
        
        <div className="form-canvas">
          {formComponents.length === 0 ? (
            <div className="empty-canvas">
              <p>左側のコンポーネントをクリックして、フォームに追加してください</p>
            </div>
          ) : (
            <div className="form-fields">
              {formComponents.map(renderComponent)}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default FormBuilder
