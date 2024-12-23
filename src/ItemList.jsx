import React, { useEffect } from 'react';
import useStore from './store';

const ItemList = () => {
  const { items, fetchItems } = useStore();

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
};

export default ItemList;
