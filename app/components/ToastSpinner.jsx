import React from 'react'

const ToastSpinner = (text) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8%', justifyContent: 'space-between' }}>
        <div>{text}</div>
        <div className="spinner" style={{ margin: '0 10px 0 0' }}></div>
    </div>
  )
}

export default ToastSpinner