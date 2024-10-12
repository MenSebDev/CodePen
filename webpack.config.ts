import path from 'path';
import url from 'url';
import type { Configuration } from 'webpack';

export const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const config: Configuration = {
    devtool: 'source-map',
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                use: ['ts-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
        ],
    },
    output: {
        path: path.resolve(__dirname, 'www'),
    },
    plugins: [],
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx', '.css', '.scss'],
        alias: {
            '@src': path.resolve(__dirname, 'src'),
        },
        modules: ['node_modules'],
    },
    stats: {
        errorDetails: true,
        // logging: 'verbose',
    },
};

export default config;
