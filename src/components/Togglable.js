import React, { useImperativeHandle, useState } from 'react'
import PropTypes from 'prop-types'

export const Togglable = React.forwardRef((props, ref) => {
  const [showContent, setShowContent] = useState(false)

  const toggle = () => setShowContent(!showContent)
  useImperativeHandle(ref, () => ({
    toggle
  }))

  return (
    <>
      <div style={{ display: showContent ? '' : 'none' }}>
        {props.children}
      </div>
      <button
        style={{ display: showContent ? 'none' : '' }}
        onClick={toggle}>
        {props.label}
      </button>
    </>
  )
})

Togglable.propTypes = {
  label: PropTypes.string.isRequired
}

Togglable.displayName = 'Togglable'