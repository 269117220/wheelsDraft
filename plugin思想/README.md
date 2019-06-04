# tip
- `控制反转` - `依赖注入`
    - 上层组件只负责抽象的辅助功能，和具体的业务插件解耦
- 相关实现
    - webpack插件
    - vue中插件
    ```
    Vue插件约束：
    1. 对象
        {
            install() {

            }
        }
    2. 函数
    ```
- class中`static`声明的变量为私有
- `Object.prototype.toString.call`
