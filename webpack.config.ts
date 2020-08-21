import path from 'path'
import webpack, { Configuration } from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'

const webpackConfig = (env): Configuration => ({
    entry: './src/index.tsx',
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.mjs', '.flow', '.gql', '.graphql'],
        alias: {
            components: path.resolve(__dirname, './src/components/'),
            types: path.resolve(__dirname, './src/types/'),
            constants: path.resolve(__dirname, './src/constants/'),
            hooks: path.resolve(__dirname, './src/hooks/'),
            // graphql: path.resolve(__dirname, './src/graphql/'),
        },
    },
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'build.js',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: {
                    transpileOnly: true,
                },
                exclude: /dist/,
            },
            {
                test: /\.(graphql|gql)$/,
                exclude: /node_modules/,
                loader: 'graphql-tag/loader',
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
        new webpack.DefinePlugin({
            'process.env.PRODUCTION': env.production || !env.development,
            'process.env.NAME': JSON.stringify(require('./package.json').name),
            'process.env.VERSION': JSON.stringify(require('./package.json').version),
        }),
        new ForkTsCheckerWebpackPlugin({
            eslint: { files: './src/**/*.{ts,tsx,js,mjs,flow,jsx,gql,graphql}' },
        }),
    ],
})

export default webpackConfig
