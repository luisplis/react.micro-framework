import React, { useState } from 'react'
import useCrud, { type UseCrudHook } from './useCrud';

export default function Crud() {

  const [items, addItem, remItem] = useCrud();

  return (
    <>
    <form className="form" onSubmit={addItem} aria-label='añadir elementos'>
      <label> Nuevo elemento:<br/>
        <input name="item" type='text' placeholder='Introduce elemento' required/>&nbsp;
      </label>
      <button type="submit">
        Añadir a la Lista
      </button>
    </form>
    {
      (!items.length)
      ?
        <p className='msg'>
          <small>Lista vacia</small>
        </p>
      :
        <ul className='list'>
        {
          items.map(item =>
              <li key={item.id}>
                {item.text} <button className='button' onClick={ () => remItem(item.id) }>X</button>
              </li>
            )
        }
        </ul>
    }
    </>
  )
}