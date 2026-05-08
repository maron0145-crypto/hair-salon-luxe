# hair salon luxe - プロジェクトルール

## プロジェクト概要

架空の美容室「hair salon luxe」の公式Webサイト。

## 技術スタック

- HTML
- CSS
- JavaScript

フレームワーク・ライブラリは使用しない。

## 管理ページ仕様

### 遷移方法
- フロントページから管理ページへのリンクは設けない。
- `/admin/` を直接URLに打ち込んでアクセスする運用。

### 認証
- ログイン認証は見せかけ。ID・パスワードの値に関わらずログインできる。
- DB実装時に差し替えられるよう、認証処理は `auth.js` にまとめる。

### データ管理
- データの保存は行わない（DB未構築のため）。
- 各設定項目（営業時間・定休日・メニュー料金など）はJavaScriptの変数に代入する。
- 管理画面で変更した値はTOPページ（`index.html`）にリアルタイムで反映する。
- ページをリロードすると初期値に戻る仕様で問題ない。
- 将来的にDB・バックエンドを追加する前提で、データアクセス部分は関数に切り出す。

### ディレクトリ構成
```
admin/
├── index.html           # ログイン画面
├── dashboard.html       # ダッシュボード
├── reservations.html    # 予約・問い合わせ管理
├── menu.html            # メニュー・料金管理
├── stylist.html         # スタイリスト情報管理
├── store-info.html      # 店舗情報・営業時間管理
├── news.html            # お知らせ管理
├── css/
│   └── admin-style.css
└── js/
    ├── auth.js          # 認証処理（現在は見せかけ）
    ├── reservations.js
    ├── menu.js
    └── store-info.js
```

## コーディングルール

### コメント
- コメントは日本語で記述する。

### ファイル名
- ファイル名はケバブケース（kebab-case）を使用する。
  - 例: `index.html`, `main-style.css`, `booking-form.js`
