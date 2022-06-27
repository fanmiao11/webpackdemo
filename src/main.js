
import './banner.js';
import './tabs.js';

// jquery
import $ from 'jquery'
$('#swiper').css('background-color', 'red');

// 引入css文件
// import './styles/index.css'
// 引入less文件
import './styles/index.less';

// index.js
import imgUrl from './assets/1.gif';

let img = document.createElement('img');
img.src = imgUrl;
document.body.appendChild(img);

// 引入字体图标文件
import './assets/fonts/iconfont.css'