import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import TemplateSelection from './pages/TemplateSelection'
import FormBuilder from './pages/FormBuilder'
import Settings from './pages/Settings'
import Layout from './components/Layout'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<TemplateSelection />} />
          <Route path="/form-builder" element={<FormBuilder />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
