1. このファイルと同じ位置にあるディレクトリ内にあるファイルをディレクトリ名と同じように配置してください
2. routes/api.phpに以下のコードを追加してください
Route::resource("productadd",ProductAddController::class);

3. 呼び出し方はノリでよろしく


ロリポップにssh接続したい場合
ssh main.jp-orderease@ssh.lolipop.jp -p 2222
全部yes
パスワードはロリポップからコピペ