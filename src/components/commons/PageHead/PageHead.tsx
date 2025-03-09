import Head from 'next/head';

interface PropTypes {
    title?: string;
}

const PageHead = (props: PropTypes) => {
    const { title = 'TemuTix' } = props;
    return (
        <Head>
            <meta charSet="UTF-8" />
            <meta name="viewport" content='width=device-width, initial-scale=1' />
            <title>{title}</title>
        </Head>
    );
};

export default PageHead;