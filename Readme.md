# AQフロントエンド開発テンプレート
フロントエンドのwebサイト構築用のHTMLテンプレートです。
プロジェクトに応じてカスタマイズして使用してください。

# 更新
# update | message | name
2019-0418 | init | S.Ogawa

# 説明
[/src]
開発用ディレクトリです。
ローカルサーバのドキュメントルートディレクトリには、こちらを設定してください。

[httpdocs]
納品用ディレクトリです。
`yarn build` コマンドでこのディレクトリに納品用ファイルが生成されます。
FTPでサーバにあげる、.zipファイルで納品する場合はこちらのソースファイルを使用してください。

[.editorconfig](https://editorconfig.org/)
EditorConfigは、さまざまなエディターやIDEにまたがって同じプロジェクトに取り組んでいる複数の開発者にとって、一貫したコーディングスタイルを維持するのに役立ちます。 EditorConfigプロジェクトは、コーディングスタイルを定義するためのファイルフォーマットと、エディタがファイルフォーマットを読み、定義されたスタイルを順守できるようにするテキストエディタプラグインのコレクションから構成されています。 EditorConfigファイルは読みやすく、バージョン管理システムとうまく機能します。

[yarn.lock](https://yarnpkg.com/lang/ja/docs/yarn-lock/)
各開発者のマシン間で一貫したインストールを行うため、各パッケージのバージョンや依存関係が記載してあります。
### このファイルは手動で更新しないください。　※yarn-cliでのみ変更可能

[.gitignore](https://git-scm.com/docs/gitignore)
gitignoreファイルはGitが無視すべき意図的に追跡されていないファイルを指定します。 Gitによって既に追跡されているファイルは影響を受けません。

[.gitattribute](https://git-scm.com/docs/gitattributes)

# node.js yarnのバージョン
`node v10.15.3`
`yarn 1.15.2`
