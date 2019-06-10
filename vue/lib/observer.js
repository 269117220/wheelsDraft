class Observer {
    constructor(data) {
        return this.dealData(data);
    }
    dealData(data) {
        if(Object.prototype.toString.call(data) !== '[object Object]') {
            return data;
        }
        Object.keys(data).forEach(key => {
            data[key] = this.dealData(data[key]);
        });
        return this.proxyData(data);
    }
    proxyData(data) {
        let dep = new Dep();
        return new Proxy(data, {
            get(target, key) {
                //在complie时，将创建的watcher加入其依赖项
                if(Dep.target) {
                    dep.subs.push(Dep.target);
                }
                return Reflect.get(target, key);
            },
            set(target, key, value) {
                let oldVal = Reflect.get(target, key);
                if(oldVal != value) {
                    let valueRes = Reflect.set(target, key, value);
                    dep.notify();  //触发依赖的相关监听器
                    return valueRes;
                }
            }
        })        
    }
}

//记录数据的相关依赖
function Dep() {
    this.subs = [];
}
Dep.target = null;
Dep.prototype.addSub = function(watcher){
    this.subs.push(watcher);
}
Dep.prototype.notify = function() {
    this.subs.forEach(watcher => {
        watcher.update();
    });
}