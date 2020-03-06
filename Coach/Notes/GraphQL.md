# GraphQL

## 簡介

GraphQL 為ㄧ種查詢 _**語言**_ (query language)，由 Facebook 提出，可以用來設計 API 以及 Runtime 時取得資料。GraphQL 使用 Type System 將資料結構化，借由定義各種不同的資料類別，並相互組合，我們描述的為資料之間的關係 _**拓樸圖**_，這樣的結構使得 GraphQL 靈活且彈性，可以快速的描述所需要的資料，並僅取得所需資料。也可以介接不同架構的 API 以及資料庫(Database)，使用上非常彈性。

在後端我們對每個資料類型及其中的屬性(Fields)寫定取得方式，GraphQL 則會依前端所送來的 Query 來返回使用者所需的資料。

```gql
type Query {
	me: User
}
# Query 為保留字 表示使用者可以索取的資料類型

type User {
	id: ID
	name: String
}
```

```javascript
function Query_me(request) {
	return request.auth.user;
}

function User_name(user) {
	return user.getName();
}
```

GraphQL 在各個語言有不同的實作方式，官網上的教學文件為概念性的說明 GraphQL 的精神，若想要實際實作請參考官網的 [Code](https://graphql.org/code/)。

## Queries

如何向後端索取資料？ 使與資料類型同結構的架構來向後端索要資料。例如：

```gql
{
	hero {
		name
		friends {
			name
		}
	}
}
```

得到

```json
{
	"data": {
		"hero": {
			"name": "R2-D2",
			"friends": [
				{
					"name": "Luke Skywalker"
				},
				{
					"name": "Han Solo"
				},
				{
					"name": "Leia Organa"
				}
			]
		}
	}
}
```

這樣就完成了一次 Query。 一次 Query 就能得到與此資料類別相關的其他資料，不需要額外請求。以往不是一次拿到全部資料，不然就得針對不同屬性一個一個請求資料。

---

Queries 也可以傳入參數，指定特定要求的資料(當然後端需實做)，像是：

```gql
{
	human(id: "1000") {
		name
		height(unit: FOOT)
	}
}
```

得到

```json
{
	"data": {
		"human": {
			"name": "Luke Skywalker",
			"height": 5.6430448
		}
	}
}
```

---

而我們也可以針對不同的 Queries 取別名(Aliases)，以區別 _**同一個資料類型**_ 不同參數所返回的結果，例如：

```gql
{
	empireHero: hero(episode: EMPIRE) {
		name
	}
	jediHero: hero(episode: JEDI) {
		name
	}
}
```

得到

```json
{
	"data": {
		"empireHero": {
			"name": "Luke Skywalker"
		},
		"jediHero": {
			"name": "R2-D2"
		}
	}
}
```

## Mutations

若要改變資料，在伺服端定義 type Mutation ，在 Mutation 裡寫下能使用的方法以及其結構，須在伺服端另外實作方法，如：

```gql
type Mutation {
	bookTrips(launchIds: [ID]!): TripUpdateResponse!
	cancelTrip(launchId: ID!): TripUpdateResponse!
	login(email: String): String
}
```

在客戶端使用：

```gql
mutation BookTrips {
	bookTrips(launchIds: [67, 68, 69]) {
		success
		message
	}
}
```

得到

```json
{
	"data": {
		"bookTrips": {
			"success": true,
			"message": "trips booked successfully"
		}
	}
}
```

## Type system

GraphQL 為查詢語言，GraphQL 基本上就是在選擇想要的資料，所送出的請求與所得到的結果有著相同的結構，所以易於使用。
