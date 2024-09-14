export default url => {
  const paramString = url.includes('?') ? url.split('?')[1].split('&') : [];
  const params = {};

  paramString.forEach(params => {
    const paramsSplit = param.split('=');
    params[paramsSplit[0]] = paramsSplit[1];
  });

  return params;
}