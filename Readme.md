# AQフロントエンド開発テンプレート
フロントエンドのwebサイト構築用のHTMLテンプレートです。
プロジェクトに応じてカスタマイズして使用してください。

# 更新
update | message | name  
2019-0418 | init | S.Ogawa  
2019-0708 | 各種説明を追記 | S.Ogawa

# リポジトリ  
`プロジェクトのリポジトリのURL`  

**ブランチ**  
`master`  
パッケージ版です。  

`dev-nunjukcs`  
テンプレートエンジンがNunjucksのバージョンです。  

# Version
`node v10.15.3`  
`yarn 1.15.2`  

# 開発コマンド
予め" node.js "," yarn "をインストールしてください。  
[node.js (windows)](https://qiita.com/satoyan419/items/56e0b5f35912b9374305)  
[node.js (mac)](https://qiita.com/ucan-lab/items/517ee13a2f8769ab866c)  
[yarn](https://yarnpkg.com/ja/docs/install#windows-stable)  

**インストール**  
`yarn install`  
必要なパッケージがインストールされます。  
詳細は"[package.json](http://gitlab.aquaring.jp/Aquaring/aq-html-boilerplate/blob/master/package.json)"をご確認ください。  

**開発**  
`yarn dev`  
ローカルサーバが立ち上がります。  
各種開発ファイルの保存を監視してリロードします。


***-初回のみ***  
`yarn dev`コマンド中に/common/template/layout/\_layout.pug,/common/css/preprocesser/index.styl,/common/js/entries/index.jsファイルをそれぞれ保存してください。   

HTML  
HTMLの開発はpugを採用  
・[src/common/template/config/site.json](http://gitlab.aquaring.jp/Aquaring/aq-html-boilerplate/blob/master/src/common/template/config/site.json)  

サイト共通のデータを定義（ホストネームなど）  
・[src/common/template/config/page.json](http://gitlab.aquaring.jp/Aquaring/aq-html-boilerplate/blob/master/src/common/template/config/page.json)  

ページごとのデータを定義（メタ情報など）  
・[src/common/template/layout/_layout.json](http://gitlab.aquaring.jp/Aquaring/aq-html-boilerplate/blob/master/src/common/template/layout/_layout.pug)  

HTMLのテンプレート構造を定義  
・[src/common/template/module](http://gitlab.aquaring.jp/Aquaring/aq-html-boilerplate/blob/master/src/common/template/module/)  
HTMLのモジュールパーツを定義（ヘッダーなど）  


CSS  
CSSの開発はstylusを採用  
・[src/common/css/preprocessor/base](http://gitlab.aquaring.jp/Aquaring/aq-html-boilerplate/tree/master/src/common/css/preprocessor/base)  
ベースのスタイルを定義（リセットスタイルなど）  
・[src/common/css/preprocessor/modules](http://gitlab.aquaring.jp/Aquaring/aq-html-boilerplate/tree/master/src/common/css/preprocessor/modules)  
モジュール毎のスタイルを定義（ヘッダーなど）  
・[src/common/css/preprocessor/pages](http://gitlab.aquaring.jp/Aquaring/aq-html-boilerplate/tree/master/src/common/css/preprocessor/pages)  
ページ毎のスタイルを定義（トップページなど）  
・[src/common/css/preprocessor/settings](http://gitlab.aquaring.jp/Aquaring/aq-html-boilerplate/tree/master/src/common/css/preprocessor/settings)  
各種設定を定義（変数など）  


JS  
JSはwebpackでバンドルしています。babelを採用しているのでES6以降の記述にも対応  
・[src/common/js/entries](http://gitlab.aquaring.jp/Aquaring/aq-html-boilerplate/tree/master/src/common/js/entries)  
webpackのエントリーポイントとなるのファイルを管理  
・[src/common/js/module](http://gitlab.aquaring.jp/Aquaring/aq-html-boilerplate/tree/master/src/common/js/module)  
jsのモジュールを定義  

**ビルド(サーバにアップするファイルを生成します)**  
`yarn build`  
htdocsディレクトリにコンパイルされたファイルが生成されます。  
・CSSのオートプレフィックス、圧縮  
・jsのバンドル、圧縮  
・画像ファイルの自動圧縮  
詳細は"[package.json](http://gitlab.aquaring.jp/Aquaring/aq-html-boilerplate/blob/master/package.json)"をご確認ください。  


# 説明  
**src**  
開発用ディレクトリです。ローカルサーバのドキュメントルートディレクトリには、こちらを設定してください。  
(`yarn dev`コマンドで立ち上がるローカルサーバはこのディレクトリがドキュメントルートに設定されています。詳しくは[config/bs-config.js](http://gitlab.aquaring.jp/Aquaring/aq-html-boilerplate/blob/master/config/bs-config.js)をご確認ください)  

**htdocs**  
納品用ディレクトリです。`yarn build` コマンドでこのディレクトリに納品用ファイルが生成されます。
FTPでサーバにあげる、.zipファイルで納品する場合はこちらのソースファイルを使用してください。

**macro**
jsのマクロ処理用ファイルのディレクトリです。  

**config**  
各種設定ファイルが格納してあります。  

**[.editorconfig](http://gitlab.aquaring.jp/Aquaring/aq-html-boilerplate/blob/master/.editorconfig)**  
EditorConfigは、さまざまなエディターやIDEにまたがって同じプロジェクトに取り組んでいる複数の開発者にとって、一貫したコーディングスタイルを維持するのに役立ちます。 EditorConfigプロジェクトは、コーディングスタイルを定義するためのファイルフォーマットと、エディタがファイルフォーマットを読み、定義されたスタイルを順守できるようにするテキストエディタプラグインのコレクションから構成されています。 EditorConfigファイルは読みやすく、バージョン管理システムとうまく機能します。  

**yarn.lock**  
各開発者のマシン間で一貫したインストールを行うため、各パッケージのバージョンや依存関係が記載してあります。  
**このファイルは手動で更新しないください。　※yarn-cliでのみ変更可能**  

**[.gitignore](https://git-scm.com/docs/gitignore)**  
gitignoreファイルはGitが無視すべき意図的に追跡されていないファイルを指定します。 Gitによって既に追跡されているファイルは影響を受けません。  

**[.gulpfile.babel.js](http://gitlab.aquaring.jp/Aquaring/aq-html-boilerplate/blob/master/gulpfile.babel.js)**  
gulpのタスクの設定ファイルです。  

**[package.json](http://gitlab.aquaring.jp/Aquaring/aq-html-boilerplate/blob/master/package.json)**  
各パッケージの依存関係やスクリプトを記載してあるJSONファイルです。  
