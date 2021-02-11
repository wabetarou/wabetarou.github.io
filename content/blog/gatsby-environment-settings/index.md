---
title: gatsby環境設定
created: 2021-01-31T14:52
updated: 2021-02-10 21:57
description: WindowsでNodeとGatsbyを導入し、Github Pagesで公開するまでの備忘録です
author: [nozzle]
tag: [gatsby, windows, node]
---

# Windows 編

## nvm-win 導入

node がもう入ってるという人は読み飛ばしていい。  
まず、nvm をインストールする。
node のバージョンを複数管理できて便利。  
[nvm-windows](https://github.com/coreybutler/nvm-windows/releases) にアクセスして、`nvm-setup.zip`をダウンロードする。
2021/01/31 時点での最新版は`1.1.7`

`nvm-setup.exe`を起動して、ウィザードに従う。
抱き合わせの怪しいソフトは無いので安心。

Finished が出たらコマンドプロンプトか Powershell を開く。  
`nvm version`と入力して自分がインストールした nvm のバージョンが出たら成功。

```powershell
PS C:¥Users¥hoge> nvm version           # nvmのバージョン表示
1.1.7
```

## node をインストール

`nvm list available`でインストールできる node を吟味しよう。  
最新版だと gatsby が対応していない可能性もあるので、LTS にあるバージョンが盤石に思える。  
選んだら、`nvm install x.y.z`でインストールする。  
自分の環境では v14.5.0 をインストールした。

```powershell
PS C:¥Users¥hoge> nvm list available    # インストール可能なnodeのversion表示
PS C:¥Users¥hoge> nvm install x.y.z     # バージョンx.y.zをインストールする
```

終わったら`nvm use x.y.x`でバージョンを選択する。
`node --version`で`x.y.z と表示されたら成功。

```powershell
PS C:¥Users¥hoge> nvm use x.y.z         # nodeのバージョン選択
PS C:¥Users¥hoge> node --version        # nodeのバージョンを表示
x.y.z
```

参考: [Node.js のバージョン管理ツール nvm の使い方](https://laboradian.com/how-to-use-nvm/)

## gatsby をインストール

### npm を用いたインストール

```powershell
PS C:¥Users¥hoge> npm install -g gatsby-cli     # gatsbyをインストール
PS C:¥Users¥hoge> npm install -g yarn     # gatsbyをインストール
```

ちょっとここから、本筋とは無関係な npm に関する全般的な備忘録が続く。

### npm とは？

ここらへんは自分も曖昧なので詳しい人の解説を見よう。

> Node.js のパッケージを管理するための CLI であり、パッケージを作成したり、NPM 上のパッケージをローカルにインストールしたり、自分のパッケージを NPM に公開したりと、Node.js の開発に欠かせないツールである。Node.js をインストールすると自動的に npm もインストールされる。

引用元: [【初心者向け】NPM と package.json を概念的に理解する](https://qiita.com/righteous/items/e5448cb2e7e11ab7d477)

`pip`が[pypi.org](https://pypi.org)で管理されてるのと同様に、`npm`は[NPM](https://www.npmjs.com)で管理されてると考えて良い。

### npm のインストール先

#### グローバルインストール

`npm`のインストール時、`-g`オプションを付けるとグローバルインストールとなり、どのディレクトリからも使用可能なコマンドとなる。  
グローバルインストールの場合、モジュールは`npm`と同じ階層のディレクトリにインストールされる。  
`nvm-windows`で`node`を導入した方は、`C:\Users\[username]\AppData\Roaming\nvm\v14.5.0\node_modules`を参照すれば、`gatsby-cli`ディレクトリが確認できるはず。

#### ローカルインストール

`-g`を**付けない**と、カレントディレクトリの`node_modules`にインストールされる。

## gatsby 構築環境を作る

サイトのフォルダを置く場所まで移動しよう。

```powershell
PS C:¥Users¥hoge> gatsby new [username].github.io https://github.com/gatsbyjs/gatsby-starter-blog       # gatsby謹製スターターキットをローカル環境に作る
```

[username]を自分の github のアカウント名にしておくと、Github Pages で連携できる。

gatsby-starter-blog 以外にも素敵なスターターがたくさんある。

なお、git が Windows に入ってない場合、このコマンドに失敗する。
入れよう。  
[自宅 PC に Git for Windows をインストールする手順](https://qiita.com/kamishi/items/5a3eed06c122f28fe2ea) という qiita の記事が分かりやすかった。

## gatsby をローカル環境で動かす

`gatsby develop`でサーバを起動

```powershell
PS C:¥Users¥hoge> gatsby develop       # ローカルのサーバ起動
```

ブラウザで`https://localhost:8000`にアクセスすると、スターターブログが公開されているはず。ひとまずおめでとう！
![blog](./blog_01.png)

## Github Pages を使って公開する

`gh-pages`を導入して Deploy する

```powershell
PS C:¥Users¥hoge> yarn add --dev gh-pages   # package.jsonのdevDependenciesにgh-pagesをインストール
PS C:¥Users¥hoge> yarn run deploy           # gh-pagesを使って[username].github.ioにdeploy
```

すると、Windows なら Github のアカウント認証のポップアップが出てくる。
メールアドレスとパスワード、もしくはアクセストークンで認証する。

```powershell
...
Published
Done in xx.xxs.
```

と表示されたら完了。

[username].github.io にアクセスすると deploy したサイトが公開されている。
おめでとう！

## トラブルシュート: ERROR #11321 PLUGIN

### 問題

`yarn run deploy`する時に、エラーが吐かれることがある。

```powershell
"gatsby-plugin-manifest" threw an error while running the onPostBootstrap lifecycle:
```

![error](./error_01.png)

### 対処法

`package-lock.json`と`node_modeles`の中身を全部消して、`npm install`する。

```powershell
PS C:¥Users¥hoge> rm node_modules
PS C:¥Users¥hoge> rm package-lock.json
PS C:¥Users¥hoge> npm install
```
