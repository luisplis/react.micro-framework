import React, { useState } from 'react'

interface Element {
  id: string,
  times: number,
  text: string
}

export default function useCrud() {

  const [items, setItems] = useState<Element[]>([]);

  const addItem = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const input = event.currentTarget.elements.namedItem('item');
    const isInput = input instanceof HTMLInputElement;
    if (!isInput || input == null) {
      return;
    }
    const newItem: Element = {
      id: crypto.randomUUID(),
      times: Date.now(),
      text: input.value
    };

    setItems( (prevItems) => [...prevItems, newItem]);

    input.value = '';
  };

  const remItem = (id: string) => {
    setItems( (prevItems) => prevItems.filter(current => (current.id !== id)) );
  };

  return ([items, addItem, remItem])
}