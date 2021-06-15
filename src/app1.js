import $, { contains, valHooks } from "jquery";
import "./app1.css";
import Model from "./base/Model";


const eventBus = $({});

// 数据放置到m
const m = new Model({data:  {
    n: parseInt( localStorage.getItem("n") ),
},
update: (data) => {
    Object.assign(m.data, data);
    eventBus.trigger('m:updated');
    localStorage.setItem('n', data.n)
}
});

// 其他为c
const view = {
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
            <button id="div">÷2</button>
        </div>
    </div>
    `,
    init(el) {
        view.el = $(el);
        view.render(m.data.n);
        view.autoBindEvents();
        eventBus.on(
            'm:updated',
            () => {
                view.render(m.data.n);
            }
        )
    },    
    render (n) {
        if(view.el.children.length !== 0){
            view.el.empty()
        }
        $(view.html.replace('{{n}}', n)).prependTo($(view.el))
        
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
        Object.keys(view.events).forEach(
            item => {
                const arr = item.split(' ');
                view.el.on(arr[0], arr[1], view[view.events[item]]);
            }
        )
    }
}

export default view;