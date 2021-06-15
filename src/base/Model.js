class Model{
    constructor(options){
        ['data', 'update', 'create', 'delete', 'get'].forEach(
            key => {
                if(key in options){
                    this[key] = options[key]
                }
            }
        )
        this.data = options.data;
        this.update = options.update;
    }
    create() {
        // ?. 可选链
        console?.error?.("未实现 create");
    }
    delete() {
        console?.error?.("未实现 delete");
    }
    update(data) {
        console?.error?.("未实现 update");
    }
    get() {
        console?.error?.("未实现 get");
    }
}

export default Model;