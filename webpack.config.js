const path = require('path');
// 引入自动生成 html 的插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 可以自动删除webpack目录下的dist文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  mode: 'development',
  entry: './src/main.js', // 入口
  output: {
    path: path.resolve(__dirname, 'dist'), // 出口路径 绝对路径
    filename: 'bundle.js', // 出口文件名
  },
  //   自动生成html文件并自动引入打包后的js
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // 告诉webpack使用插件时, 以我们自己的html文件作为模板去生成dist/html文件
      filename: 'index.html', // 生成文件的名称
    }),

    new CleanWebpackPlugin(), // 删除的是output path 里配置的那个输出文件的文件夹

    new VueLoaderPlugin(),
  ],
  module: {
    // loader 加载器 配置在这儿
    rules: [
      // loader的规则
      {
        test: /\.css$/, // 匹配所有的css文件
        // loader 执行的顺序： use数组里从右向左运行
        // 先用 css-loader 让webpack能够识别 css 文件的内容并打包
        // 再用 style-loader 将样式, 把css插入到dom中
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/, // 匹配执行类型的文件
        // 使用less-loader, 让webpack处理less文件, 内置还会用less翻译less代码成css内容
        // 执行的顺序 less-loader css-loader style-loader
        // less-loader 先把less代码转换成css
        // css-loader 再把css代码转换成webpack 可以识别的js代码
        // style-loader 在把css代码插入到 dom中
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
      {
        test: /\.(png|jpg|gif|jpeg)$/i,
        use: [
          {
            loader: 'url-loader', // 匹配文件, 尝试转base64字符串打包到js中
            // 配置limit, 超过8k, 不转, file-loader复制, 随机名, 输出文件
            options: {
              limit: 8 * 1024,
            },
          },
        ],
      },
      {
        // 处理字体图标的解析
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 2 * 1024,
              //小于这个 转换成based64
              //大于 直接复制 file-loader
              // 配置输出的文件名
              name: '[name].[ext]',
              // 配置输出的文件目录
              outputPath: 'fonts/',
            },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'], // 预设:转码规则(用bable开发环境本来预设的)
          },
        },
      },

      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
    ],
  },
};
// __dirname 可以用来动态获取当前文件所属目录的绝对路径
// /Users/maohuihui/Desktop/vue-base/code/day_01/03_webpack配置_修改入口和出口

// path.resolve(__dirname, "dist"),
// /Users/maohuihui/Desktop/vue-base/code/day_01/03_webpack配置_修改入口和出口/dist
