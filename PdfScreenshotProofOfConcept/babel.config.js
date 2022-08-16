module.exports = api => {
    const isTest = api.env('test');
    if (isTest) {
        return {
            presets: [
                [
                    '@babel/preset-env',
                    {
                        modules: false,
                    },
                ],
                '@babel/preset-react',
            ],
            plugins: [
                "@babel/plugin-transform-modules-commonjs",
            ],
        }
    } else {
        return {
            presets: [
                ['@babel/preset-env', {
                    modules: false,
                    targets: "IE >= 11",
                    //{
                    //    //node: true
                    //    //browsers:
                    //}
                }],
                '@babel/preset-react'
            ],
        }
    }
};
