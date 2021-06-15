import $ from "jquery";
import "./app1.css";
import Model from "./base/Model";
import View from "./base/View";



// 数据放置到m
const m = new Model({data:  {
    n: parseInt( localStorage.getItem("n") ),
},
update(data){
    Object.assign(m.data, data);
    this.trigger('m:updated');
    localStorage.setItem('n', data.n)
}
});

// 其他为c

const init = (el) => {
    new View( {
        el: el,
        data: m.data,
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
        render (n) {
            n = n.n;
            if(this.el.children.length !== 0){
                this.el.empty()
            }
            $(this.html.replace('{{n}}', n)).prependTo($(this.el))
            
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
    })
}
export default init;