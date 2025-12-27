/*
import React from 'react'
import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Crud from './Crud'

describe('<Crud/>', () => {
  // Test EndToEnd (total)
  test('Usuario añade y borra elemento a la lista', async () => {

    const user = userEvent.setup()

    render(<Crud/>)

    const input = screen.getByRole('textbox')
    expect(input).toBeDefined()

    const form = screen.getByRole('form')

    const button = form.querySelector('button')
    expect(button).toBeDefined()

    await user.type(input, 'ELEMENTO Z')
    await user.click(button!) // button! => !null && !undefined

    const list = screen.getByRole('list')
    expect(list).toBeDefined()
    screen.debug()
    expect(list.childNodes.length).toBe(1)

    const item = screen.getByText('ELEMENTO Z');
    const remove = item.querySelector('button')
    expect(remove).toBeDefined()

    await user.click(remove!) // is defined yet

    screen.debug()
    expect(list.childNodes.length).toBe(1)

    const msg = screen.getByText('Lista vacia')
    expect(msg).toBeDefined()
  })
  /// test('Test Unitario - visible en pantalla', () => {
  ///  render(<Crud/>);
  ///  expect(
  ///    screen.getByText('Prueba Técnica')
  ///  ).toBeDefined();
  ///  screen.debug();
  /// });
  
});
*/