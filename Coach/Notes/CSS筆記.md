# CSS 筆記

## 介紹

CSS 為 **C**ascading **S**tyle **S**heets 的縮寫，它定義了 HTML 的 Style，描述網頁中元件該如何被呈現。

##語法
CSS 由選擇器(Selector)後面跟著一個描述區塊(Declaration Block)組成。

-   選擇器(Selector)：用來選擇要套用 Style 的 HTML 元件，利用元件的 Class、Id 或標籤名稱來選取。
-   描述區塊(Declaration Block)：跟在選擇器後面，用大括號包裹，由 Style 的屬性(Property)及值(Value)所組成。屬性及值中間以分號連結成對，而各對之間則以分號區隔。

例：

```css
/* 選擇器 { 描述區塊 } */
p {
	/* 屬性：值 */
	color: blue;
	display: inline;
	width: 300px;
}
```

##選擇器(Selector)
CSS 利用元件的名稱、Class 或 Id 來選擇要套用樣式的元件。

-   名稱：直接利用 Html 標籤的名稱來選擇要套用樣式的元件。  例如：

    ```css
    h1 {
    	padding: 1em;
    }
    ```

-   Class：許多元件可以同屬一個 Class，利用 “ . ” 後面加上 Class 名稱來表示要設定的 Class 名稱，並在 Html 中利用 class attribute 來指定元件要套用的 CSS。例如：
    ```css
    .round-button {
    	border-radius: 10px;
    }
    <button class="round-button"> round button </button>
    ```
-   Id : 與 Class 不同的是一個 Html 頁面中元件的 Id 必須是唯一的，彼此不能重複，利用 ” # ” 後面加上 Id 名稱來指定 Id 要套用的樣式，並在 Html 中利用 id attribute 來表示要套用的元件。例如：
    ```css
    #unique-id { color: red; }
    <button id="unique-id"> special button </button>
    ```

##組合選擇器
CSS 選擇器能透過幾種不同的組合方式來選擇特定的元件。

-   將選擇器相連接：將名稱和 class 相連或 class 與 class 相連來表示選擇同時符合條件的元件。例如：

    ```css
    .big.round { width : 1000px; border-radius : 200px;}
    <button class="round big"> big & round button </button>
    ```

-   將選擇器以空格分隔:選擇器之間以空格分隔表示在階層之下的元件(後代即可)。例如：
    ```css
    div p { background : #005696; } /* 選擇在 div 中的 p */
    <div>
    	<p>被選擇</p>
    </div>
    ```
    或是
    ```css
    .class1 .class2 {border:1px solid balck;}
    <div class="class1">
    	<div class="middle-class">
    		<button class="class2">被選擇</button> /* 為後代即可 */
    	</div>
    </div>
    ```
-   將選擇器以逗號相連：選擇器以逗號分隔表示各個選擇器所指定的元件皆套用樣式。例如：
    ```css
    th,
    td {
    	padding: 5px;
    } /* th 與 td 皆有 padding 5px */
    ```
-   將選擇器以加號相連：選擇器以加號相連接表示緊接著的元件。例如：
    ```css
    div+p {
    	background:yellow;
    }
    <div>
    	<h1></h1>
    	<p>未被選擇</p>
    </div>
    <p>被選擇</p> /* 緊接著在 div 之後的 p 才會被選擇 */
    ```

更多選擇器組合的方式可參閱：[CSS Selector Reference](https://www.w3schools.com/cssref/css_selectors.asp){:target="\_blank"}

##顏色
在 CSS 中可以利用許多方式表示顏色，常見都方式有直接使用名稱、rgb 函式、Hex color code (十六進制色碼表示法)。

-   顏色名稱：在 CSS 共有 140 種預先定義好的顏色名稱，例如：grey、lightgrey、red、skyblue ......等。
    ```css
    p {
    	background: skyblue;
    }
    ```
-   rgb、rgba 函式：利用指定紅、綠、藍及透明度來表示顏色，0 為全無，255 為全滿，透明度 0 為透明，1 為不透明，rgba(0~255,0~255,0~255,0~1)。
    ```css
    p {
    	background: rgba(120, 62, 33, 0.4);
    }
    ```
-   Hex color code：與 rgba 類似，以#開頭依序以兩碼 16 進制數字表示色碼，依序為紅、綠、藍及透明度，與 rgba 不同的是透明度範圍為 0~255，例：#f5e15613。  亦可將兩碼縮為一碼，若將兩碼縮為一碼，則會自動將其重複，所以有時候也能看到 3 碼或 4 碼的表示法，例：#345 = #334455、#b56e = #bb5566ee。
    ```css
    p {
    	background: #784021;
    }
    ```

##單位

Px em font-size:16px; 100vh 100vw rem

##動畫
