import { useRouter } from 'next/router';
import { useEffect } from 'react';

import useRequest from '../../hooks/useRequest';

export default () => {
    const router = useRouter();
    const { doRequest } = useRequest({
        url: '/api/users/signout',
        method: 'post',
        body: {},
        onSucess: () => router.push('/'),
    });

    useEffect(() => {
        doRequest();
    }, []);

    return <div> Signing you out</div>;
};
