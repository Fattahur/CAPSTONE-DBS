
// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

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
// const WorkboxPlugin = require('workbox-webpack-plugin'); 

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
//     new WorkboxPlugin.GenerateSW({
//       clientsClaim: true,
//       skipWaiting: true,
//       maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // ⬅️ Optional, bisa dihapus
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

//BISA

// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
// const WorkboxPlugin = require('workbox-webpack-plugin');

// module.exports = {
//   entry: './src/scripts/app.js',
//   output: {
//     filename: 'bundle.js',
//     path: path.resolve(__dirname, 'dist'),
//     clean: true,
//   },
//   module: {
//     rules: [
//       {
//         test: /\.css$/i,
//         use: ['style-loader', 'css-loader'],
//       },
//       {
//         test: /\.(ttf|otf|eot|woff2?|svg)$/i,
//         type: 'asset/resource',
//         generator: {
//           filename: 'fonts/[name][ext][query]', // Output ke folder fonts/
//         },
//       },
//     ],
//   },
//   plugins: [
//     new HtmlWebpackPlugin({
//       template: './src/index.html',
//     }),
//     new CopyWebpackPlugin({
//     patterns: [
//       {
//         from: path.resolve(__dirname, 'public'),
//         to: '.', 
//       },
//       {
//         from: path.resolve(__dirname, 'public/manifest.json'),
//         to: 'site.webmanifest',
//       },
//       {
//         from: path.resolve(__dirname, 'public/images'),
//         to: 'images', // pastikan folder images ikut disalin
//       },
//     ],
//   }),

//     new WorkboxPlugin.GenerateSW({
//       clientsClaim: true,
//       skipWaiting: true,
//       cleanupOutdatedCaches: true,
//       maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
//     }),
//   ],
//   devServer: {
//     static: {
//       directory: path.resolve(__dirname, 'dist'),
//     },
//     open: true,
//   },
//   mode: 'development',
// };

// BISA














// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
// const WorkboxPlugin = require('workbox-webpack-plugin');

// module.exports = {
//   entry: './src/scripts/app.js',
//   output: {
//     filename: 'bundle.js',
//     path: path.resolve(__dirname, 'dist'),
//     clean: true,
//   },
//   module: {
//     rules: [
//       {
//         test: /\.css$/i,
//         use: ['style-loader', 'css-loader'],
//       },
//       {
//         test: /\.(ttf|otf|eot|woff2?|svg)$/i,
//         type: 'asset/resource',
//         generator: {
//           filename: 'fonts/[name][ext][query]',
//         },
//       },
//     ],
//   },
//   plugins: [
//     new HtmlWebpackPlugin({
//       template: './src/index.html',
//     }),
//     new CopyWebpackPlugin({
//       patterns: [
//         {
//           from: path.resolve(__dirname, 'public'),
//           to: '.', // Salin semua isi public ke dist/
//         },
//         {
//           from: path.resolve(__dirname, 'public/manifest.json'),
//           to: 'site.webmanifest', // Rename manifest.json jika perlu
//         },
//       ],
//     }),
//     new WorkboxPlugin.GenerateSW({
//       clientsClaim: true,
//       skipWaiting: true,
//       cleanupOutdatedCaches: true,
//       maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
//     }),
//   ],
//   devServer: {
//     static: {
//       directory: path.resolve(__dirname, 'dist'),
//     },
//     open: true,
//   },
//   mode: 'development',
// };


const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  entry: './src/scripts/app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(ttf|otf|eot|woff2?|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext][query]',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'public'),
          to: '.', // Salin semua isi public ke dist/
        },
        {
          from: path.resolve(__dirname, 'public/manifest.json'),
          to: 'site.webmanifest', // Rename manifest.json jika perlu
        },
      ],
    }),
    ...(isProduction
      ? [
          new WorkboxPlugin.GenerateSW({
            clientsClaim: true,
            skipWaiting: true,
            cleanupOutdatedCaches: true,
            maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
          }),
        ]
      : []),
  ],
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    open: true,
  },
  mode: isProduction ? 'production' : 'development',
};










// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const WorkboxPlugin = require('workbox-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');

// const isProduction = process.env.NODE_ENV === 'production';

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
//         {
//           from: path.resolve(__dirname, 'public'),
//           to: '.', // copy public/ ke dist/
//         },
//       ],
//     }),
//     ...(isProduction
//       ? [
//           new WorkboxPlugin.GenerateSW({
//             clientsClaim: true,
//             skipWaiting: true,
//             cleanupOutdatedCaches: true,
//             maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
//           }),
//         ]
//       : []),
//   ],
//   devServer: {
//     static: {
//       directory: path.resolve(__dirname, 'dist'), // penting untuk manifest.json
//     },
//     open: true,
//   },
//   mode: isProduction ? 'production' : 'development',
// };



































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
