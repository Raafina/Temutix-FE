import Head from 'next/head';

interface PropTypes {
    title?: string;
}

const PageHead = (props: PropTypes) => {
    const { title = 'TemuTix' } = props;
    return (
        <Head>
            <title>{title}</title>
            <meta charSet="UTF-8" />
            <meta name="viewport" content='width=device-width, initial-scale=1' />
            <link rel="icon" href="/images/general/logo.svg" type='image/x-icon' />
        </Head>
    );
};

export default PageHead;