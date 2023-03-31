const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const Dotenv = require("dotenv-webpack");


const config = {
    watchOptions: {
      aggregateTimeout: 200,
      poll: 1000,
      ignored: ['**/files/**/*.js', '**/node_modules'],
    },
    mode: 'development',
    devtool : 'inline-source-map',
    entry: './src/index.tsx',
    output: {
          publicPath: '/',
          filename: 'bundle.js',
          path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
      extensions: ['.ts', '.js', ".tsx", ".jsx"],
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
      alias: {
        '@SRC_DIR': path.resolve(__dirname, 'src'),
      },
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
        },
        {
          test: /\.html$/,
          use: ['html-loader'],
        },
        {
              test: /\.css$/,
              use: ['style-loader', 'css-loader', 'postcss-loader'],
        },
        {
          test: /\.(scss|sass)$/,
          use: ['style-loader', 'css-loader', "sass-loader"],
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          include: [
            // path.resolve(__dirname, 'src/assets/skybox'),
            path.resolve(__dirname, 'src/assets/images'),
            path.resolve(__dirname, 'src/assets/skybox')
          ],
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                context: path.resolve(__dirname, 'src'),
                outputPath: 'assets',
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html',
      }),
      new MiniCssExtractPlugin({
          filename: 'index.css',
          chunkFilename: 'index.css',
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: 'src/assets/skybox',
            to: 'assets/skybox',
          },
        ],
      }),
      new Dotenv({
        systemvars: true,}),
    ],
    devServer: {
          historyApiFallback: true,
          static: {
              directory: path.join(__dirname, "build"),
          },
          port: 3000,
      },
};

export default config;