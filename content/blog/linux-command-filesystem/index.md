---
title: Linuxのファイルシステムコマンドまとめ
description: fstab, mount, df, blkid の違い
created: 2021-02-09T02:06
updated: 2021-02-10 21:58
author: [nozzle]
tag: [linux]
---

## fstab と mount の違い

mount... コマンド, 一時的に作用, 再起動したらリセット
fstab... 設定ファイル, 起動時に自動でマウントさせるための記述

厳密には違うかもしれないが、通常使用ならこの理解でいいだろ、みんなごめん
fstab でマウントしたデバイスは umount を使ってアンマウントできない
f オプションで強制的にアンマウントできるらしいが、危険らしい

### fstab の書き方

```bash
less /etc/fstab		#fstabの設定を見ることができる
```

```
proc				/proc		proc	defaults			0	0
/dev/hoge			/boot		vfat	defaults			0	2
PARTUUID=hogehoge	/			ext4	defaults,noatime	0	1
# a swapfile is not a swap partition, no line here
#	use dphys-swapfile swap[on|off] for that
UUID="hogehoge"	/mnt/ssd		ext4	defaults			0	1
```

#### 1 列目...**デバイス名**

`proc`,`/dev/hoge`,`UUID=hogehoge`,`PARTUUID=hogehoge`
**デバイス名は後に説明する blkid で調べられる**
気になる人は ↓ へ GO

#### 2 列目...**マウントポイント**

`/proc`,`/boot`,`/mnt/ssd`
どこにファイルシステムを置くか決められる
`/mnt`じゃなくて`/media`を使う人もいる

#### 3 列目...**ファイルシステム名**

`proc`,`vfat`,`ext4`
windows なら NTFD が、linux なら ext4 が主流らしい
proc は仮想ファイルシステムだし、vfat は virtual FAT らしいしややこしいから深入りしないでおくね

#### 4 列目...**オプション**

`defaults`,`defaults,noatime`,`defaults,nofail`
`defaults`は`async,auto,dev,nouser,rw,suid,exec,noexec`をまとめたものらしい

`noatime`で linux がファイルアクセス時に記録するタイムスタンプ`atime`を無効化できる。膨大なファイルにアクセスするときに使える。普段使いならつけなくていい
`nofail`でマウントに失敗しても boot する。ただのメディア用だったら基本これつけていいと思う。やらずに USB 抜いて起動すると、emergency モードに入るらしい。

参考:[/etc/fstab | ゆるっとエンジニアブログ](http://g-network.boo.jp/wiki/2018/03/etcfstab/ "/etc/fstab | ゆるっとエンジニアブログ")

参考:[CentOS7 の/etc/fstab の nofail オプション（あるいは systemd）](https://qiita.com/nishemon/items/a967b950c4bbca08fd88 "CentOS7の/etc/fstabのnofailオプション（あるいはsystemd）")

#### 5 列目...dump 対象

`0`,`1`
バックアップの対象にするなら 1
しないなら 0
既存の`proc`とか`boot`でさえバックアップ対象にしてないから 0 でいんじゃね？

#### 6 列目...fsck の設定

`0`,`1`,`2`...
システム起動時にファイルシステムの検査と修復をしてくれる fsck の対象にするか設定できる。
`0`なら対象外
`1`なら 1 番目に検査,`2`なら 2 番目 `3`なら...と続く
重くなるから基本 0 で OK

### mount の使い方

```bash
sudo mount -t ext4 /dev/sda1 /mnt`
```

mount -t ファイルシステム デバイス名 マウントポイント

個々の説明はもうしたしいいよね

## df blkid

df... 現在使用中のファイルシステムについて調べる(マウントしたものを表示)
blkid... 使用可能なファイルシステムについて調べる(接続したものを表示)

### df の使い方

```bash
df -h		#hコマンドで単位がGBになって見やすくなる
df --total	#totalで空き容量の合計が見れる
```

### blkid の使い方

```bash
sudo blkid	#現在のファイルシステムを調べて表示、こっちを使おう
blkid		#管理者が行ったキャッシュを参照して表示、状況によって表示がでないことも
blkid -o list	#見やすいけどPARTUUIDが見えなくなるのが気になるところ
```

## おまけ

### アンマウントのコマンド、umount の使い方

```bash
umount /mnt/hoge
```

```bash
umount /sda/hoge
```

マウントポイントでもデバイス名でもいける
どっちでもいいってのは便利でもあり、ややこしくもある

### フォーマットのコマンド、mkfs の使い方

```
sudo mkfs -t ext4 dev/sda/hoge
```

フォーマットしてファイルシステムを作るコマンド
こちらはデバイス名のみ、当たり前か

### パーティションを作る

```bash
fdisk /dev/sda
```

sda とか sda1 とかあるじゃん  
sd は USB ストレージ  
a は 1 台目のストレージ  
1 は一つめのパーティションを表している
