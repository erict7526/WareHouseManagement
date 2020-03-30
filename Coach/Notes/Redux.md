# Redux

Redux 為一種程式撰寫的架構，旨在降低應用結構的複雜度，利用管理單一 **Store(State)**，使得應用的行爲直覺、可以預期。

Redux 主要分為３個部分：

-   actions
-   reducer
-   store

actions 定義了能改變 State 的方式，reduer 則描述 action 如何改變 State，而 Store 就是這些 reducer 的集合，同時也是 State 本身。

## actions

