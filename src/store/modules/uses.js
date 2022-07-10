import router from '@/router';
import { v4 as uuidv4 } from 'uuid';
export default {
    actions: {
        deleteItem({}, id){
            console.log(id)
            var params = {
                'IBLOCK_TYPE_ID': 'lists',
                'IBLOCK_ID': '33',
                'ELEMENT_ID': id
            };
            BX24.callMethod(
                'lists.element.delete',
                params,
                function(result)
                {
                    if(result.error())
                        alert("Error: " + result.error());
                    else
                    router.go()
                }
            );
        },
        addItem({}, {payname, trueDate, realDate, payment, typePayment, dealJoin, selected }){
            var params = {
                'IBLOCK_TYPE_ID': 'lists',
                'IBLOCK_ID': '33',
                'ELEMENT_CODE': uuidv4(),
                'FIELDS': {
                    'NAME': 'Test element 1',
                    'PROPERTY_123': { 'n0': typePayment},
                    'PROPERTY_125': { 'n0': payname },
                    'PROPERTY_127': { 'n0': trueDate },
                    'PROPERTY_129': { 'n0': realDate },
                    'PROPERTY_131': { 'n0': payment },
                    'PROPERTY_133': { 'n0': dealJoin },
                    'PROPERTY_135': { 'n0': selected },
                    
                }
            }
            console.log(params)
            BX24.callMethod(
                'lists.element.add',
                params,
                function(result)
                {
                      if(result.error())
                        alert("Error: " + result.error());
                    else
                        router.go()
                }
            );   
        },
        editItem({}, {payname, trueDate, realDate, payment, typePayment, dealJoin, selected, id }){
            var params = {
                'IBLOCK_TYPE_ID': 'lists',
                'IBLOCK_ID': '33',
                'ELEMENT_ID': id,
                'FIELDS': {
                    'NAME': 'Test element 1',
                    'PROPERTY_123': { 'n0': typePayment},
                    'PROPERTY_125': { 'n0': payname },
                    'PROPERTY_127': { 'n0': trueDate },
                    'PROPERTY_129': { 'n0': realDate },
                    'PROPERTY_131': { 'n0': payment },
                    'PROPERTY_133': { 'n0': dealJoin },
                    'PROPERTY_135': { 'n0': selected },
                }
               };
               BX24.callMethod(
                'lists.element.update',
                params,
                function(result)
                {
                    if(result.error())
                        alert("Error: " + result.error());
                    else
                        router.go()
                }
               );
        }
    }
}