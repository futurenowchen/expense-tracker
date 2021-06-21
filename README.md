# restaurant_project

## About The Project
  This is a ALPHA Camp 2-3 exercise website which can record cost and it's category.

## Prerequisites
+ Bootstrap v5.0
+ jquery v3.3.1
+ popper
+ node v10.15.0
+ express v4.17.1
+ express-handlebars v5.3.2
+ body-parser v1.19.0
+ mongoose v5.12.13
+ method-override v3.0.0
+ heroku v7.54.1
+ Font Awesome

## installation and execution
1. clone this repository to your computer.
 ```
 $ git clone https://github.com/futurenowchen/expense-tracker.git
 ```
2. install the library.
 ```
 $ npm i express express-handlebars body-parser mongoose
 ```
3. run the seeder data
```
 $ node models/seeds/categorySeeder.js && node models/seeds/recordSeeder.js
```
4. start this website.
 ```
 $ npm run dev
 ```
or
 ```
 $ nodemon app.js
 ```
## Features
### Version 1
+ 使用者可以瀏覽「老爸的私房錢」資料庫中所有的支出明細。
+ 使用者可以瀏覽「老爸的私房錢」資料庫中所有的支出總額。
+ 使用者可以新增、刪除、修改所有支出（一次一筆）。
+ 使用者可以透過類別篩選不同的支出總額。