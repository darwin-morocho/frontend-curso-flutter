const getFileExtension = name => {
  const found = name.lastIndexOf('.') + 1;
  return found > 0 ? name.substr(found) : null;
};

export { getFileExtension };
