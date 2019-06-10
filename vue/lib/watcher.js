class Watcher {
    constructor(vm, key, callBack) {
        this.vm = vm;
        this.key = key;
        this.callBack = callBack;
        this.value = this.get();
    }
    /**
     * key值变更时，由set事件触发
    */
    update() {
        const val = this.vm.data[this.key];
        const oldVal = this.value;
        if(val !== oldVal) {
            //更新当前值
            this.value = val;
            //调用订阅者事件，进行相关更新
            this.callBack(val);
        }
    }
    get() {
        Dep.target = this;
        //初始化Watcher时，执行get方法
        //通过Dep.target获取当前watcher实例，装载入dep依赖
        const initVal = this.vm.data[this.key];
        Dep.target = null;
        return initVal;
    }
}