//上层容器组件，【抽象】
class App {
    static modules = []
    constructor(options) {
        this.options = options;
        this.mounted();
    }
    mounted() {
        this.mountModules();
        //...  
    }
    //通过use注入插件
    static use(modules) {
        modules.forEach(module => App.modules.push(module));
    }
    mountModules() {
        App.modules.forEach(module => {
            //将app实例注入到插件中
            //支持插件为带有install属性的对象 || 函数
            if(Object.prototype.toString.call(module) == '[object Function]') {
                module(this)
            }else if(module.install && Object.prototype.toString.call(module.install) == '[object Function]') {
                module.install(this);
            }
        });
    }
}

//业务插件，【具体】
let addPlugin1 = {
    install(app) {
        console.log('addPlugn...1...', app.options.plugin1.name);
    }
}
let addPlugin2 = {
    install(app) {
        console.log('addPlugn...2...', app.options.plugin2.name);
    }
}

/**
 * 
 */
App.use([addPlugin1, addPlugin2]);
new App({
    plugin1: {name:'plugin1'},
    plugin2: {name:'plugin2'}
});