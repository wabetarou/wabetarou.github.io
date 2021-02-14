---
title: gatsbyのimageについて 
created: 2021-02-09 23:30
updated: 2021-02-10 21:58
description: デフォルトの画像タグを変更する
author: [konnyaku]
tag: [gatsby, computer]
---

### きっかけ
markdownに画像をアップロードしても自由にクラスを指定できず細かい設定ができない!!!

### 解決策
markdownの情報を画像にrenderしているのはどうやらこの二つのプラグインのようだ。
- `gatsby-remark-images`
- `gatsby-plugin-sharp`

そのうち実際にhtmlのコードに変換しているプラグインを見つける。gatsbyのいいところは画像を自動で最適化してくれるところらしいが、このプラグインで最適化をしていそうだ。

`gatsby-plugin-sharp`では`gatsby-config.js`で設定したものを元に`<img>`タグにパラメータを返す。このプラグインが最適化をしている。

`gatsby-remark-images`では`![]()`のコードを読み込んでrenderしてくれている。なのでこっちを書き換えれば、クラスを指定することができそうだ。

調べてみると`wrapperStyle`というoptionがあり、そこでstyleの指定ができる。これを追加すれば、classを指定せずに済みそうだ。