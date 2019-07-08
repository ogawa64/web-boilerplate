import initScrollTrigger from '../module/scrollTrigger';
import objectFitImages from 'object-fit-images';

import {initScrollParallax} from '../module/parallax';

// jQueryを使う場合はこちらを有効にしてください。
// import $ from 'jquery';


document.addEventListener('DOMContentLoaded',() => {
	initScrollTrigger();
	// initScrollParallax();
});

window.addEventListener('load',() => {
});

// jQueryの処理はこちら
// $(function(){});
