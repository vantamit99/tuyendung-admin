export function set(key: string, value: string, time?: Date) {
  let expires = `expires=${time.toUTCString()}`;
  document.cookie = `${key}=${value};${expires};path=/`;
}
export function get(key: string) {
  let cookies = document.cookie;
  let arrCookie = cookies.split(';');
  let arrCookieFilter = arrCookie.filter(c => {
    return c.trim().indexOf(`${key}=`) == 0;
  });
  if (arrCookieFilter.length == 1) {
    let str = arrCookieFilter[0].trim();
    return str.slice(str.indexOf('=') + 1, str.length)
  }
  return '';
}
export function remove(key: string) {
  document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}
export function check(key: string) {
  let cookies = document.cookie;
  return (cookies.indexOf(`${key}=`) > -1) ? true : false;
}