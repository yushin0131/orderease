<!DOCTYPE html>
<html lang="ja">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    {{-- タイトルを入力 --}}
    <title>Order Ease prototype</title>

    {{-- Reactを使うかは不明 --}}
    @viteReactRefresh
    @vite('resources/react/visitor/visitor-index.tsx')
</head>

<body>
    <div id="root"></div>

    {{-- プリレンダリング要素。ロードが完了したら削除される --}}
    <div id="pre-render">
        ぷりれんだりんぐ
    </div>

</body>

</html>