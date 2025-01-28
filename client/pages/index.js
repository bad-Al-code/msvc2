import buildClient from '../api/buildClient';

const Page = ({ currentUser }) => {
    return currentUser ? <h1>User Signed In</h1> : <h1>User NOT signed in</h1>;
};
Page.getInitialProps = async (context) => {
    const client = buildClient(context);

    const { data } = await client.get('/api/users/currentUser');

    return data;
};

export default Page;
