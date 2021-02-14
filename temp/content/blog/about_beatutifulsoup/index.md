---
title: beautifulsoupの使い方
date: 2021-01-26 13:48:19
updated: 2021-01-26T14:00
description: "リンクおいた"
tags: ["memo","computer"]
---

```python
import requests
from bs4 import BeautifulSoup

load_url = ""
html = requests.get(load_url)
soup = BeautifulSoup(html.content, "html.parser")
```

[【Python】BeautifulSoupの使い方・基本メソッド一覧｜スクレイピング](https://lets-hack.tech/programming/languages/python/beautifulsoup/)