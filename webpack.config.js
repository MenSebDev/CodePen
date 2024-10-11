import path from 'path';
import url from 'url';

export const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

export default {
    devtool: 'source-map',
    mode: process.env.NODE_ENV || 'development',
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
