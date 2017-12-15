export const stripEmptyFields = (o) => {
  let strippedObj = {};
  Object.keys(o).filter(key => o[key] !== '').forEach(k => {
    strippedObj[k] = o[k]
  })
  return strippedObj;
}
