import buildClient from '../api/buildClient';

const Page = ({ currentUser }) => {
    console.log(currentUser);
    // axios.get('/api/users/currentUser');

    return <h1 className="text-3xl font-bold underline">Hello world!</h1>;
};
Page.getInitialProps = async (context) => {
    const client = buildClient(context);

    const { data } = await client.get('/api/users/currentUser');

    return data;
};

export default Page;
