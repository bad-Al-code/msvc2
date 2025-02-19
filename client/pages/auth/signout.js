import { useRouter } from 'next/router';
import { useEffect } from 'react';

import useRequest from '../../hooks/useRequest';

const SignOut = () => {
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

export default SignOut;
