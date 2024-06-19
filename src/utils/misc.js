const headCellObjects = (headCells) => {
  const _ = headCells.map((label, index) => ({
    label,
    id: index + 1
  }));

  return _;
};

export { headCellObjects };
