const Airtable = require('airtable');
    
    module.exports = function (api, opts) {
        const base = new Airtable({apiKey: opts.apiKey}).base(opts.base);
        
        api.loadSource(async store => {
            const contentType = store.addContentType({
                typeName: 'Product',
                route: '/products/:slug',
            });
            
            contentType.addSchemaField('price', ({ graphql }) => ({
                    type: graphql.GraphQLFloat,
                    resolve (node) {
                        return node.fields.price;
                    }
                }));
                
            await base('Market Research').select().eachPage((records, fetchNextPage) => {
                records.forEach((record) => {
                    const item = record._rawJson;
                    
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