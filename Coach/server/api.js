const { makeExtendSchemaPlugin, gql } = require("graphile-utils");

exports.randomNumber = makeExtendSchemaPlugin(build => {
	return {
		typeDefs: gql`
			extend type Query {
				rn: Float
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
				}
			}
		}
	};
});

exports.searchByAPI = makeExtendSchemaPlugin(build => {
	return {
		typeDefs: gql`
			extend type Query {
				searchByAPI(search: String): [LastDetail]!
			}
		`,
		resolvers: {
			Query: {
				searchByAPI: async (_query, args, content, resolveInfo) => {
					const { pgClient } = content;
					try {
						const res = await pgClient.query(
							`select * from last_detail l_d where l_d.id ilike ('%' || $1 || '%') or l_d.name ilike ('%' || $1 || '%') or l_d.spec ilike ('%' || $1 || '%');`,
							[args.search]
						);
						return res.rows;
					} catch (e) {
						throw e;
					}
				}
			}
		}
	};
});
