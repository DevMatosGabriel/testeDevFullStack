import './bootstrap'
import '../css/app.css'
import '../css/auth.css'

import React from 'react'
import { createRoot } from 'react-dom/client'
import { createInertiaApp } from '@inertiajs/react'
import axios from 'axios'

// ✅ Configuração do CSRF Token para evitar erro 419
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

const token = document.head.querySelector('meta[name="csrf-token"]')
if (token) {
  axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content
} else {
  console.error('CSRF token not found')
}

// 🔍 Importação dinâmica das páginas
const pages = {
  ...import.meta.glob('./Pages/**/*.jsx'),
  ...import.meta.glob('./pages/**/*.jsx'),
}

createInertiaApp({
  resolve: (name) => {
    const tries = [
      `./Pages/${name}.jsx`,
      `./pages/${name}.jsx`,
      `./pages/${name.toLowerCase()}.jsx`,
    ]
    for (const key of tries) if (pages[key]) return pages[key]()
    throw new Error(`Page not found: ${name}`)
  },
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />)
  },
  progress: { color: '#4B5563' },
})
