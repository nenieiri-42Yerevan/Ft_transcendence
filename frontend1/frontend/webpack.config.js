// const path = require("path");
// const HtmlWebpackPlugin = require("html-webpack-plugin");

// module.exports = {
//   mode: 'development',
//   entry: "./src/index.tsx",
//   devtool: 'inline-source-map',
//   output: {
//     filename: 'bundle.js',
//     path: path.resolve(__dirname, 'dist'),
//   },
//   module: {
//     rules: [
//         {
//           test: /\.(js|jsx)$/,
//           exclude: /node_modules/,
//           use: ["babel-loader"],
//         },
//         {
//           test: /\.(ts|tsx)$/,
//           loader: "ts-loader",
//         //   exclude: /node_modules/,
//         },
//         {
//             test: /\.(png|jp(e*)g|svg|gif)$/,
//             use: ['file-loader']
//         },
//         {
//             test: /\.css$/,
//             use: [
//               'style-loader',
//             //   "typings-for-css-modules-loader",
//             //   {
//             //     loader: 'typings-for-css-modules-loader',
//             //     options: {
//             //       modules: true,
//             //       namedExport: true,
//             //       camelCase: true,
//             //       sass: false
//             //     }
//             //   },
//               'css-loader'
//             ]
//         },
//         {
//             test: /\.(scss|sass)$/,
//             use: [
//               'style-loader',
//             //   "typings-for-css-modules-loader",
//             //   {
//             //     loader: 'typings-for-css-modules-loader',
//             //     options: {
//             //       modules: true,
//             //       namedExport: true,
//             //       camelCase: true,
//             //       sass: true
//             //     }
//             //   },
//               'css-loader',
//               'sass-loader'
//             ]
//           }
//     ],
//   },
//   resolve: {
//     extensions: ["*", ".js", ".jsx", ".ts", ".tsx"],
//   },
//   plugins: [
//     new HtmlWebpackPlugin({
//       template: path.join(__dirname, "src", "index.html"),
//     }),
//   ],
//   devServer: {
//     static: {
//       directory: path.join(__dirname, "build"),
//     },
//     port: 3000,
//   },
// };

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = {
    mode: 'development',
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
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/',
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
    })
  ],
  devServer: {
        historyApiFallback: true,
        static: {
            directory: path.join(__dirname, "build"),
        },
        port: 3000,
    },
//   devServer: {
//     contentBase: path.join(__dirname, 'dist'),
//     // compress: true,
//     port: 3000,
//   },
};