**## 脚本

docker run --name zentao2 -p 8080:80 -p 3306:3306 --network=zentaonet --ip 172.172.172.173 --mac-address 02:42:ac:11:00:01 -v /www/zentaopms:/www/zentaopms -v /www/mysqldata2:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=123456 -d easysoft/zentao:17.6

docker run -it --name zentao -p 8089:80 -p 3309:3306 -v /www/zentaopms:/www/zentaopms -v /www/mysqldata2:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=123456 -d easysoft/zentao:17.6

## my.php

```php
<?php
$config->installed       = true;
$config->debug           = false;
$config->requestType     = 'PATH_INFO';
$config->timezone        = 'Asia/Shanghai';
$config->db->host        = '127.0.0.1';
$config->db->port        = '3306';
$config->db->name        = 'zentao';
$config->db->user        = 'root';
$config->db->encoding    = 'UTF8';
$config->db->password    = '123456';
$config->db->prefix      = 'zt_';
$config->webRoot         = getWebRoot();
$config->default->lang   = 'zh-cn';
```**





