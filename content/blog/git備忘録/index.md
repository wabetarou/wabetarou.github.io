---
title: git備忘録
date: 2021-01-31T13:52
updated: 2021-01-31T13:54
description: 忘れがちなgitのコマンドを多数収録ｖ
---

## 初期設定
### 名前,メアド,UIの色,エディタの登録
```bash
git config --global user.name "Yamada Hanako"
git config --global user.email "yamahana@takaka.com"
git config --global color.ui auto
git config --global core.editor "vim"
```
### 登録した情報の確認
```bash
git config -l
```
## 使い方
### リポジトリ初期化
```bash
git init
```
### 版管理の対象を登録
```bash
git add index.html
git add . #現在のディレクトリ以下全部を登録
git ls-files		# git管理下のファイルを一覧表示
```
### 最初のコミット
```bash
git commit -m "first commit"
```
### 変更の記録
```bash
# index.htmlを適当に変更する
git diff	#最新コミットリクエストと現在のデータを比較
git add index.html	#最新コミットリクエストに現在のデータをリクエスト
git diff	#出力は空になる
```
### 変更点の確認
`git commit`する前に、変更点を確認しよう
```bash
git diff HEAD	#最新コミットと現在のデータを比較
```

### コミットする
```bash
git add -u	#gitで版管理しているすべてのファイルの現在の状態を次のコミットに記録させる
git commit	#コミット
```

### gitのログメッセージを書く
```bash
日付表示
	
各記事の前に日付をyyyy/mm/ddの形式で表示するようにした。
# Please enter the commit message for your changes. Lines starting
# with '#' will be ignored, and an empty message aborts the commit.
# On branch master
# Changes to be committed:
#	modified index.html
#
```
一行目は変更点を1行に要約
二行目は空行
三行目に詳しい記述

が鉄板らしい

### 怒られる
```bash
Warning: commit message did not conform to UTF-8
You may want to amend it after fixing the message, or set the config
variable i18n.commitencoding to the encoding your pqoject uses.
[master XXXXXX] .....文字化け....
```
### vimrcを直す
参考:[Gitコミット時の文字化け(MacでVimによるコミット)](https://qiita.com/takasianpride/items/0d68fcbbcc3aaf22cf9a "Gitコミット時の文字化け(MacでVimによるコミット)")
~/.vimrcに以下の内容を追加
```bash
set encoding=utf8
set fenc=utf-8
```
うまくいかない....

参考:[Git コミットログの文字化けではまる](http://wadahiro.hatenablog.com/entry/20090506/1241622572)
```bash
" set fileencodings=iso-2022.jp,euc-jp,utf-8,ucs-2,cp912,sjis
set fileencoding=utf-8
```
fileencodingの候補が多すぎて勘違いされたらしい。
UTF-8だけにしたら文字化け消えた。

### git add -u と git commit をまとめてやる

``` bash
git commit -a
```
備考:`git add -u`はgit管理対象を全部インデックスに登録するコマンド

### コミット履歴を見る
```bash
git log
git log index.html	#特定のファイルの履歴を見る
git log --oneline	#コミットIDと要約したコミットメッセージを1行で表示
git log -3			#最新の3件のみ
git log -p			#変更内容も表示
```


## テクニカルな使い方
### コミットのメモを書き直す
```bash
git commit --amend
```

### ファイル内の行がどのコミットで生まれたものか表示
```bash
git blame index.html
```
長いファイルだと、長い

### 過去のコミットの効果を打ち消す
```bash
git reset --hard [コミットID]
```
commitIDは`git log --oneline`とかで出てくる黄色いハッシュ値
commitIDは最初の8文字でOK
コミットオブジェクトをSHA-1でハッシュ化した160ビット(40文字の16進数)の値
コミットオブジェクトはコミット内容の他に時刻やコミッターやメアドまで含まれるため、同じコミット内容でもハッシュ値は異なる

これやったらマジで保存したやつ書き換えられた
驚き

### 最後にコミットしたところまで戻る
```bash
git reset --hard HEAD
```

## 参考
入門Git (秀和システム 2011)

## 経緯
いい加減gitの使い方くらい覚えないといけないのではないか
まずひとりで版管理できてから、mergeとかbranchは学んでいこうと思った