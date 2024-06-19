import { useState } from 'react';

const useSortableData = (initialData) => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('');

  const handleRequestSort = (event, property) => {
    console.log('event: ' + property);
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const getComparator = (order, orderBy) => {
    return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
  };

  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };

  const sortData = (array, comparator) => {
    if (!Array.isArray(array)) {
      throw new TypeError('The first argument must be an array');
    }

    if (typeof comparator !== 'function') {
      throw new TypeError('The second argument must be a function');
    }

    return array.slice().sort((a, b) => {
      const order = comparator(a, b);
      return order !== 0 ? order : array.indexOf(a) - array.indexOf(b);
    });
  };

  const sortedData = sortData(initialData, getComparator(order, orderBy));

  return { order, orderBy, sortedData, handleRequestSort };
};

export default useSortableData;
