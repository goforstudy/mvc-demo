
import "./app2.css";
import Vue from "vue"

// 其他为c
const init = (el) => {
    new Vue({
        el: el,
        data: {
            index: 0
        },
        methods: {

        },
        template: `
        <section id="app2">
            <ol class="tab-bar">
                <li @click="index=0"  :class="index === 0 ? 'selected' : ''">1</li>
                <li  @click="index=1" :class="index === 1 ? 'selected' : ''">2</li>
            </ol>
            <ul class="tab-content">
                <li :class="index === 0 ? 'active' : ''">内容一</li>
                <li :class="index === 1 ? 'active' : ''">内容二</li>
            </ul>
        </section>
        `,
    })
}
export default init;