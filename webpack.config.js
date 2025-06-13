
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/scripts/app.js', 
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'public'),
    },
    open: true,
  },
  
  mode: 'development',
};


// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin'); // ✅ tambahkan

// module.exports = {
//   entry: './src/scripts/app.js',

//   output: {
//     path: path.resolve(__dirname, 'dist'),
//     publicPath: '/BerbagiCeritaUnik/', // penting untuk GitHub Pages
//     filename: 'bundle.js',
//     clean: true,
//   },

//   module: {
//     rules: [
//       {
//         test: /\.css$/i,
//         use: ['style-loader', 'css-loader'],
//       },
//       {
//         test: /\.(png|jpe?g|gif|svg)$/i, // ✅ tambahkan ini agar gambar importable juga bisa
//         type: 'asset/resource',
//         generator: {
//           filename: 'images/[name][ext]',
//         },
//       },
//     ],
//   },

//   plugins: [
//     new HtmlWebpackPlugin({
//       template: './src/index.html',
//     }),

//     // ✅ Ini untuk menyalin semua isi folder 'public' ke 'dist'
//     new CopyWebpackPlugin({
//       patterns: [
//         {
//           from: path.resolve(__dirname, 'public'),
//           to: '.', // salin ke root dist
//         },
//       ],
//     }),
//   ],

//   devServer: {
//     static: {
//       directory: path.resolve(__dirname, 'public'),
//     },
//     open: true,
//   },

//   mode: 'development',
// };




















// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');

// module.exports = {
//   entry: './src/scripts/app.js', 
//   output: {
//     filename: 'main.js',
//     path: path.resolve(__dirname, 'dist'),
//     clean: true,
//   },
//   module: {
//     rules: [
//       {
//         test: /\.css$/i,
//         use: ['style-loader', 'css-loader'],
//       },
//     ],
//   },
//   plugins: [
//     new HtmlWebpackPlugin({
//       template: './src/index.html',
//     }),
//     new CopyWebpackPlugin({
//       patterns: [
//         { from: 'public', to: '.' }, 
//       ],
//     }),
//   ],
//   devServer: {
//     static: {
//       directory: path.resolve(__dirname, 'public'),
//     },
//     open: true,
//   },
//   mode: 'development',
// };
