import React from 'react'
import classNames from 'classnames'
import { TEMPLATE_OPTIONS } from '../lib/templates'

export default function TopBar({
    title, setTitle,
    templateId, onTemplateChange,
    onSave, onOpenSaved, savedList,
    onShare, layout, setLayout
}) {
    return (
        <div className="topbar">
            <div className="brand">Code Playground</div>

            <div className="menu">
                <select value={templateId} onChange={(e) => onTemplateChange(e.target.value)} title="Start from a template">
                    {TEMPLATE_OPTIONS.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
                </select>

                <input className="title-input" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Untitled snippet" />

                <button onClick={onSave} title="Save to browser">Save</button>

                <select onChange={(e) => onOpenSaved(e.target.value)} defaultValue="">
                    <option value="" disabled>Open saved…</option>
                    {savedList.map(s => <option key={s.id} value={s.id}>{s.title}</option>)}
                </select>

                <button onClick={onShare} title="Share URL">Share URL</button>
            </div>

            <div style={{ flex: 1 }} />

            <div>
                <button className={classNames({ active: layout === 'split' })} onClick={() => setLayout('split')}>Split</button>
                <button className={classNames({ active: layout === 'editor' })} onClick={() => setLayout('editor')}>Editor</button>
                <button className={classNames({ active: layout === 'preview' })} onClick={() => setLayout('preview')}>Preview</button>
            </div>
        </div>
    )
}