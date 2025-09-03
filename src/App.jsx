// main app file

import React, { useEffect, useMemo, useState } from 'react'
import TopBar from './components/TopBar.jsx'
import EditorPane from './components/EditorPane.jsx'
import PreviewPane from './components/PreviewPane.jsx'
import useLocalStorage from './hooks/useLocalStorage.js'
import { getTemplate } from './lib/templates.js'
import { decodeStateFromURL, updateURL } from './lib/share.js'

const DEFAULT_TEMPLATE = 'starter'

export default function App() {
  // states for code (bit inconsistent naming, i know)
  const [title, setTitle] = useLocalStorage('cp:title', 'Untitled snippet')
  const [templateId, setTemplateId] = useLocalStorage('cp:template', DEFAULT_TEMPLATE)
  const [layout, setLayout] = useLocalStorage('cp:layout', 'split')
  const [activeTab, setActiveTab] = useLocalStorage('cp:activeTab', 'html')

  // Code state: object {html,css,js}
  const [code, setCode] = useLocalStorage('cp:code', getTemplate(DEFAULT_TEMPLATE))
  const [srcDoc, setSrcDoc] = useState('')

  // Local saved collection: array of {id,title,data}
  const [saved, setSaved] = useLocalStorage('cp:saved', [])

  // Load from URL if present (only once on mount)
  useEffect(() => {
    const s = decodeStateFromURL()
    if (s) {
      setTitle(s.title ?? title)
      setTemplateId(s.templateId ?? templateId)
      setLayout(s.layout ?? layout)
      setActiveTab(s.activeTab ?? activeTab)
      setCode(s.code ?? code)
    }
    // eslint-disable-next-line
  }, [])

  // Debounced rebuild of iframe srcDoc
  useEffect(() => {
    const handle = setTimeout(() => {
      const doc = `<!doctype html><html><head><meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<style>${code.css || ''}</style></head>
<body>${code.html || ''}<script>
try {
${code.js || ''}
} catch(e) {
  console.error(e);
  var pre = document.createElement('pre');
  pre.style.cssText = 'position:fixed;left:0;right:0;bottom:0;background:#400;color:#fff;padding:8px;margin:0;font-family:monospace;';
  pre.textContent = 'Error: ' + (e && e.message ? e.message : e);
  document.body.appendChild(pre);
}
</script></body></html>`
      setSrcDoc(doc)
    }, 250)
    return () => clearTimeout(handle)
  }, [code])

  // Template change handler
  function handleTemplateChange(id) {
    const t = getTemplate(id)
    setTemplateId(id)
    setCode({ html: t.html, css: t.css, js: t.js })
    setTitle(t.title + ' — ' + new Date().toLocaleDateString())
    setActiveTab('html')
  }

  // Save current to saved list
  function handleSave() {
    const id = Math.random().toString(36).slice(2, 9)
    const item = { id, title: title || 'Untitled', data: { title, templateId, layout, activeTab, code } }
    setSaved(prev => [item, ...prev].slice(0, 50))
    alert('Saved locally — open from dropdown.')
  }

  // Load saved item
  function handleOpenSaved(id) {
    const item = saved.find(s => s.id === id)
    if (!item) return
    setTitle(item.data.title)
    setTemplateId(item.data.templateId)
    setLayout(item.data.layout)
    setActiveTab(item.data.activeTab)
    setCode(item.data.code)
  }

  // Share: compress and write to URL + clipboard
  async function handleShare() {
    const state = { title, templateId, layout, activeTab, code }
    const url = updateURL(state)
    try {
      await navigator.clipboard.writeText(url)
      alert('Share URL copied to clipboard!')
    } catch {
      prompt('Copy this URL', url)
    }
  }

  const containerClass = useMemo(() => {
    if (layout === 'editor') return 'container editor'
    if (layout === 'preview') return 'container preview'
    return 'container'
  }, [layout])

  return (
    <div style={{ height: '100%' }}>
      <TopBar
        title={title} setTitle={setTitle}
        templateId={templateId} onTemplateChange={handleTemplateChange}
        onSave={handleSave} onOpenSaved={handleOpenSaved} savedList={saved}
        onShare={handleShare}
        layout={layout} setLayout={setLayout}
      />

      <div className={containerClass}>
        {(layout === 'split' || layout === 'editor') && (
          <EditorPane
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            code={code}
            setCode={setCode}
          />
        )}

        {(layout === 'split' || layout === 'preview') && (
          <PreviewPane srcDoc={srcDoc} />
        )}
      </div>
    </div>
  )
}