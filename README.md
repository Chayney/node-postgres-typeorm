# node-postgres-typeorm  

## 補足  
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
