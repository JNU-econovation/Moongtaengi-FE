export const getTokenFromSession = () => {
    const token = sessionStorage.getItem('JWT');

    return token;
}