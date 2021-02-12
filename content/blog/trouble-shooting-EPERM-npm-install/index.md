---
title: トラブルシュート：npm installすると、"Error EPERM operation not permitted, unlink ..."が出る
created: 2021-02-06T21:19
updated: 2021-02-10 21:58
description: PCを再起動すると治る
author: [nozzle]
tag: [node, vscode, trouble-shooting]
---

## 対象者

VScode を立ち上げていて、このエラーに遭遇している方。

## 対処法

PC を再起動すると治る。

## 解説

VScode を立ち上げていると、node-modules ディレクトリの何かと絶えず操作をするせいで、link dependencies がうまくいかないことがあるらしい。
VScode だけ終了しても裏で生き残ってるせいかうまくいかないので、PC 再起動して、VScode を立ち上げる前に PowerShell とかで`npm install`などを試そう。
