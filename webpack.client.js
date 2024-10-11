import path from 'path';
import dotenv from 'dotenv';
import { merge } from 'webpack-merge';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import config, { __dirname } from './webpack.config.js';

dotenv.config();

export default merge(config, {
    devServer: {
        historyApiFallback: true,
        hot: true,
        open: true,
        port: process.env.PORT_CLIENT,
        proxy: [
            {
                context: '/api',
                target: `http://localhost:${process.env.PORT_CLIENT}`,
                router: () => `http://localhost:${process.env.PORT_SERVER}`,
                logLevel: 'debug',
            },
        ],
        static: {
            directory: path.join(__dirname, 'www'),
        },
        watchFiles: {
            paths: ['src/**/*'],
        },
    },
    entry: path.resolve(__dirname, 'src/index.ts'),
    output: {
        filename: 'index.js',
    },
    module: {},
    resolve: {
        alias: {
            '@src': path.resolve(__dirname, 'src'),
        },
    },
    plugins: [
        new BundleAnalyzerPlugin({
            analyzerMode: process.env.ANALYZER_MODE || 'disabled',
        }),
    ],
});
