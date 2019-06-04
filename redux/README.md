# tip
- 事件的注册 & 获取句柄用于注销事件
- compose对中间件的组合`装饰者模式 & 洋葱圈`
- react的HOC应用
```
class Input extend Component {
    render() {
        return `
        <span>test</span>
        `
    }
}
//高阶组件--中间件--函数
function(WrappedComponent) {
    return class extends Component {
        render() {
            //特定处理
            return <WrappedComponent />
        }
    }
}

//多个组件时就需要使用compose处理
compose(F1, F2)(Input)    //返回最终包装好后的组件

```
