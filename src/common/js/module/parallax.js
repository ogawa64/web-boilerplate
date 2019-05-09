/**
 * パララックススクロール効果を付与します。
 */

const scroll = {
	y    : window.scrollY || window.pageYOffset,
	easeY: window.scrollY || window.pageYOffset
};

/**
* @desc 要素に対してパララックス効果を当てます。
* パララックス効果を付与したい要素に".js-js-parallax-scroll"クラスを付与してください。
* @param {Object} _el パララックススクロールを有効にするオブジェクト
*/

class ScrollParallaxElement {
	constructor(_el) {
		this.parallaxDist = 1000;
		this.scale = 1.1;
		this.movePercent = 0.2;
		this.el = _el;
		this.direction = _el.dataset.direction === 'scroll' ? -1 : 1; // デフォルトでスクロール方向
		this.halfHeight = _el.getBoundingClientRect().height * .5;
	}

	update(_scroll) {
		const rect = this.el.getBoundingClientRect();
		const centerY = (scroll.y + rect.top) + this.halfHeight;// 要素の中心 (scrollY + rect.top) = $e.offset().top
		const dist = (_scroll + window.innerHeight * .5) - centerY;// 要素中心から画面中心までの距離
		const clampedDist = Math.max(Math.min(dist, this.parallaxDist), -this.parallaxDist);// 最大距離で+-範囲制限
		const normalizedDist = clampedDist / this.parallaxDist;
		const y = (normalizedDist * this.movePercent * 100 * this.direction).toFixed(2);// 0 ~ 1 から 0 ~ 100 にして、小数点第二位で丸める

		// scale() で拡大させて、はみ出た部分を利用して動かす
		this.el.setAttribute('style', 'transform: scale(' + this.scale + ') translate3d(0px,' + y + '%,0px);');
	}
}


/**
* @desc パララックススクロールが有効なページの初期化
* @param {String} _query パララックススクロールを有効にする要素のクラス
*/

class ScrollParallax {
	constructor(_query) {
		const elements = document.querySelectorAll(_query);
		this.elements = Array.from(elements).map(_e => new ScrollParallaxElement(_e));
	}

	update(_scroll) {
		for(const _e of this.elements) {
			_e.update(_scroll);
		}
	}
}

export const initScrollParallax = () => {
	const parallax = new ScrollParallax('.js-parallax-scroll');

	const assumedFps = 60;
	const frameInterval = 1000 / assumedFps;
	let time = performance.now();
	let lastTime = time;
	let deltaTime = 0;

	const update = () => {
		requestAnimationFrame(update);

		// ブラウザ間のFPSの違いを吸収して同じ速度で動かす
		lastTime = time;
		time = performance.now();
		deltaTime = time - lastTime;
		const spd = deltaTime / frameInterval;

		// スクロール量をゆっくり追いかける
		scroll.y = window.scrollY || window.pageYOffset;
		scroll.easeY += (scroll.y - scroll.easeY) * .05 * spd;

		parallax.update(scroll.easeY);
	};

	update();
};
