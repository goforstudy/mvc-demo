import $ from "jquery";
import "./app2.css";
import EventBus from "./base/EventBus";
import Model from "./base/Model";
import View from "./base/View";
const eventBus = new EventBus();

const localKey = 'app2.index';
// 数据放置到m
const m = new Model(
    {
    data: {
        index: parseInt( localStorage.getItem(localKey) || 0),
    },
    create() {},
    delete() {},
    update(data) {
        Object.assign(m.data, data);
        eventBus.trigger('m:updated');
        localStorage.setItem(localKey, data.index)
    }
})

// 其他为c
const init = (el) => {
    new View({
        el: el,
        data: m.data,
        eventBus: eventBus,
        html: (index) => { return `
        <div>
            <ol class="tab-bar">
                <li class="${index === 0 ? 'selected': ''}" data-index=0>1</li>
                <li class="${index === 1 ? 'selected': ''}" data-index=1>2</li>
            </ol>
            <ul class="tab-content">
                <li class=${index === 0 ? 'active': ''}>内容一</li>
                <li class=${index === 1 ? 'active': ''}>内容二</li>
            </ul>
        </div>
        `
        },
        render ({index}) {
            if(this.el.children.length !== 0){
                this.el.empty()
            }
            $(this.html(parseInt(index))).prependTo($(this.el))
            
        },
        // init(el) {
        //     this.el = $(el);
        //     this.render(m.data.index);
        //     this.autoBindEvents();
        //     eventBus.on(
        //         'm:updated',
        //         () => {
        //             this.render(m.data.index);
        //         }
        //     )
        // },
        events: {
            'click .tab-bar li': 'changeStatus',
        },
        changeStatus(e) {
            const index = e.target.dataset.index
            m.update({index: index})
        },
    })
}
export default init;