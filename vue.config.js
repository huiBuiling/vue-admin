const path = require("path");
module.exports = {
    // 废弃baseUrl  一般运维会配置好的
    publicPath: './',
    //打包的输出目录
    outputDir: "dist",
    //保存是校验
    lintOnSave: process.env.NODE_ENV === 'development',
    //允许对内部的 webpack 配置进行更细粒度的修改。
    chainWebpack: (config) => {
        //命名
        // config.resolve.alias
        //     .set('SRC', resolve('src'))
        //     .set('ASSET', resolve('src/assets'))
        //     .set('VIEW', resolve('src/components/page'))
        //     .set('COMPONENT', resolve('src/components/common'))
        //     .set('UTIL', resolve('src/utils'))
        //     .set('SERVICE', resolve('src/services'));
        //打包文件带hash
        // config.output.filename('[name].[hash].js').end();

        //修改 Loader 选项
        config.module
            .rule("vue")
            .use("vue-loader")
            .loader("vue-loader")
            .tap(options => {
                // modify the options...
                options.compilerOptions.preserveWhitespace = true;
                return options;
            });
    },
    devServer:{
        port:6001
    },
};
