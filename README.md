### Jak dołączyć się do pracy nad layoutem?
## Opcja mniej-bolesna ale bardziej czasochłonna
__Krok 1__

Do poprawnej pracy nad layoutem jest wymagane IDE/edytor wspierający kolorowanie składni Mustache/Handlebars, Javascript, LESS (lub CSS zwykle jest to plugin kompatybilny). W celu uruchomienia projektu należy zacheckoutować się do repozytrium:
```sh
$ cd [nazwa_projektu]
$ git init
$ git remote add remote https://github.com/gonet123/ssi
$ git fetch remote
$ git checkout master
```
Powyższe komendy spowodują pobranie repo i zacheckoutowanie do głównej branchy (master). 
__Przypomnienie__
W celu aktualizacji swojej kopi projektu należy uruchomić
```sh
$ git push remote master
```
W celu aktuzalicaji repozytorium:
```sh
$ git pull remote master
```

__Krok 2__

Po pobraniu repozytorium należy ściągnąć i zainstalować nodejs http://nodejs.org/download/ (instalacja łopatologiczna [dalej->]). Po poprawnej instalacji w katalogu [nazwa_projektu] należy uruchomić
```sh
$ npm install
$ bower install
```
Powyższe komendy spowodują pobranie skryptu bowerjs oraz pobranie wszystkich niezbędnych bibliotek dodatkowych. 
Do nieprzebranej radości z posiadania i współtworzenia działającej aplikacji brakuje jednego elementu, translator LESS – najprościej http://lesscss.org/usage/#command-line-usage-installing-lessc-for-use-globally
Ważne jest aby odpalać to tylko dla pliku layout.less
```sh
$ cd public_html/skin && lessc --no-color layout.less --source-map=layout.map
```
__Krok 3__ 

Uruchomienie instancji serwera.

Zależnie od tego czego używacie. Jeżeli padło na WebStorm prawym na index.html (w public_html)  -> Open in Browser. WebStorm ma własny serwer, więc nie ma problemu.
Jeżeli ma to być inne IDE, stronę można odpalić na dowolnej aplikacji serwera Apache, Tomcat, Glashfish, itd, itp. Jeżeli dalej to nie wystarczy, proponuję użyć skryptu bin/www (uruchomić go poprzez nodejs)
## Opcja szybsza = cięższa kolaboracja

