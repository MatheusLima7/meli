export const convertStringToNumber = (str: string) => {
  if (!str) return null;
  const strNumber = str.replace(/[^\d,]+/g, '')?.replace(',', '.');
  if (!strNumber) return null;
  return parseFloat(strNumber);
};

const formatAbbreviationNumber = (input: string | number, fix = 2) => {
  if (!input) return '';

  const billion = 1000000000;
  const million = 1000000;
  const thousand = 1000;

  const number = typeof input === 'string' ? +input.replace(/\D/g, '') : input;

  if (!number) return 0;

  let response;
  let unit = '';

  switch (true) {
    case number / billion >= 1 || number / billion < -1:
      response = (number / billion).toFixed(fix);
      unit = ' B';
      break;
    case number / million >= 1 || number / million < -1:
      response = (number / million).toFixed(fix);
      unit = ' M';
      break;
    case number / thousand >= 1 || number / thousand < -1:
      response = (number / thousand).toFixed(0);
      unit = ' K';
      break;
    default:
      response = number.toFixed(fix);
      break;
  }

  return response + unit;
};

const formatNumber = (number: number, fixed = 2) => {
  if (!number) return 0;
  const formatedNumber = typeof number === 'string'
    ? parseFloat(number) : number;
  const parsedNumber = formatedNumber.toFixed(fixed);

  let response = String(parsedNumber);
  if (response.indexOf('.') !== -1) {
    response = response.replace('.', ',');
  }

  return fixed > 3
    ? response
    : String(response).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.');
};

export default {
  formatAbbreviationNumber,
  formatNumber,
};
