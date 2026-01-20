export interface AppData {
  id: string
  name: string
  formComponents: FormComponent[]
  settings: any
  createdAt: string
  updatedAt: string
}

export interface FormComponent {
  id: string
  type: string
  label: string
  value?: string
}

const STORAGE_KEY = 'kintone-apps'

export const getApps = (): AppData[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

export const saveApp = (app: AppData): void => {
  const apps = getApps()
  const existingIndex = apps.findIndex(a => a.id === app.id)
  
  if (existingIndex >= 0) {
    apps[existingIndex] = { ...app, updatedAt: new Date().toISOString() }
  } else {
    apps.push(app)
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(apps))
}

export const getApp = (id: string): AppData | null => {
  const apps = getApps()
  return apps.find(a => a.id === id) || null
}

export const deleteApp = (id: string): void => {
  const apps = getApps()
  const filtered = apps.filter(a => a.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
}
