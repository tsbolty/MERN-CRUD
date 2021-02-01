import React, { useState, useEffect } from 'react';

const List = ({ title, body, id, handleUpdate, handleDelete }) => {

  return (
    <>
      {items.map(item => (
        <li >
          <p>{title}</p>
          <p>{body}</p>
          <button onClick={()=> handleUpdate.bind(this, id)}>Update</button>
          <button onClick={()=> handleDelete.bind(this, id)}>Delete</button>
        </li>

      ))}
    </>
  )
}

export default List;