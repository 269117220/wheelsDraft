class Compile {
    constructor(vm) {
        this.vm = vm;   
        this.init();     
    }
    init() {
        let root = document.getElementById(this.vm.$el);
        let nodes = root.childNodes;
        this.complieNode(nodes);
    }
    complieNode(nodes) {
        [...nodes].forEach(node => {
            //元素节点
            if(node.nodeType == 1) {
                let attrs = node.attributes;
                [...attrs].forEach(attr => {
                    if(attr.name == 'v-modal') {
                        let attrKey = attr.value.match(/\{([^}]*)\}/)[1];
                        let oldValue = this.vm.data[attrKey];
                        //初始化
                        node.value = oldValue;
                        //事件监听dom-->data
                        node.addEventListener('input', e => {
                            let oldValue = this.vm.data[attrKey];
                            let value = e.target.value;
                            if(oldValue !== value) {
                                this.vm.data[attrKey] = value;
                            }
                        });
                        //data-->dom
                        new Watcher(this.vm, attrKey, val => {
                            node.value = val;
                        });
                        //删除自定义信息
                        node.removeAttribute(attr.name);
                    }
                });
                this.complieNode(node.childNodes);
                return;
            }
            //文本节点
            if(node.nodeType == 3) {
                if(/\{\{([^}]*)\}\}/.test(node.textContent)) {
                    let key = node.textContent.match(/\{\{([^}]*)\}\}/)[1];
                    node.textContent = this.vm.data[key];
                    new Watcher(this.vm, key, val => {
                        node.textContent = val;
                    });
                }
            }
        })
    }

}