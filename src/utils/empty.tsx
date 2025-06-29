const isEmpty = (value: any) => {
  return (
    value === null ||
    value === undefined ||
    value === "" ||
    (Array.isArray(value) && value.length === 0) ||
    (Array.isArray(value) && value.length === 1 && value[0] === "")
  );
};

export default isEmpty;
