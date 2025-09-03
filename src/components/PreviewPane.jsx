import React from 'react'

export default function PreviewPane({ srcDoc }) {
  return (
    <div className="panel">
      <div className="tabbar"><div className="notice">Live Preview</div></div>
      <div className="preview-root">
        <iframe
          className="preview-frame"
          title="preview"
          sandbox="allow-forms allow-modals allow-popups allow-scripts allow-pointer-lock allow-downloads"
          srcDoc={srcDoc}
        />
      </div>
    </div>
  )
}