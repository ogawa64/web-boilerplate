import ScrollTrigger from 'scrolltrigger-classes';
/**
 * ScrollTrigger の処理を開始します。
 * 対象要素がスクロールインしたとき「is-scroll-visible」クラスが付与されるようになります。
 * 対象要素がスクロールインしたとき「data-scroll-showCallback」属性で指定した関数を実行することが出来るようになります。
 * 対象要素がスクロールインしていないとき「is-scroll-hidden」クラスが付与されるようになります。
 * 対象要素がスクロールアウトしたとき「data-scroll-hideCallback」属性で指定した関数を実行することが出来るようになります。
 * @param {Object} scope スクロールイン/アウトした時に実行したい関数の参照
 * @return {ScrollTrigger} 初期化時に生成された ScrollTrigger クラスのインスタンス
 */
export default (scope={}) => {
	const trigger = new ScrollTrigger({
		toggle: {
			visible: 'is-scroll-visible',
			hidden: 'is-scroll-hidden'
		},
		offset: {
			x: 0,
			y: 0
		},
		addHeight: false,
		centerVertical: true,
		once: false
	}, document.body, window);
	trigger.callScope = scope;
	return trigger;
};
