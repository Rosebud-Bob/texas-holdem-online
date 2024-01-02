# texas-holdem-online
texas-holdem-online

## todo
1. 结束提示：fold或者比较
2. show card与结束一起，修改为结束画面停止5s，期间可以show card
3. 2 7 bonus
4. 资金为0时bug
5. 扩增为10人桌

docker network create --driver bridge --subnet 110.41.22.0/24  --gateway 110.41.22.1 mynet2

docker run --name client --network mynet --ip 110.41.22.67 -p 8080:8080 -d docker.io/rosebudcrazy/texas-holdem-client:v1.0

docker run --name server --network mynet --ip 110.41.22.67 -p 8081:8081 -d docker.io/rosebudcrazy/texas-holdem-server:1.0