export default {
    state: {
        items: [],
        fields: {},
        users: [],
        deals: [],
        dealsPay: [],
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
        setDealsPay(state, dealsPay) {
            state.dealsPay = dealsPay
        },
        clearInfo(state) {
            state.items = []
            state.fields = {}
            state.users = []
            state.deals = []
            state.dealsPay = []
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
                        let users = {}
                        for (const[key, value] of Object.entries(result.data()))
                        {
                            users[value.ID] = value.LAST_NAME + ' ' + value.NAME
                        }
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
                    select: [ "ID", "TITLE", "OPPORTUNITY" ]
                }, 
                function(result) 
                {
                    if(result.error())
                        console.log(result.error());
                    else
                    {

                        let deals = {}
                        let dealsPay = {}
                        for (const[key, value] of Object.entries(result.data()))
                        {
                            deals[value.ID] = value.TITLE
                            dealsPay[value.ID] = value.OPPORTUNITY
                        }
                        commit('setDeals', deals)	
                        commit('setDealsPay', dealsPay)		
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
        dealsPay: s => s.dealsPay,
        users: s => s.users,
        items: s => s.items,
        fields: s => s.fields,
    }
}