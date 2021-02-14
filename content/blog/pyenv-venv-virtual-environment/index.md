---
title: pyenvとvenvで仮想環境構築 ラズパイ編
created: 2021-02-03T00:05
updated: 2021-02-10 21:58
tag: [python, raspberrypi]
author: [nozzle]
description: ラズパイでpythonの仮想環境を作ったときのメモ
---

## pyenv と venv の違い

pyenv は python のバージョンの使い分け。 (e.g. python 2.7.13 と python 3.9.0)  
venv は python のパッケージの使い分け。 (e.g. numpy を使う環境 と numpy いらない環境)

## pyenv の導入

### python のバージョン確認

```bash
python -V
```

僕の場合、2.7.13 でした。これから pyenv で python3.x 系と自由に切り替えられるようにしよう。

### 導入前に必要なパッケージの導入

```bash
sudo apt install build-essential libbz2-dev libdb-dev libreadline-dev libffi-dev libgdbm-dev liblzma-dev libncursesw5-dev libsqlite3-dev libssl-dev zlib1g-dev uuid-dev tk-dev
```

正直どれがなんだか分からないけど、とにかく`libffi-dev`は忘れずにインストールしよう。<br>これが無いと venv の作業でエラーを吐きます。

### pyenv のインストール

```bash
git clone https://github.com/pyenv/pyenv.git ~/.pyenv
pyenv versions # インストール可能なpythonのバージョンの確認
pyenv install 3.9.0  # 3.9.0が最新(2020/11/09)
```

**[注意] pyenv install 3.9.0 はめちゃめちゃ時間かかるから焦らないように**

### pyenv の PATH を通す

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
`.bashrc`は bash が開かれる度に実行。

最後の if 文で`bashrc`を読み込ませる。これが無いと、ssh したときに bash の色が無くなる。  
bash の配色は`bashrc`に担われてるのだ。

参考:[ラズパイのセットアップから pyenv を使って Python3.6 環境を構築するまで](https://www.suzu6.net/posts/31/)  
参考:[本当に正しい .bashrc と .bash_profile の使ひ分け](https://qiita.com/magicant/items/d3bb7ea1192e63fba850)  
参考:[Ubuntu で色がなくなる理由と改善策](https://qiita.com/upnt/items/022c5fc916d8a289e326)

### pyenv で 2.x と 3.x を行き来

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

python2.x と 3.x が混在してるとき、python3.x を使いたいときは python3 とか pip3 とか書く必要があった。  
pyenv のおかげで、python と打つだけで python3 系が動くようになった。

## venv の導入

### venv のインストール

**venv はインストールする必要がない**

venv は python3.3 から標準機能になったため、pyenv で 3.9.0 を導入しているなら必要がない。

### venv の仮想環境の作り方

仮想環境はプロジェクトごとに作られるから、まず作業したいディレクトリを作成して移動しよう。  
移動したら次のコマンドを打つ。

```bash
python -m venv .venv # [.venv]は適当なフォルダ名
```

これもちょっと時間がかかる。  
仮想環境のフォルダに.venv と書くのは慣習的なもの。  
`myenv`とかでもいいよ。

### 仮想環境の実行

```bash
source .venv/bin/activate
```

今まで `pi@raspberrypi` だったやつが、`(.venv) pi@raspberrypi` になってたら成功。

### venv 環境下でのモジュールのインストール

```bash
python -m pip install numpy   #numpyのインストール
pip list    #インストールされているモジュールの表示
```

numpy がリストに加わってるはず。

### 仮想環境からの離脱

```bash
deactivate   # 仮想環境からの離脱
pip list
```

numpy がリストに**無いはず。**  
それもそのはず、numpy は仮想環境.venv で導入したパッケージだからラズパイの python パッケージには加わっていないのだ。

### トラブルシュート:ModuleNotFoundError :No module named '\_ctypes'

numpy をインストールしてる途中で`"ModuleNotFoundError :No module named '_ctypes'`と出ることがあった。 `libffi-dev`が無いと出るエラーらしい。しかし、私の場合、導入してもエラーが消えなかった。あれこれ調べたら、pyenv 導入前に libffi-dev がインストールされていないと駄目らしいと判明。

参考:[pipenv の install 時に、No module named '\_ctypes'が発生する](https://qiita.com/mynkit/items/f8a1a90b99efef4a08a3)

```bash
pyenv uninstall 3.9.0
sudo apt install libffi-dev
pyenv install 3.9.0
```

このあとで numpy の導入を試してみよう。きっとうまくいく。

参考:[【Python】venv を使った仮想環境の構築方法](https://hibiki-press.tech/python/venv/4567)
