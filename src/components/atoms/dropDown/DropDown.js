import React from 'react';

export default function DropDown(props) {
  const onChange = (e) => {
    props.history.push(`/${e.target.value}`);
  }

  const { categoryList, url } = props;

  return (
    <>
      <label htmlFor='dropdown-nav'></label>
      <select className='dropdown-nav' onChange={onChange} id='dropdown-nav'>
        {categoryList.map(item => {
          return (
            <option key={item.key} value={url + item.key}>{item.name}</option>
          )
        })}
      </select>
    </>
  );
}