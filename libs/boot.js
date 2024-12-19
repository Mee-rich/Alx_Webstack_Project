import envFetch from "../utils/dot_Env";

const startServer = (api) => {
    envFetch();
    const port = process.env.PORT || 5000;
    const env = process.env.npm_lifecycle_event || 'dev';
    api.listen(port, () => {
        console.log(`[${env}] API has started listening at port:${port}`);
    });
};

export default startServer;