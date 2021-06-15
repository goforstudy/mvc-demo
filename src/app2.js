import $ from "jquery";
import "./app2.css";
import Model from "./base/Model";
const eventBus = $({});

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
const view = {
    el: null,
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
    render (index) {
        if(view.el.children.length !== 0){
            view.el.empty()
        }
        $(view.html(parseInt(index))).prependTo($(view.el))
        
    },
    init(el) {
        view.el = $(el);
        view.render(m.data.index);
        view.autoBindEvents();
        eventBus.on(
            'm:updated',
            () => {
                view.render(m.data.index);
            }
        )
    },
    events: {
        'click .tab-bar li': 'changeStatus',
    },
    changeStatus(e) {
        const index = e.target.dataset.index
        m.update({index: index})
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