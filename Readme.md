# AQフロントエンド開発テンプレート
フロントエンドのwebサイト構築用のHTMLテンプレートです。
プロジェクトに応じてカスタマイズして使用してください。

# 更新
update | message | name  
2019-0418 | init | S.Ogawa  

# リポジトリ
***リポジトリのURL***

# version
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
[yarn install](https://yarnpkg.com/ja/docs/installing-dependencies)    


**開発**
`yarn dev`  
各ファイルの変更を監視するローカルサーバが立ち上がります。  
ローカルサーバはこちらのパッケージを使っています。
[browser-sync](https://yarnpkg.com/ja/package/browser-sync)    
***-初回のみ***
`yarn dev`コマンド中に/common/template/layout/\_layout.njk,/common/css/preprocesser/index.styl,/common/js/entries/index.jsファイルをそれぞれ保存してください。  


**ビルド(サーバにアップするファイルを生成します)**
`yarn build`  
htdocsディレクトリにコンパイルされたファイルが生成されます。  
詳細は"package.json"をご確認ください。  


# 説明  
src  
開発用ディレクトリです。ローカルサーバのドキュメントルートディレクトリには、こちらを設定してください。  
(`yarn dev`コマンドで立ち上がるローカルサーバはこのディレクトリがドキュメントルートに設定されています。詳しくはconfig/bs-config.jsをご確認ください)  

htdocs  
納品用ディレクトリです。`yarn build` コマンドでこのディレクトリに納品用ファイルが生成されます。
FTPでサーバにあげる、.zipファイルで納品する場合はこちらのソースファイルを使用してください。

macro  
jsのマクロ用のディレクトリです。  

[.editorconfig](https://editorconfig.org/)  
EditorConfigは、さまざまなエディターやIDEにまたがって同じプロジェクトに取り組んでいる複数の開発者にとって、一貫したコーディングスタイルを維持するのに役立ちます。 EditorConfigプロジェクトは、コーディングスタイルを定義するためのファイルフォーマットと、エディタがファイルフォーマットを読み、定義されたスタイルを順守できるようにするテキストエディタプラグインのコレクションから構成されています。 EditorConfigファイルは読みやすく、バージョン管理システムとうまく機能します。

[yarn.lock](https://yarnpkg.com/lang/ja/docs/yarn-lock/)  
各開発者のマシン間で一貫したインストールを行うため、各パッケージのバージョンや依存関係が記載してあります。  
**このファイルは手動で更新しないください。　※yarn-cliでのみ変更可能**

[.gitignore](https://git-scm.com/docs/gitignore)  
gitignoreファイルはGitが無視すべき意図的に追跡されていないファイルを指定します。 Gitによって既に追跡されているファイルは影響を受けません。

[.gitattribute](https://git-scm.com/docs/gitattributes)

[.gulpfile.babel.js](https://gulpjs.com/docs/en/api/concepts)  
gulpの設定ファイルです。  

[package.json](http://liberty-technology.biz/PublicItems/npm/package.json.html)  
各パッケージの依存関係やスクリプトを記載してあるJSONファイルです。
