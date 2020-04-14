# 南區廠領料入料流程

## user_ppp_pre_out

switch

-   case 1:<br>v2=1,v=2<br>
    從 request 檢查領料人員：user_name、用途說明：dependx_descr、領料依據：dependx_no(資料庫內代碼)、填單日期：out_date，確定都有值，並把它設為 Sheet(領料單)的 property。

-   case 2:<br>v2=1,v=2<br>
    func = "item_del"會進到這裡，刪除 Sheet 內 goods_list 指定 index
    元素，將已經加入 Sheet_goods_list 內指定元素刪除。

-   case 3:<br>v2=1,v=2<br>
    func = "catch"會來到這，主要功能為根據編號(id)加入物品。先檢查 request 中 id、料品狀態:typex_no、領取數量:countx，是否皆合法。
    先檢查 id 是否在 LAST 內。
    ```
    if(編號(id)物品 not in Sheet_goods_list && REQUEST.countx <= LAST.countx){
    	將物品資料加入 Sheet_goods_list，包含：
    	{	// Get from LAST
    		LAST.product_no
    		LAST.id,
    		LAST.name,
    		LAST.spec,
    		LAST.unit,
    		LAST.typex_no,
    		REQUEST.countx,
    	}
    }
    ```
