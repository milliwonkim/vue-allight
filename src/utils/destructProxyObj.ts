export function destructProxyObj(proxyObj: object) {
  return JSON.parse(JSON.stringify(proxyObj));
}
