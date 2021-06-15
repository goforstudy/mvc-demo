import $ from "jquery";
import "./app3.css";

const html = `
<section id="app3">
<div class="square"></div>
</section>
`
const $element = $(html).appendTo($('body>.page'));

const $square = $("#app3 .square");
localStorage.getItem( "app3.active") ? $square.addClass( 'active' ): $square.removeClass( 'active' ) ;
$square.on("click", ()=>{
    if($square.hasClass('active')){
        localStorage.removeItem("app3.active");
        $square.removeClass("active");
    } else {
        localStorage.setItem("app3.active", 'active');
        $square.addClass("active");
    }
})