# Redux

Redux 為一種程式撰寫的架構，旨在降低應用結構的複雜度，利用管理單一 **Store(State)**，使得應用的行爲直覺、可以預期。

Redux 主要分為３個部分：

-   actions
-   reducer
-   store

actions 定義了能改變 State 的方式，reduer 則描述 action 如何改變 State，而 Store 就是這些 reducer 的集合，同時也是 State 本身。

redux 將 component 分為兩種，一種為 container components 負責處理資料，可以知道 Store 的存在；另一種為 presentational components，負責資料的呈現，資料以 props 的方式傳入，presentational components 並不知道 Store 的存在。

## actions

actions 定義了可對 Store 所做的動作，action 其實為一個物件，通常包含 type 這個屬性，用以區分不同的動作，其他屬性則為更新 Store 所需的資訊，例：

```javascript
{ type: ADD_TODO, text: "" }
```

就為一個加入待辦事項的 action ，而 text 就是要加入的內容。

當在撰寫 action 時，我們定義一個 function 會 return 所對應的 action，例：

```javascript
function addTodo(text) {
	return { type: ADD_TODO, text };
}
```

action 定義好了之後，使用 `dispatch`(派送)來執行 action，例：

```
dispatch(addTodo("Learn Redux!"))
```

一個 action 要如何的真正影響 State，需要靠 reducers 來定義，reducer 決定了一個 action 要如何的改變 State。

## Reducers
