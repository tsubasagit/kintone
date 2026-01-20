import { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Layout.css'

interface LayoutProps {
  children: ReactNode
}

function Layout({ children }: LayoutProps) {
  const location = useLocation()
  const isFormBuilder = location.pathname === '/form-builder'
  const isSettings = location.pathname === '/settings'

  return (
    <div className="layout">
      <header className="header">
        <div className="header-left">
          <h1 className="logo">アプリ作成サイト</h1>
        </div>
        <div className="header-right">
          <input type="text" placeholder="全体検索" className="search-input" />
          <div className="user-info">ユーザー名</div>
        </div>
      </header>
      
      {(isFormBuilder || isSettings) && (
        <nav className="app-nav">
          <div className="nav-tabs">
            <Link 
              to="/form-builder" 
              className={`nav-tab ${isFormBuilder ? 'active' : ''}`}
            >
              フォーム
            </Link>
            <Link 
              to="/settings" 
              className={`nav-tab ${isSettings ? 'active' : ''}`}
            >
              設定
            </Link>
          </div>
        </nav>
      )}

      <main className="main-content">
        {children}
      </main>
    </div>
  )
}

export default Layout
