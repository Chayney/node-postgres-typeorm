# node-postgres-typeorm  

## URL
・node-api: http://localhost:3000/api/todos  

### 説明  
           ┌────────────────────┐
           │ AppDataSource       │
           │ - CRUD用           │
           │ - Singleton        │
           │ - synchronize: false│
           └────────────────────┘
                     │
           ┌─────────┴─────────┐
           │                     │
           ▼                     ▼
        アプリ起動             DB操作
  (Node.js / Express)          (CRUD)

           ┌────────────────────┐
           │ MigrationDataSource │
           │ - マイグレーション │
           │ - CLI専用          │
           │ - migrations指定   │
           └────────────────────┘
                     │
           ┌─────────┴─────────┐
           │                     │
           ▼                     ▼
   migration:generate        migration:run


## 補足1  
この構成を1から作成する場合の構築方法  
※ビルド後にホスト側とコンテナ側でvolume同期を行うが予めホスト側でnode_modulesが存在していなければその状態をコンテナ側と同期してしまう  
※docker-composeには「volumeをマウントする直前にホスト側のディレクトリを作る」という仕組みは無い  
$cd node  
$npm install  

インストール  
$npm install express  
$npm install -D @types/express  
$npm install express-validator  
$npm install typeorm reflect-metadata pg  
$npm install dotenv  
$npm install --save-dev ts-node  

tsconfig.jsonの作成  
$touch tsconfig.json  

上記設定を済ませた後に「docker-compose up -d --build」を実行  

## 補足2  
ローカルのNode.jsがlocalhost:5432に接続する場合、接続先はローカルのTCPポート5432  
dockerコンテナ外からTCP接続したい場合はlisten_addressesを「0.0.0.0」または「＊」にする  
仮にmysqlを使用する場合はデフォルトバインドに「0.0.0.0」が設定されているためコンテナ外から接続可能  
postgresqlのデフォルトバインドは「localhost」になっているためコンテナ外からの接続は受け付けていない  
docker-compose.ymlでport公開しつつも「listen_addresses = '*'」のように外部からのアクセスを許可する設定が必要(postgres.confで記載)    
