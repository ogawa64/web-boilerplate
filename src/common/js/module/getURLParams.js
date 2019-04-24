/**
 * 現在の URL から URL パラメータを取得し、連想配列にまとめて返します。
 * @return {Object} URL パラメータのデータ
 */
export default function() {
	var arg = new Object;
	var pair=location.search.substring(1).split('&');
	for(var i=0;pair[i];i++) {
		var kv = pair[i].split('=');
		arg[kv[0]]=kv[1];
	}
	return arg;
}
