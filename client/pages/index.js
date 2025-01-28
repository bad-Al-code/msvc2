import axios from 'axios';

const Page = ({ currentUser }) => {
    console.log(currentUser);
    // axios.get('/api/users/currentUser');

    return <h1 className="text-3xl font-bold underline">Hello world!</h1>;
};
Page.getInitialProps = async ({ req }) => {
    if (typeof window === 'undefined') {
        const { data } = await axios.get(
            /** <service-name>.<namespace>.svc.cluster.local */
            'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentUser',
            {
                headers: req.headers,
            }
        );

        return data;
    } else {
        const response = await axios.get('/api/users/currentUser');

        return response.data;
    }

    return {};
};

export default Page;
