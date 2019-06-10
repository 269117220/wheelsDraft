# tip
- `Proxy`处理后需手动替换原对象
- `Reflect`执行默认操作
- 闭包
- 职责分明：
    - dep：管理特定key相关的依赖项（和脏检查的区别）
    - watcher：对应的依赖项
    - compile：找到依赖关系，将依赖项和对应data数据做关联