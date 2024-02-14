import { jwtDecode } from 'jwt-decode';

const handleDecoded = () => {
    let storageData = localStorage.getItem('access_token');

    let decoded = {};
    if (storageData) {
        storageData = JSON.parse(storageData);
        decoded = jwtDecode(storageData);
    }
    return { decoded, storageData };
};

export default handleDecoded;