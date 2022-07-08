export default {
    state: {
        items: [],
        fields: {},
        users: [],
        deals: []
    },
    mutations:{
        setItems(state, items) {
            state.items = items
        },
        setUsers(state, users) {
            state.users = users
        },
        setFields(state, fields) {
            state.fields = fields
        },
        setDeals(state, deals) {
            state.deals = deals
        },
        clearInfo(state) {
            state.items = []
            state.fields = {}
            state.users = []
            state.deals = []
        }
    },
    actions: {

        fetchFields({commit, dispatch}){ // у нас калбэк функции по-этому сначало загружаем титульные поля
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
                        dispatch('fetchUsers')  // загружаем пользователей
                    }
                }
            );
        },

        fetchUsers({commit, dispatch}){ 
            BX24.callMethod(
                'user.get',
                "ASC",
                function(result)
                {
                    if(result.error())
                        alert("Error: " + result.error());
                    else{
                        let users = result.data()
                        commit('setUsers', users)
                        dispatch('fetchDeals')
                    }
                }
            );
        },

        fetchDeals({commit, dispatch}){
            BX24.callMethod(
                "crm.deal.list", 
                { 
                    select: [ "ID", "TITLE" ]
                }, 
                function(result) 
                {
                    if(result.error())
                        console.log(result.error());
                    else
                    {

                        let deals = result.data()
                        commit('setDeals', deals)			
                        dispatch('fetchItems')					
                    }
                }
            );	
        },

        fetchItems({commit}){ // калбек на ячейки
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
    },
    getters: {
        deals: s => s.deals,
        users: s => s.users,
        items: s => s.items,
        fields: s => s.fields,
    }
}