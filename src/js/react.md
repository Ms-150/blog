# React 源码

## 下载源码

package.json

## 核心 api

- packages/react
- packages/react-dom
- packages/react-reconciler
- packages/scheduler

串联整个流程

- react 项目初始化
  - ReactDOM.render
  - createRoot
- 数据更新是怎么触发的
  - = this.setState
  - const [ , update]= useState()
  - forupdate
- 基本 api 的使用方式
  - hooks
  - useState
  - useReducer
  - useId

## JSX

```js
const element = {
    <div>hello</div>
}
```

Babel 进行编译 借助 `@babel/plugin-transform-react-jsx`

