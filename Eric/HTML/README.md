# HTML Tutorial

----
## HTML Introduction

> HTML (Hypertext Markup Language)並不是一種程式語言，瀏覽器可以讀取HTML檔案，將其彩現成視覺化網頁，目前最新版本為HTML5。

>HTML文件的架構
```text
<!-- Annotation -->
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="author" content="Eric IC Tseng">
    <meta name="description" content="HTML Guide Line.">
    <title>My test page</title>
  </head>
  <body>
    <img src="images/firefox-icon.png" alt="My test image">
    <script type="text/javascript">
    document.write("Hello World!")
    </script>
  </body>
</html>
```
1. ```<!DOCTYPE html>```: 文件類型(doctype)
2. ```<html></html>```:元素包住所有網頁內容
3. ```<head></head>```:包含搜尋結果的作者、頁面說明、CSS、關鍵字、網頁Icon等資訊，不顯示於網頁上
4. ```<meta charset="utf-8">```:指定使用utf-8字元編碼(推薦)
5. ```<title></title>```:分頁標籤
6. ```<body></body>```:顯示於網頁上的內容
7. ```<!-- Annotation -->```:註解
8. ```<script type="text/javascript"></script>```:插入javascript code
9. 輸入html + Tab 快捷鍵生成(Emmet)
>HTML元素組成

![HTML ELEMENT](https://mdn.mozillademos.org/files/9347/grumpy-cat-small.png)

>HTML可包含屬性

![HTML ATTRIBUTE](https://mdn.mozillademos.org/files/9345/grumpy-cat-attribute-small.png)

>巢狀元素
```text
EX. <p>My cat is <strong> very </strong> grumpy.</p>
```

> 空元素
```text
EX. <img src="images/firefox-icon.png" alt="My test image">,<br>
```
> 特殊字元

字元| 字元引用  
----|:-----
<   | \&lt;
&gt;| \&gt;
"   | \&quot;
'   | \&apos;
&   | \&amp; 

> End
----
## HTML Basic
1. Basic

Html Tag| Description  
----|:-----
[h1-6]()| headings 
[p]()| paragraphs
[br]()| single line break
[hr]()| Horizontal Line 
[img]()| image
[em]()| emphasis
[strong]()| strong importance
[center]()| center tag  
[header]()| Defines a header for a document or section
[div]()| Defines a header for a document or section


1. Lists

Html Tag| Description  
----|:-----
[ul]()| Define unordered lists
[ol]()| Ordered lists
[li]()| list
[dl]()| Defines a description list
[dt]()| Defines a term/name in a description list
[dd]()| Defines a description of a term/name in a description list

2. Table

Html Tag| Description  
----|:-----
[ul]()| Define unordered lists
[ol]()| Ordered lists
[li]()| list
[dl]()| Defines a description list
[dt]()| Defines a term/name in a description list
[dd]()| Defines a description of a term/name in a description list
3. Form

Html Tag| Description  
----|:-----
[form]()| 
[input]()| 
[textarea]()| 
[select]()| 
[outgroup]()| 
[options]()| 
[label]()| 
[output]()| 

4. Video & Audio

Html Tag| Description  
----|:-----
[audio]()| 
[source]()| 
[track]()| 
[video]()| 

5. HTML5



----
## HTML Advance

<!-- ----
## markdown quick reference

<!-- # headers
*emphasis*

1. Write markdown text in this textarea.
2. Click 'HTML Preview' button.

**strong**

* list

>block quote

    code (4 spaces indent)

[links](https://wikipedia.org) --> 

----
## changelog
* 28-Jan-2020 design

----
## Related pages
* [MDN web docs](https://github.com/evilstreak/markdown-js)
* [w3schools.com](https://github.com/evilstreak/markdown-js)
* [Emmet Cheat Sheet](https://docs.emmet.io/cheat-sheet/)

