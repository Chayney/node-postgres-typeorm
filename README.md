# node-postgres-typeorm  

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

## 補足2  
ローカルのNode.jsがlocalhost:5432に接続する場合、接続先はローカルのTCPポート5432  
dockerコンテナ外からTCP接続したい場合はlisten_addressesが0.0.0.0  
仮にmysqlを使用する場合はデフォルトバインドに「0.0.0.0」が設定されているためコンテナ外から接続可能  
postgresqlのデフォルトバインドは「localhost」になっているためコンテナ外からの接続は受け付けていない  
docker-compose.ymlでport公開しつつも「listen_addresses = '*'」のように外部からのアクセスを許可する設定が必要(postgres.confで記載)    
