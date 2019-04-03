console.log(process.env.BUILD_VERSION);
module.exports = {
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                console.log(args[0]);
                args[0].title = 'test';
                args[0].buildVersion = process.env.BUILD_VERSION || 'local';
                args[0].template = 'public/index.html';
                return args
            });
    }
};