import cookie from 'cookie';

export function getToken() {
    const cookies = cookie.parse(document.cookie);
    return cookies['token'];
}