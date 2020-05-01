const { makeExtendSchemaPlugin, gql } = require("graphile-utils");

exports.randomNumber = makeExtendSchemaPlugin((build) => {
	return {
		typeDefs: gql`
			type UserTest {
				name: String
				num: Int
			}
			extend type Query {
				rn: Float
				me: UserTest
			}
		`,
		resolvers: {
			Query: {
				rn: async (_query, args, content, resolveInfo) => {
					const { pgClient } = content;
					try {
						const res = await pgClient.query(
							"select random() as rd;"
						);
						return res.rows[0];
					} catch (e) {
						throw e;
					}
				},
				me: async (_query, args, content, resolveInfo) => {
					const { pgClient } = content;
					try {
						return { name: "Coach" };
					} catch (e) {
						throw e;
					}
				},
			},
		},
	};
});

exports.searchByAPI = makeExtendSchemaPlugin((build) => {
	return {
		typeDefs: gql`
			extend type Query {
				searchByAPI(search: String, limit: Int = 0): [LastDetail]!
			}
		`,
		resolvers: {
			Query: {
				searchByAPI: async (_query, args, content, resolveInfo) => {
					const { pgClient } = content;
					const limit = args.limit <= 0 ? "All" : args.limit;
					try {
						const res = await pgClient.query(
							`select * from last_detail l_d where l_d.id ilike ('%' || $1 || '%') or l_d.name ilike ('%' || $1 || '%') or l_d.spec ilike ('%' || $1 || '%') limit ${limit};`,
							[args.search]
						);
						return res.rows;
					} catch (e) {
						throw e;
					}
				},
			},
		},
	};
});
exports.signUpUser = makeExtendSchemaPlugin((build) => {
	return {
		typeDefs: gql`
			type SignUpUserResponse {
				success: Boolean!
				message: String
				user: User
			}
			extend type Mutation {
				signUpUser(
					account: String!
					name: String!
					hash: String!
				): SignUpUserResponse!
			}
		`,
		resolvers: {
			Mutation: {
				signUpUser: async (_query, args, content, resolveInfo) => {
					const { pgClient } = content;
					try {
						const checkUserRes = await pgClient.query(
							`select id from "users" where id = $1;`,
							[args.account]
						);
						if (checkUserRes.rows.length >= 1) {
							throw new Error("User account already exit.");
						}
						const res = await pgClient.query(
							`insert into "users" (id,name,privlx,status,hash) values ($1,$2,'{staff}','normal',$3) returning * ;`,
							[args.account, args.name, args.hash]
						);
						return {
							success: true,
							message: "success",
							user: res.rows[0],
						};
					} catch (e) {
						throw {
							success: false,
							message: e.toString(),
							user: null,
						};
					}
				},
			},
		},
	};
});
