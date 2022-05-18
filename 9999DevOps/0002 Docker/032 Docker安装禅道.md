




docker run --name zentao2 -p 8080:80 -p 3306:3306 --network=zentaonet --ip 172.172.172.173 --mac-address 02:42:ac:11:00:01 -v /www/zentaopms:/www/zentaopms -v /www/mysqldata2:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=123456 -d easysoft/zentao:12.3.3


docker run -it --name zentao2 -p 8089:80 -p 3309:3306 -v /www/zentaopms:/www/zentaopms -v /www/mysqldata2:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=123456 -d easysoft/zentao:12.3.3
