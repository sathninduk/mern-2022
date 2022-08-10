export default function authHeader() {
    const jwt = JSON.parse(localStorage.getItem('jwt'));

    if (jwt) {
        return { 'x-access-token': jwt };
    } else {
        return {};
    }
}
