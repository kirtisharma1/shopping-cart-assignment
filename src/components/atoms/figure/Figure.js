import React from 'react';

export default function Figure(props) {
  return (
    <figure {...props}>
      {props.children}
    </figure>
  )
}