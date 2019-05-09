/**
 * SNS のシェアリンクを生成するメソッドを提供するクラス。
 */
export default class Share {
	/**
	 * 特に何もしません。
	 */
	constructor() {}

	/**
	 * Facebook のシェアリンク文字列を返す関数です。
	 * @param {String} url シェアしたい URL(引数を省略すると現在開いているページの URL)
	 * @return 引数で指定した URL の Facebook シェアリンク
	 */
	facebook(url=location.href) {
		return `//www.facebook.com/sharer/sharer.php?u=${url}`;
	}

	/**
	 * Twitter のシェアリンク文字列を返す関数です。
	 * @param {String} url シェアしたい URL(引数を省略すると現在開いているページの URL)
	 * @param {String} text シェアしたいテキストメッセージ(引数を省略すると現在開いているページのタイトル)
	 * @param {Array} hashtags シェアしたいハッシュタグ文字列のリスト
	 * @return 引数で指定した情報の Twitter シェアリンク
	 */
	twitter(url=location.href, text=`[${encodeURI(window.document.title.replace(/\s/g,''))}]`, hashtags=[]) {
		return `twitter.com/intent/tweet?url=${url}&amp;text=${text}&amp;hashtags=${hashtags.join(',')}`;
	}

	/**
	 * Google+ のシェアリンク文字列を返す関数です。
	 * @param {String} url シェアしたい URL(引数を省略すると現在開いているページの URL)
	 * @return 引数で指定した URL の Google+ シェアリンク
	 */
	googleplus(url=location.href) {
		return `//plus.google.com/share?url=${url}`;
	}

	/**
	 * Mixi のシェアリンク文字列を返す関数です。
	 * @param {String} text シェアしたいテキスト(引数を省略するとページタイトルと URL)
	 * @return 引数で指定したテキストの Mixi シェアリンク
	 */
	mixi(text=`[${encodeURI(window.document.title.replace(/\s/g,''))}]  ${location.href}`) {
		return `//mixi.jp/simplepost/voice?status=${text}`;
	}
}
