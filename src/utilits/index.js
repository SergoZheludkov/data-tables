const getObjectWithTrimedValues = (data, tableHeaders) => tableHeaders
  .reduce((acc, header) => ({ ...acc, [header]: data[header].trim() }), {});

export default getObjectWithTrimedValues;
