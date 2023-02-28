export default function dateToObject(array) {
  return array.map((el) => ({ ...el, date: new Date(el.date) }));
}
