const Airtable = require('airtable');
    
    module.exports = function (api, opts) {
      console.log('Datasource loading: airtable products')
        const base = new Airtable({apiKey: opts.apiKey}).base(opts.base);
        
        api.loadSource(async store => {
            const contentType = store.addContentType({
                typeName: 'Airtable',
                route: '/air-db/:id',
            });
            contentType.addSchemaField("title", ({ graphql }) => ({
              type: graphql.GraphQLString,
              resolve(node) {
                return node.title;
              }
            }));
            contentType.addSchemaField("path", ({ graphql }) => ({
              type: graphql.GraphQLString,
              resolve(node) {
                return node.path;
              }
            }));
            contentType.addSchemaField("date", ({ graphql }) => ({
              type: graphql.GraphQLString,
              resolve(node) {
                return node.date;
              }
            }));
            contentType.addSchemaField("content", ({ graphql }) => ({
              type: graphql.GraphQLString,
              resolve(node) {
                return node.content;
              }
            }));
            contentType.addSchemaField("excerpt", ({ graphql }) => ({
              type: graphql.GraphQLString,
              resolve(node) {
                return node.excerpt;
              }
            }));
            contentType.addSchemaField("slug", ({ graphql }) => ({
              type: graphql.GraphQLString,
              resolve(node) {
                return node.slug;
              }
            }));
            contentType.addSchemaField('price', ({ graphql }) => ({
                    type: graphql.GraphQLFloat,
                    resolve (node) {
                        return node.price;
                    }
                }));
                
            await base('Market Research').select().eachPage((records, fetchNextPage) => {
                records.forEach((record) => {
                  // console.log('************   Airtable record: ', record)
                    const item = record._rawJson;
                    // console.log('record._rawJson: ',item)
                    
                    contentType.addNode({
                        id: item.id,
                        title: item.fields.Name,
                        fields: item.fields,
                        content: item.fields.Description,
                    });
                });
                fetchNextPage();
            });
        });
    };