---
title: pyenvとvenvで仮想環境構築 ラズパイ編
created: 2021-02-03T00:05
updated: 2021-02-03T00:22
tag:
author: nozzle
description: ラズパイでpythonの仮想環境を作ったときのメモ
---
## pyenvとvenvの違い
pyenvはpythonのバージョンの使い分け。 (e.g. python 2.7.13 と python 3.9.0)  
venvはpythonのパッケージの使い分け。  (e.g. numpyを使う環境 と numpyいらない環境)


## pyenvの導入

### pythonのバージョン確認

```bash
python -V
```

僕の場合、2.7.13でした。これからpyenvでpython3.x系と自由に切り替えられるようにしよう。


### 導入前に必要なパッケージの導入

```bash
sudo apt install build-essential libbz2-dev libdb-dev libreadline-dev libffi-dev libgdbm-dev liblzma-dev libncursesw5-dev libsqlite3-dev libssl-dev zlib1g-dev uuid-dev tk-dev
```

正直どれがなんだか分からないけど、とにかく`libffi-dev`は忘れずにインストールしよう。<br>これが無いとvenvの作業でエラーを吐きます。


### pyenvのインストール
```bash
git clone https://github.com/pyenv/pyenv.git ~/.pyenv
pyenv versions # インストール可能なpythonのバージョンの確認
pyenv install 3.9.0  # 3.9.0が最新(2020/11/09)
```
**[注意] pyenv install 3.9.0 はめちゃめちゃ時間かかるから焦らないように**


### pyenvのPATHを通す

`.bash_profile`に以下の内容を追記しよう

```bash
export PYENV_ROOT="$HOME/.pyenv"
export PATH="$PYENV_ROOT/bin:$PATH"
eval "$(pyenv init -)"
if [ -f ~/.bashrc ] ; then
      . ~/.bashrc
fi
```

`.bash_profile`はログイン時に実行。  
`.bashrc`はbashが開かれる度に実行。


最後のif文で`bashrc`を読み込ませる。これが無いと、sshしたときにbashの色が無くなる。  
bashの配色は`bashrc`に担われてるのだ。


参考:[ラズパイのセットアップからpyenvを使ってPython3.6環境を構築するまで](https://www.suzu6.net/posts/31/)  
参考:[本当に正しい .bashrc と .bash_profile の使ひ分け](https://qiita.com/magicant/items/d3bb7ea1192e63fba850)  
参考:[Ubuntuで色がなくなる理由と改善策](https://qiita.com/upnt/items/022c5fc916d8a289e326)  


### pyenvで2.xと3.xを行き来
```bash
python -V
```
`python 2.7.13`と出るはず

```bash
pyenv global 3.9.0
python -V
```
`python 3.9.0`と出るはず

```bash
pyenv global system
```
`python 2.7.13`と出るはず


python2.xと3.xが混在してるとき、python3.xを使いたいときはpython3 とかpip3とか書く必要があった。  
pyenvのおかげで、pythonと打つだけでpython3系が動くようになった。


## venvの導入

### venvのインストール
**venvはインストールする必要がない**

venvはpython3.3から標準機能になったため、pyenvで3.9.0を導入しているなら必要がない。


### venvの仮想環境の作り方
仮想環境はプロジェクトごとに作られるから、まず作業したいディレクトリを作成して移動しよう。  
移動したら次のコマンドを打つ。
```bash
python -m venv .venv # [.venv]は適当なフォルダ名
```
これもちょっと時間がかかる。  
仮想環境のフォルダに.venvと書くのは慣習的なもの。  
`myenv`とかでもいいよ。  


### 仮想環境の実行
```bash
source .venv/bin/activate
```
今まで `pi@raspberrypi` だったやつが、`(.venv) pi@raspberrypi` になってたら成功。

### venv環境下でのモジュールのインストール
```bash
python -m pip install numpy   #numpyのインストール
pip list    #インストールされているモジュールの表示
```
numpyがリストに加わってるはず。


### 仮想環境からの離脱
```bash
deactivate   # 仮想環境からの離脱
pip list
```
numpyがリストに**無いはず。**  
それもそのはず、numpyは仮想環境.venvで導入したパッケージだからラズパイのpythonパッケージには加わっていないのだ。


### トラブルシュート:ModuleNotFoundError :No module named '_ctypes'

numpyをインストールしてる途中で`"ModuleNotFoundError :No module named '_ctypes'`と出ることがあった。    `libffi-dev`が無いと出るエラーらしい。しかし、私の場合、導入してもエラーが消えなかった。あれこれ調べたら、pyenv導入前にlibffi-devがインストールされていないと駄目らしいと判明。


参考:[pipenvのinstall時に、No module named '_ctypes'が発生する](https://qiita.com/mynkit/items/f8a1a90b99efef4a08a3)

```bash
pyenv uninstall 3.9.0
sudo apt install libffi-dev
pyenv install 3.9.0
```
このあとでnumpyの導入を試してみよう。きっとうまくいく。

参考:[【Python】venvを使った仮想環境の構築方法](https://hibiki-press.tech/python/venv/4567)

