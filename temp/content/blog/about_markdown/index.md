---
title: markdownについて
date: "2021-01-12T22:12:03.284Z"
updated: 2021-01-19T13:27
description: "markdownの記法についてまとめた"
tags: ["memo","computer"]
---


## コード記入

```js
const saltyDuckEgg = "chinese preserved food product"
```
<!-- js,cpp,markdown,etc -->
`const path`のように単語でも可能(その場合、色はつかない)

    ```js
    const saltyDuckEgg = "chinese preserved food product"
    ```

    `const path`

## 強調

    ここ見てね！！！

## 表
| Number | Title                                    | Year |
| :----- | :--------------------------------------- | ---: |
| 1      | Harry Potter and the Philosopher’s Stone | 2001 |
| 2      | Harry Potter and the Chamber of Secrets  | 2002 |
| 3      | Harry Potter and the Prisoner of Azkaban | 2004 |

[View raw (TEST.md)](https://raw.github.com/adamschwartz/github-markdown-kitchen-sink/master/README.md)

    | Number | Title                                    | Year |
    | :----- | :--------------------------------------- | ---: |
    | 1      | Harry Potter and the Philosopher’s Stone | 2001 |
    | 2      | Harry Potter and the Chamber of Secrets  | 2002 |
    | 3      | Harry Potter and the Prisoner of Azkaban | 2004 |

## 線
---
    どれでもok
    ---
    - - -
    ***
    * * *

## リスト
<!-- -,*どちらでもok -->
- 赤
- 青
- 黄

    - 赤
    - 青
    - 黄

1. 幼児
1. 子ども
1. 大人

## 文字

**太文字**

_斜体_

    **太文字**

    __太文字__

    _斜体_

    *斜体*

## リンク

[内部リンク(Home)](../)

[外部リンク(ルミナスヘアー)](http://luminous-hair.com "attrがあってもなくてもいい")

[外部リンク(ルミナスヘアー)][id]

[id]: http://luminous-hair.com "attrだよ"

    [内部リンク(Home)](../)

    [外部リンク(ルミナスヘアー)](http://luminous-hair.com "attrがあってもなくてもいい")

    [外部リンク(ルミナスヘアー)][id]

    [id]: http://luminous-hair.com "attrだよ"

## 画像

![Chinese Salty Egg](./salty_egg.jpg "Image Titleをここに書く")

    ![Chinese Salty Egg](./salty_egg.jpg "Image Titleをここに書く")
<!-- リンクはどっちでも -->


## 引用
> ここにいろいろ書く

    > ここにいろいろ書く


