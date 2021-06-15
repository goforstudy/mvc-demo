import $, { valHooks } from "jquery";
import "./app1.css";

const eventBus = $({});

// 数据放置到m
const m = {
    data: {
        n: parseInt( localStorage.getItem("n") ),
    },
    create() {},
    delete() {},
    update(data) {
        Object.assign(m.data, data);
        eventBus.trigger('m:updated');
        localStorage.setItem('n', data.n)
    }
}
// 视图放置到v
const v = {
    el: null,
    html: `
    <div>
        <div class="output">
            <span id="number">{{n}}</span>
        </div>
        <div>
            <button id="add1">+1</button>
            <button id="minus1">-1</button>
            <button id="mul2">*2</button>
            <button id="divide2">÷2</button>
        </div>
    </div>
    `,
    init(el){
       v.el = $(el);
    },
    render (n) {
        if(v.el.children.length !== 0){
            v.el.empty()
        }
        $(v.html.replace('{{n}}', n)).prependTo($(v.el))
        
    }
}
// 其他为c
const c = {
    init(el) {
        v.init(el);
        v.render(m.data.n);
        c.autoBindEvents();
        eventBus.on(
            'm:updated',
            () => {
                v.render(m.data.n);
            }
        )
    },
    events: {
        'click #add1': 'add',
        'click #minus1': 'minus',
        'click #mul2': 'mul',
        'click #div': 'div',
    },
    add() {
        m.update({n: m.data.n + 1})
    },
    minus() {
        m.update({n: m.data.n - 1})
    },
    mul(){
        m.update({n: m.data.n * 2})
    },
    div() {
        m.update({n: m.data.n / 2})
    },
    autoBindEvents() {
        Object.keys(c.events).forEach(
            item => {
                const arr = item.split(' ');
                v.el.on(arr[0], arr[1], c[c.events[item]]);
            }
        )
    }
}

export default c;