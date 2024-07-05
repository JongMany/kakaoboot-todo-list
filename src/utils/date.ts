export function convertDateToDateString(input: Date, options: boolean = false) {
  const date = new Date(input);
  let result = `${date.getFullYear()} / ${
    date.getMonth() + 1
  } / ${date.getDate()} `;
  if (options) {
    result += `${date.getHours()}:${date.getMinutes()}`;
  }
  return result.trim();
}
