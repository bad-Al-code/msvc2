import { useState } from 'react';
import { useRouter } from 'next/router';

import useRequest from '../../hooks/useRequest';

const SignUp = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { doRequest, errors } = useRequest({
        url: '/api/users/signup',
        method: 'post',
        body: {
            email,
            password,
        },
        onSucess: () => {
            router.push('/');
        },
    });

    const onSubmit = async (event) => {
        event.preventDefault();

        await doRequest();
    };

    return (
        <form onSubmit={onSubmit}>
            <h1>sign up</h1>
            <div className="form-group">
                <label>email address</label>
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label>password</label>
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    className="form-control"
                />
            </div>

            {errors}

            <button className="btn btn-primary">Sign Up</button>
        </form>
    );
};

export default SignUp;
