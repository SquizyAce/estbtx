export default {
    state: {
        items: [],
        fields: {}
    },
    mutations:{
        setItems(state, items) {
            state.items = items
        },
        setFields(state, fields) {
            state.fields = fields
        },
        clearInfo(state) {
            state.items = []
            state.fields = {}
        }
    },
    actions: {
        fetchItems({commit}){
            let params = {
                'IBLOCK_TYPE_ID': 'lists',
                'IBLOCK_ID': '33',
            }
            BX24.callMethod(
                'lists.element.get',
                params,
                function(result)
                {
                    if(result.error())
                        alert("Error: " + result.error());
                    else{
                        let items = result.data()
                        commit('setItems', items)
                    }
                }
            );
        },
        fetchFields({commit}){
            let params = {
                'IBLOCK_TYPE_ID': 'lists',
                'IBLOCK_ID': '33',
            }
            BX24.callMethod(
                'lists.field.get',
                params,
                function(result)
                {
                    if(result.error())
                        alert("Error: " + result.error());
                    else{
                        let fields = result.data()
                        commit('setFields', fields)
                    }
                }
            );
        },
    },
    getters: {
        items: s => s.items,
        fields: s => s.fields
    }
}