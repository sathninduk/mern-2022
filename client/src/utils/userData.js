export default function userData() {
    const jwt = JSON.parse(localStorage.getItem('jwt'));

    if (jwt) {
        let base64Url = jwt.split('.')[1];
        let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        let jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    } else {
        return {};
    }
}