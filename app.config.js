const appConfig = {
    // app title
    name: "Camino Explorer",
    // app description
    description:
        "Camino Explorer allows you to explore and search the Camino blockchain for transactions, addresses and blocks",
    // app keywords
    keywords: "camino, explorer, search, blockchain, crypto, currency",
    // apollo client settings
    apollo: {
        // list of providers. if one of them is unavailable, another is randomly picked
        providers: [],
        // index into providers array of default provider or 'random' - takes index randomly
        defaultProviderIndex: "random"
    },
    //
    useTestnet: true,
    // use 'hash' mode in vue router
    routerHashMode: false,
    // testnet config
    testnet: {
        // list of providers. if one of them is unavailable, another is randomly picked
        providers: [
            {
                http: 'http://localhost:16761/api',
                // for subscriptions
                ws: '',
            },
        ],
    },
    // progressive web application
    usePWA: true,
    // pwa settings
    pwa: {
        // name used in pwa manifest
        name: "Camino Explorer"
    },
    // default options for production build
    build: {
        // output dir for production build
        outputDir: "dist"
    },
    // downtime threshold in seconds. downtime values less than this threshold will be displayed as 0
    downtimeThreshold: 10
};

if (appConfig.useTestnet) {
    appConfig.apollo.providers = appConfig.testnet.providers;
}

// scss variables prepended to every scss file
appConfig.scssData = `
    @import "src/assets/scss/vars";
`;

module.exports = appConfig;
