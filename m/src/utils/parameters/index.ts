const getURLStringParameters = (parameter: string, arrParameters: string[]): string => {
  let urlString = '';

  arrParameters.forEach((item: any) => {
    if (item == null) return;
    urlString += `${parameter}=${item}&`;
  });

  return `${urlString}`;
};

const findCode = (urlString: string) => {
  const regex = /(code=)([A-Za-z0-9_-]+)/i;
  const code = urlString.match(regex);
  if (code) return code[2];
  return false;
};

export default {
  getURLStringParameters,
  findCode,
};
