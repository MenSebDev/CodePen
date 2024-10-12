import path from 'path';
import dotenv from 'dotenv';
import { merge } from 'webpack-merge';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { Configuration as WebpackConfiguration } from 'webpack';
import { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import config, { __dirname } from './webpack.config';

dotenv.config();

const { PORT_CLIENT = '3000', PORT_SERVER = '3001' } = process.env;

const clientConfig: WebpackConfiguration & {
    devServer: DevServerConfiguration;
} = {
    devServer: {
        historyApiFallback: true,
        hot: true,
        open: true,
        port: PORT_CLIENT,
        proxy: [
            {
                context: '/api',
                target: `http://localhost:${PORT_CLIENT}`,
                router: () => `http://localhost:${PORT_SERVER}`,
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
        process.env.ANALYZE === 'true'
            ? new BundleAnalyzerPlugin({
                  analyzerMode: 'server',
                  openAnalyzer: true,
              })
            : null,
    ],
};

export default merge(config, clientConfig);
