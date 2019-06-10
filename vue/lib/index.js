class Vue {
    constructor(options) {
        this.options = options;
        this.data = options.data;
        this.$el = options.el;
        this.init();
        setTimeout(() => {
            this.data.msg = 'js改变data数据~';
        }, 3000);
    }
    init() {
        this.data = new Observer(this.data);
        new Compile(this);
    }
}