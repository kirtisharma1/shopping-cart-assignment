import React from 'react';

export default React.forwardRef((props, ref) => {
  return (
    <button type="button" {...props} ref={ref}>
      {props.children}
    </button>
  )
})