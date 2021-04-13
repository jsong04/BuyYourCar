import { useState } from 'react';

export default useApi = (apiFuction) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const request = async (...args) => {
        setLoading(true);
        const res = await apiFuction(...args);
        if (!res.ok) return setError(true);
        setError(false);
        // const res = await axios.get("http://192.168.1.4:7000/api/listings");
        setLoading(false);
        if (res) {
            setData(res.data);
        }
    }
    return { data, error, loading, request };
}