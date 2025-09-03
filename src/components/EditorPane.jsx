import React from 'react'
import Editor from '@monaco-editor/react'

const TABS = [
    { id: 'html', label: 'HTML', language: 'html' },
    { id: 'css', label: 'CSS', language: 'css' },
    { id: 'js', label: 'JS', language: 'javascript' }
]

export default function EditorPane({ activeTab, setActiveTab, code, setCode }) {
    const current = TABS.find(t => t.id === activeTab) ?? TABS[0]

    function onChange(val) {
        setCode(prev => ({ ...prev, [current.id]: val || '' }))
    }

    return (
        <div className="panel">
            <div className="tabbar">
                {TABS.map(t => (
                    <button key={t.id} className={`tab ${activeTab === t.id ? 'active' : ''}`} onClick={() => setActiveTab(t.id)}>
                        {t.label}
                    </button>
                ))}
            </div>

            <div className="editor-root">
                <Editor
                    height="100%"
                    language={current.language}
                    theme="vs-dark"
                    value={code[current.id]}
                    onChange={onChange}
                    options={{
                        minimap: { enabled: false }, fontSize: 14, wordWrap: 'on',
                        tabSize: 2, scrollBeyondLastLine: false
                    }}
                />
            </div>
        </div>
    )
}