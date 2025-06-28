# Supabase 自己ホスト構成（開発・本番 別ファイル管理）

このプロジェクトでは、環境を **開発用** と **本番用** に完全に分離して管理します。

## 📁 ファイル構成

```
docker-compose.dev.yml       # 開発環境用のDocker構成
docker-compose.build.yml       # ビルド確認用のDocker構成
docker-compose.prod.yml      # 本番環境用のDocker構成

.env.dev                     # 開発環境用の環境変数ファイル
.env.prod                    # 本番環境用の環境変数ファイル（ビルド確認でも使用）
```


## 🚀 開発環境の使い方

### 起動

```bash
docker compose --env-file .env.dev -f docker-compose.dev.yml up -d
```


### 停止

```bash
docker compose --env-file .env.dev -f docker-compose.dev.yml down
```


### ログ確認

```bash
docker compose --env-file .env.dev -f docker-compose.dev.yml logs -f
```

## 🌐 ビルド確認環境の使い方（本番と同じ条件）

### 起動

```bash
docker compose --env-file .env.prod -f docker-compose.build.yml build --no-cache
docker compose --env-file .env.prod -f docker-compose.build.yml up -d
```


### 停止

```bash
docker compose --env-file .env.prod -f docker-compose.build.yml down
```


### ログ確認

```bash
docker compose --env-file .env.prod -f docker-compose.build.yml logs -f
```

## 🌐 本番環境の使い方

### 起動

```bash
docker compose --env-file .env.prod -f docker-compose.prod.yml build --no-cache
docker compose --env-file .env.prod -f docker-compose.prod.yml up -d
```


### 停止

```bash
docker compose --env-file .env.prod -f docker-compose.prod.yml down
```


### ログ確認

```bash
docker compose --env-file .env.prod -f docker-compose.prod.yml logs -f
```


## ⚠️ 注意ポイント

- ✅ **環境の独立性**: 開発と本番は完全に独立しています。混合しないようファイルをしっかり分けて管理してください。
- ✅ **環境変数の設定**: `.env.dev` と `.env.prod` では、ポート番号・パスワード・公開URL などを必ず適切に設定してください。
- ✅ **本番環境のセキュリティ**: 本番環境では、不要なポートの公開やデバッグ設定を含めないようにしてください。
- ✅ **ポート競合の回避**: Docker Desktop などを使用する場合、ポートが競合しないよう事前に確認してください。


# Mailpit Docker Compose セットアップ README

Mailpitは、SMTPテスト用のメールキャッチャーであり、開発環境でメール送信を安全かつ簡単にテストできます。このREADMEでは、同梱の `docker-compose.yml` ファイルを使ってMailpitをセットアップ・利用する方法を説明します。

## 構成内容

- **イメージ:** `axllent/mailpit:v1.26.2`
- **ポート:**
    - Web UI: `${MAILPIT_WEB_PORT}` → 8025（例: 8025:8025）
    - SMTP:   `${MAILPIT_SMTP_PORT}` → 1025（例: 1025:1025）
- **永続化:** ローカルの `./mailpit-data` ディレクトリをコンテナの `/data` にマウント
- **環境変数:** タイムゾーン、DBパス、メッセージ数上限、認証設定などをカスタマイズ可能

## 利用方法

- **Web UI:**
ブラウザで `http://localhost:8025`（`MAILPIT_WEB_PORT`に従う）にアクセスしてください。
- **SMTPサーバー:**
テストメール送信プログラムのSMTPサーバーを `localhost:1025`（`MAILPIT_SMTP_PORT`に従う）に設定してください。


## よくあるカスタマイズ

- **上限保存数の変更**
    - `.env` の `MAILPIT_MAX_MESSAGES` を編集してください。
- **タイムゾーンの変更**
    - `MAILPIT_TIMEZONE` を好きな値に変更（例: `UTC`, `Asia/Tokyo` など）。
- **認証の有効/無効**
    - `MAILPIT_AUTH_ACCEPT_ANY` や `MAILPIT_AUTH_ALLOW_INSECURE` を調整可能です。


## その他

- 永続データは `./mailpit-data` ディレクトリに保存されます


# Supabase Self-Hosting Docker Compose セットアップガイド

このREADMEは、同梱の `docker-compose.yml` と `.env` ファイルを使って、**Supabase** をローカル環境でセルフホストするための手順・解説です。
Kongリバースプロキシを通じて、APIアクセスを一元化し、開発・検証環境を素早く構築できます。

## 構成サービス一覧

| サービス名 | 役割 | 主な経路 |
| :-- | :-- | :-- |
| studio | 管理UI | :3000 |
| kong | APIゲートウェイ | :8000 / :8443 |
| auth | 認証API (GoTrue) | kong経由 |
| rest | REST API (PostgREST) | kong経由 |
| realtime | リアルタイムAPI | kong経由 |
| storage | オブジェクトストレージAPI | kong経由 |
| imgproxy | 画像変換プロキシ | internal |
| meta | PostgresメタデータAPI | internal |
| functions | Edge Functions ランタイム | kong経由 |
| analytics | ログ/分析 (Logflare) | :4000 |
| db | PostgreSQL | :5432 |
| vector | ログ収集 (Vector) | internal |
| supavisor | DBコネクションプーラー | :6543 |

## 必要な準備

### 1. 必須ソフトウェア

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)


### 2. `.env` ファイルの作成

`.env` ファイルをプロジェクトルートに配置し、下記のサンプルをベースに**各値を必ず編集**してください（特にパスワードやシークレット類）。

```env
# --- Secrets (本番運用時は必ず変更) ---
POSTGRES_PASSWORD=your-super-secret-and-long-postgres-password
JWT_SECRET=your-super-secret-jwt-token-with-at-least-32-characters-long
ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
DASHBOARD_USERNAME=supabase
DASHBOARD_PASSWORD=this_password_is_insecure_and_should_be_updated
SECRET_KEY_BASE=UpNVntn3cDxHJpq99YMc1T1AQgQpc8kfYTuRgBiYa15BLrx8etQoXz3gZv1/u2oq
VAULT_ENC_KEY=your-encryption-key-32-chars-min

# --- Database ---
POSTGRES_HOST=db
POSTGRES_DB=postgres
POSTGRES_PORT=5432

# --- Supavisor (DB Pooler) ---
POOLER_PROXY_PORT_TRANSACTION=6543
POOLER_DEFAULT_POOL_SIZE=20
POOLER_MAX_CLIENT_CONN=100
POOLER_TENANT_ID=your-tenant-id

# --- Kong (API Proxy) ---
KONG_HTTP_PORT=8000
KONG_HTTPS_PORT=8443

# --- PostgREST ---
PGRST_DB_SCHEMAS=public,storage,graphql_public

# --- Auth (GoTrue) ---
SITE_URL=http://localhost:3000
ADDITIONAL_REDIRECT_URLS=
JWT_EXPIRY=3600
DISABLE_SIGNUP=false
API_EXTERNAL_URL=http://localhost:8000

# --- Mailer ---
MAILER_URLPATHS_CONFIRMATION="/auth/v1/verify"
MAILER_URLPATHS_INVITE="/auth/v1/verify"
MAILER_URLPATHS_RECOVERY="/auth/v1/verify"
MAILER_URLPATHS_EMAIL_CHANGE="/auth/v1/verify"
ENABLE_EMAIL_SIGNUP=true
ENABLE_EMAIL_AUTOCONFIRM=false
SMTP_ADMIN_EMAIL=admin@example.com
SMTP_HOST=mailpit
SMTP_PORT=1025
SMTP_USER=
SMTP_PASS=
SMTP_SENDER_NAME=fake_sender
ENABLE_ANONYMOUS_USERS=false

# --- Phone Auth ---
ENABLE_PHONE_SIGNUP=true
ENABLE_PHONE_AUTOCONFIRM=true

# --- Studio (Dashboard) ---
STUDIO_DEFAULT_ORGANIZATION=Default Organization
STUDIO_DEFAULT_PROJECT=Default Project
STUDIO_PORT=3000
SUPABASE_PUBLIC_URL=http://localhost:8000
IMGPROXY_ENABLE_WEBP_DETECTION=true
OPENAI_API_KEY=

# --- Functions ---
FUNCTIONS_VERIFY_JWT=false

# --- Analytics ---
LOGFLARE_PUBLIC_ACCESS_TOKEN=your-super-secret-and-long-logflare-key-public
LOGFLARE_PRIVATE_ACCESS_TOKEN=your-super-secret-and-long-logflare-key-private
DOCKER_SOCKET_LOCATION=/var/run/docker.sock
GOOGLE_PROJECT_ID=GOOGLE_PROJECT_ID
GOOGLE_PROJECT_NUMBER=GOOGLE_PROJECT_NUMBER
```

## サービスへのアクセス

### Studio（管理UI）

- [http://localhost:3000](http://localhost:3000)


### APIエンドポイント（Kong経由）

SupabaseのAPI（Auth, REST, Realtime, Storage, Functions等）は**Kongリバースプロキシ**を通じてアクセスします。

例：

- 認証API: `http://localhost:8000/auth/v1/`
- REST API: `http://localhost:8000/rest/v1/`
- ストレージAPI: `http://localhost:8000/storage/v1/`
- Realtime API: `ws://localhost:8000/realtime/v1/`
- Edge Functions: `http://localhost:8000/functions/v1/`

> ※ APIパスはKongの設定（`supabase/volumes/api/kong.yml`）により決まります。

### PostgreSQL

- ホスト: `localhost`
- ポート: `5432`
- ユーザー: `postgres`（または `.env` の設定値）
- パスワード: `.env` の `POSTGRES_PASSWORD`


## よくあるカスタマイズ

- **外部Postgresの利用**
`db` サービスをコメントアウトし、`.env` の `POSTGRES_HOST` などを外部DBに合わせて設定。
- **BigQueryバックエンドの利用**
`analytics` サービスの該当コメントを外し、Google Cloud認証情報をボリュームとしてマウント。
- **不要サービスの停止**
`docker-compose.yml` から該当サービスをコメントアウト。


## 参考リンク

- [Supabase Self-Hosting 公式ドキュメント](https://supabase.com/docs/guides/self-hosting)
- [Kong Gateway 公式ドキュメント](https://docs.konghq.com/)
- [各サービスのGitHubリポジトリ](https://github.com/supabase/)


## よくある質問（FAQ）

### Q. APIは直接各サービスのポートで叩くのですか？

A. **いいえ。**
SupabaseのAPIは**Kongリバースプロキシ（:8000, :8443）を通じてアクセス**するのが標準です。
各サービスの内部ポートは開発・デバッグ用です。