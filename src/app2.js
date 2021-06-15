import $ from "jquery";
import "./app2.css";
const eventBus = $({});

const localKey = 'app2.index';
// 数据放置到m
const m = {
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
}
// 视图放置到v
const v = {
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
    init(el){
       v.el = $(el);
    },
    render (index) {
        if(v.el.children.length !== 0){
            v.el.empty()
        }
        $(v.html(parseInt(index))).prependTo($(v.el))
        
    }
}

// 其他为c
const c = {
    init(el) {
        v.init(el);
        v.render(m.data.index);
        c.autoBindEvents();
        eventBus.on(
            'm:updated',
            () => {
                v.render(m.data.index);
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
        Object.keys(c.events).forEach(
            item => {
                const arr = item.split(' ');
                v.el.on(arr[0], arr[1], c[c.events[item]]);
            }
        )
    }
}
export default c;