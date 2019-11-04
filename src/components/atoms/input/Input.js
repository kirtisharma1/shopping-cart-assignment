import React from 'react';

export default function InputComponent(props) {
  const {
    type, placeholder, name, className, value, onChange, pattern, title
  } = props;

  return (
    <div>
      <label htmlFor={type}></label>
      <input type={type}
        aria-label={placeholder || ''}
        placeholder={placeholder || ''}
        id={name}
        required
        className={className || ''}
        defaultValue={value || ''}
        onChange={onChange && onChange}
        name={name || ''}
        pattern={pattern || '.*'}
        title={title && title} />
    </div>
  )
}