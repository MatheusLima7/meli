const Language = 'pt-BR';

export const DateInstances = {
  dayLong: new Intl.DateTimeFormat(Language, {
    weekday: 'long',
  }),
  dayShort: new Intl.DateTimeFormat(Language, {
    weekday: 'short',
  }),
  monthLong: new Intl.DateTimeFormat(Language, {
    month: 'long',
  }),
  monthShort: new Intl.DateTimeFormat(Language, {
    month: 'short',
  }),
};

const normalizeReplacer = (str: string) => str.substring(0, str.length - 1);

export const normalizeDate = (input: number | string | Date) => {
  switch (typeof input) {
    case 'number': {
      return normalizeReplacer(new Date(input).toString());
    }
    case 'string': {
      let response = input;
      if (response.indexOf('T') === -1) {
        response += 'T00:00:00.000';
      }
      if (response[response.length - 1] !== 'Z') {
        response += 'Z';
      }
      response = normalizeReplacer(response);
      return response;
    }
    default: {
      return normalizeReplacer(input.toString());
    }
  }
};

export const formatDateDictionary: any = {
  dddd: (d: Date) => DateInstances.dayLong.format(d),
  ddd: (d: Date) => DateInstances.dayShort.format(d),
  DD: (d: Date) => `${d.getDate()}`.padStart(2, '0'),
  D: (d: Date) => `${d.getDate()}`,
  MMMM: (d: Date) => DateInstances.monthLong.format(d),
  MMM: (d: Date) => DateInstances.monthShort.format(d),
  MM: (d: Date) => `${d.getMonth() + 1}`.padStart(2, '0'),
  YYYY: (d: Date) => d.getFullYear(),
  YY: (d: Date) => `${d.getFullYear()}`.substring(1),
  HH: (d: Date) => `${d.getHours()}`.padStart(2, '0'),
  hh: (d: Date) => d.getHours(),
  mm: (d: Date) => `${d.getMinutes()}`.padStart(2, '0'),
  ss: (d: Date) => `${d.getSeconds()}`.padStart(2, '0'),
};

formatDateDictionary.reg = new RegExp(
  `(${Object.keys(formatDateDictionary).concat(['\\[', '\\]']).join('|')})`,
  'g',
);

export const formatDate = (dateStr: number | string, format: string) => {
  const dt = new Date(normalizeDate(dateStr));
  const response: string = format.replace(
    formatDateDictionary.reg,
    (_, slice) => (
      ['[', ']'].includes(slice) ? '' : formatDateDictionary[slice](dt)
    ),
  ).replace('.', '');
  return response;
};

export default {
  formatDate,
};
