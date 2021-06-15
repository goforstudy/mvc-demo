import $ from "jquery";
import "./app1.css";
import Model from "./base/Model";
import View from "./base/View";
import Vue from 'vue';

// 其他为c

const init = (el) => {
    new Vue( {
        el: el,
        data: {n: parseInt( localStorage.getItem("n") )},
        methods: {
            add() {
                this.n++;
            },
            minus() {
                this.n--;
            },
            mul(){
                this.n *= 2;
            },
            div() {
                this.n /= 2;
            },
        },
        watch:{
            n(){
                localStorage.setItem('n', this.n)
            }
        },
        template: `
        <section>
            <div class="output">
                <span id="number">{{n}}</span>
            </div>
            <div>
                <button @click="add">+1</button>
                <button @click="minus">-1</button>
                <button @click="mul">*2</button>
                <button @click="div">÷2</button>
            </div>
        </section>
        `,

    })
}
export default init;