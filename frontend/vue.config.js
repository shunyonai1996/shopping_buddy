module.exports = {
    configureWebpack: {
      resolve: {
        alias: {
          'vue$' : 'vue/dist/vue.esm.js'
        },
        extensions: ['.js', '.ts', '.vue', '.json']
      },
      module: {
        rules: [
          {
            test: /\.ts$/,
            loader: 'ts-loader',
            options: {
              appendTsSuffixTo: [/\.vue$/],
              configFile: 'tsconfig.json',
            },
            exclude: /node_modules/,
          },
        ],
      },
      entry: {
        app: './src/main.ts'
      },
    },
  };