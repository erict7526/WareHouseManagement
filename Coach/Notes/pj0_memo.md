# 南區廠領料入料流程

## user_ppp_pre_out

#### switch

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
-   case 4:<br>v2=1,v=2<br>
    func="renew"，重新來過，將 session action 清空。

-   case 5:<br>v2=-1,v=-1<br>
    func="finished"，準備產生領料單。


    1. 從 ppp_pre_out_nox 拿下一個編號。
    2. 在資料庫裡加入領料單。

    ```javascript
    insert into ppp_pre_out
       {
       	nox: ppp_pre_out_no,
       	out_date:RUQUEST.outdate,
       	users_name:REQUEST.user_name,
       	dependx_no:REQUEST.dependx_no,
       	dependx_descr:REQUEST.dependx_descr,
       	change_status:"new",
       	status:"normal"
       }
    ```

    3. 將 Sheet_goods_list 內物品加入 ppp_pre_out_goods。

    ```javascript
    insert into ppp_pre_out_goods
    	{
    		ppp_pre_out_nox:ppp_pre_out_nox,
    		product_no:LAST.product_no,
    		typex_no:LAST.typex_no,
    		out_count:REQUEST.countx,
    		users_name:REQUEST.user_name,
    		change_status:"new",
    		status:"normal"
    	}
    ```

    4. 列印領料單

    ```javascript
    window.open(
    	"/pj0/content/print/printing/ppp_pre_out_print.jsp?ppp_pre_out_nox=" +
    		ppp_pre_out_nox
    );
    ```

#### view

## user_ppp_in
