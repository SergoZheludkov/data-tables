const getObjectWithTrimedValues = (data, headings) => headings
  .reduce((acc, head) => ({ ...acc, [head]: data[head].trim() }), {});

export default getObjectWithTrimedValues;
