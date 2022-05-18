# Flutter

## Dart

```dart
https://dart.dev/tools/dartpad
https://dartpad.cn/
Online Dart Compile

// 初始化均为 
null
  
// null 校验
?. 运算符在左边为null的情况下会阻断右边的调用
?? 运算符主要作用是在左侧表达式为null时为其设置默认值
  
Future
  
async
await
  
```



## 声明式UI

```

```



## Flutter

```shell
widget

# flutter create
flutter create <projectname>
# flutter run 
flutter run -d 'iPhone X'

# IDE
new Flutter Project
run


# 包导入



# 文件结构

# 文件资源

# 文件依赖


https://pub.dev/



```

![001](/Users/draven/Desktop/001.png)

## Views

widgets

有状态

无状态





## 布局列表



## 状态管理



## 路由与导航



## 表单输入



## 第三方交互





https://tinypng.com

# Flutter中文社区



# 环境搭建

https://flutterchina.club/

```shell
# 过程比较复杂
# Android Studio
https://developer.android.google.cn/studio/

# VS code
略

# SDK
# Stable channel
https://flutter.dev/docs/development/tools/sdk/releases

# xcode
```



# Demo

```dart
import 'package:flutter/material.dart';

void main() => runApp(new MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return new MaterialApp(
      title: 'Welcome to Flutter',
      home: new Scaffold(
        appBar: new AppBar(
          title: new Text('Welcome to Flutter'),
        ),
        body: new Center(
          child: new Text('Hello World'),
        ),
      ),
    );
  }
}
```

