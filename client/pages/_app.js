import 'bootstrap/dist/css/bootstrap.min.css';
import buildClient from '../api/buildClient';

const AppComponent = ({ Component, pageProps }) => {
    return (
        <div>
            {' '}
            <h1>Header</h1> <Component {...pageProps} />
        </div>
    );
};

AppComponent.getInitialProps = async (appContext) => {
    const client = buildClient(appContext.ctx);
    const { data } = await client.get('/api/users/currentUser');

    let pageProps = {};
    if (appContext.Component.getInitialProps) {
        pageProps = await appContext.Component.getInitialProps(appContext.ctx);
    }

    return { pageProps, ...data };
};

export default AppComponent;
