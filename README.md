### react/vue ssr 工具

#### install

安装(ps: 依赖 chromium, 安装过程需要翻墙)

```
npm install -g puppeteer-ssr-cli
```

#### usage

在项目的根目录上直接运行命令即可

```
puppeteer-ssr
```

#### examples

- react 项目

  在 `react-demo`下，执行`npm run build`, 然后执行`puppeteer-ssr`即可

- vue 项目
  在 `vue-demo`下，执行`npm run build`, 然后执行`puppeteer-ssr`即可

#### params

puppeteer-ssr 会去执行命令根目录下读取`.ssrconfig.json`文件，可按需配置参数

| 参数      |  类型   |                   说明                   |
| --------- | :-----: | :--------------------------------------: |
| PORT      | number  |        服务端口号(default: 8888)         |
| OUTPUTDIR | string  |      ssr 输出目录(default: "dist")       |
| INPUTDIR  | string  | node 监听的静态资源目录(default: "dist") |
| routes    |  Array  |     需要 ssr 的理由(default: ["/"])      |
| headless  | boolean |       headless mode(default: true)       |
| HASH      | boolean |         路由模式(default: true)          |

### License

MIT
