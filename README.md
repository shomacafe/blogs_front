# ブログ投稿アプリ（フロントエンド側）
フロントエンドはReact、バックエンドはRails（APIモード）で制作しました。
<img width="1439" alt="スクリーンショット 2023-10-19 18 35 49" src="https://github.com/shomacafe/crowd_funding_app/assets/97627380/071dd452-0d2a-44b1-9e2c-f60ad520ddea">

## 機能一覧
* ユーザー登録
* ログイン
* ログアウト
* ブログ一覧表示
* ブログ記事一覧表示
* ブログ記事詳細表示
* ブログ記事作成
* ブログ記事編集
* ブログ記事削除
* 自分のブログ記事一覧表示
* コメント作成機能
* コメント編集機能
* コメント削除機能
* お気に入り登録
* お気に入り解除
* お気に入りブログ記事一覧表示

## APIエンドポイント一覧
●認証
* POST /api/auth：ユーザー登録
* POST /api/auth/sign_in：ログイン
* DELETE /api/auth/sign_out：ログアウト
* GET  /api/auth/sessions：ログインユーザー取得

●ブログ記事（Post）
* GET /api/posts/blogs：全てのブログの取得
* GET /api/posts/{id}：特定のブログ記事を取得
* POST /api/posts：ブログ記事の作成
* PUT /api/posts/{id}：特定のブログ記事の更新
* DELETE /api/posts/{id}：特定のブログ記事の削除
* GET /api/posts/users/{user_id}：特定のユーザーが投稿したブログ記事の取得
* GET /api/posts/my_posts：自分が投稿したブログ記事の取得

●コメント（Comment）
* POST /api/posts/{id}/comments：コメントの作成
* PUT /api/posts/{id}/comments/{comment_id}：コメントの編集
* DELETE /api/posts/{id}/comments/{comment_id}：コメントの削除

●お気に入り（Favorite）
* POST /api/posts/{id}/favorites：お気に入り登録
* DELETE /api/posts/{id}/favorites：お気に入り解除
* GET /api/my_favorites：自分のお気に入りしたブログ記事一覧
