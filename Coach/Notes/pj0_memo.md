# 南區廠領料入料流程

## user_ppp_pre_out

#### Switch

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
        {   // Get from LAST
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

#### View

## user_ppp_in

#### Switch

-   case 1: <br>v2=1,v=2<br>
    新頁面，新增入料單(Sheet)，檢查 Request 參數數值皆合法，將 Request 數值指派給 Sheet。
    ```json
    {
        "填單日期": "in_date",
        "驗收日期": "check_date",
        "進料人員": "user_name",
        "依據": "dependx_no",
        "依據說明": "dependx_descr",
        "交貨廠商": "in_company"
    }
    ```
-   case 2:<br>v2=1,v=2<br>
    func = "item_del",delect goods from Sheet_goods_list by list index.

-   case 3:<br>v2=1,v=2<br>
    func == "new_good_in" (新增物品料號) or func == "catch" && methodxx == 1 (已具有料號之物品入庫)

    1.  若為新增物品料號：先檢查物品編號(id)是否已經出現在資料庫內("select \* from PRODUCT where status='normal' and id='"+id+"'")，若無則將物品加入 table product：

    ```json
    {
        "編號": "id",
        "名稱": "name",
        "規格": "spec",
        "單位": "unit",
        "狀態": "status"
    }
    ```

    之後檢查物品是否已經在 Sheet_goods_product，若無，將物品資料加入 Sheet_goods_list，包含：

    ```json
    {
        "no": "PRODUCT.no",
        "id": "PRODUCT.id",
        "name": "PRODUCT.name",
        "spec": "PRODUCT.spec",
        "unit": "PRODUCT.unit",
        "typex_no": "REQUEST.typex_no(新購品或整修品)",
        "pricex": "REQUEST.pricex(單價)",
        "countx": "REQUEST.countx"
    }
    ```

    2. func == "catch"，跳過新增物品料號，直接進入加入 Sheet_goods_list。

-   case 4: <br>從 session 中移除 sheet。重置。

-   case 5: <br>v2=-1,v=-1<br>
    func = "finished"，先確定 Sheet_goods_list 不為空，再來從 ppp_pre_in_nox 拿單號，之後將領料單資訊加入 table ppp_pre_in `insert into ppp_pre_in`：
    ```json
    {
        "nox": "SHEET.ppp_pre_in_nox",
        "check_ok_date": "SHEET.check_ok_date(驗收日期)",
        "in_date": "填單時間",
        "classx_3_no": 1,
        "company": "in_company(交貨廠商)",
        "users_name": "進料人員",
        "dependx_no": "依據",
        "dependx_descr": "用途說明",
        "change_status": "new",
        "status": "normal"
    }
    ```
    然後將 Sheet_goods_list 內的物品加入 table ppp_pre_in_goods `insert into ppp_pre_in_goods`:
    ```json
    {
        "ppp_pre_in_nox": "SHEET.ppp_pre_in_nox",
        "typex_no": "REQUEST.typex_no(新購品或整修品)",
        "product_no": "SHEET.product_no",
        "in_count": "REQUEST.countx",
        "unitprice": "REQUEST.pricex(單價)",
        "users_name": "SHEET.user_name",
        "change_status": "new",
        "status": "normal"
    }
    ```
    註：
    要是 crrp 才能直接新增料號，才會有 case6、７還有 product_no == -100 的情況。
