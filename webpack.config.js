const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  entry: {
    index: './src/js/index.js', 
    infos: './src/js/infos.js',
    search: './src/js/search.js',  
},
output: {
    filename: '[name].bundle.js', 
    path: path.resolve(__dirname, 'dist'), 
    clean: true, 
},
  devServer:{
    static: 'dist',
    hot: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
      chunks: ['index'],
    }),
    new MiniCssExtractPlugin({
      filename: 'styles.css', 
    }),
    new HtmlWebpackPlugin({
      template: './src/infos.html',  
      filename: 'infos.html',
      chunks: ['infos'],
                     
  }),
  new HtmlWebpackPlugin({
    template: './src/search.html',  
    filename: 'search.html',
    chunks: ['search'],
                   
}),
  ],
  stats: {
    warnings: false,
  },
  ignoreWarnings: [
    {
      message: /deprecation/i,
    },
  ],
  module: {
    rules: [
      {
        test: /\.(scss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: () => [
                  require('autoprefixer'),
                ],
              },
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash].[ext]',
              outputPath: 'images/',
            },
          },
        ],
      },
    ],
  },
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
    ],
  },
};