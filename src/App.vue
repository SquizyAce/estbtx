<template>
  <div id="app">
<div>
  <b-navbar type="dark" variant="dark">
    <b-navbar-nav>
      <b-nav-item href="#" @click="showModal">Добавить</b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</div>


    <b-table striped hover :items="clearTh" :fields="clearField"></b-table>

  <div>
    <b-modal ref="my-modal" size="lg" hide-footer title="Using Component Methods">
      <div class="d-block text-center">

        <b-form-group label="Тип расхода" label-for="name-input">
          <b-form-select v-model="selected" :options="options"></b-form-select>
        </b-form-group>

        <b-form-group label="Назначения платежа" label-for="name-input">
          <b-form-input v-model="payname" id="text" type="text"></b-form-input>
        </b-form-group>

        <b-form-group label="Планируемая дата оплаты" label-for="name-input">
          <b-form-input v-model="trueDate" id="date" type="date"></b-form-input>
        </b-form-group>

        <b-form-group label="Фактическая дата оплаты" label-for="name-input">
          <b-form-input v-model="realDate" id="date" type="date"></b-form-input>
        </b-form-group>

        <b-form-group label="Сумма расхода" label-for="name-input">
          <b-form-input v-model="payment" id="number" type="number"></b-form-input>
        </b-form-group>

        <b-form-group label="Поле связь со сделкой" label-for="name-input">
          <b-form-select v-model="selected" :options="options"></b-form-select>
        </b-form-group>

        <b-form-group label="Ответственный " label-for="name-input">
          <b-form-select v-model="selected" :options="options"></b-form-select>
        </b-form-group>

        

      </div>
      <b-button class="mt-3" variant="outline-info" block @click.prevent="elemAd()">Добавить</b-button>
    </b-modal>
  </div>


  </div>
  
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
export default {
  data: () => ({
    clearTh: {},
    clearField: [],
    selected: null,
    payname: '',
    trueDate: '',
    realDate: '',
    payment: null,
        options: [
          { value: null, text: 'Please select an option' },
          { value: 'a', text: 'This is First option' },
          { value: 'b', text: 'Selected Option' },
          { value: { C: '3PO' }, text: 'This is an option with object value' },
          { value: 'd', text: 'This one is disabled', disabled: true }
        ]
  }),
  async mounted() {
    console.log(BX24.getAuth())
    await this.$store.dispatch('fetchFields')
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
                        console.log(result.data())
                    }
                }
            );
  },
  methods: {
    showModal() {
        this.$refs['my-modal'].show()
      },
    elemAd() {
      const formData = {
        payname: this.payname,
        trueDate: this.trueDate,  
        realDate: this.realDate,
        payment: this.payment    
      }
      console.log(formData)

      var params = {
      'IBLOCK_TYPE_ID': 'lists',
      'IBLOCK_ID': '33',
      'ELEMENT_CODE': uuidv4(),
      'FIELDS': {
          'NAME': 'Test element 1',
          // 'PROPERTY_123': { 'n0': },
          'PROPERTY_125': { 'n0': this.payname },
          'PROPERTY_127': { 'n0': this.trueDate },
          'PROPERTY_129': { 'n0': this.realDate },
          'PROPERTY_131': { 'n0': this.payment },
          'PROPERTY_133': { 'n0': 1 },
          'PROPERTY_135': { 'n0': 7 },
          
      }
      }      
      BX24.callMethod(
      'lists.element.add',
      params,
      function(result)
      {
            if(result.error())
              alert("Error: " + result.error());
          else
              console.log("Success: " + result.data());
      }
      );      
      this.$router.go()
    }
  },
  computed: {
    items() {
      return this.$store.getters.items
    },
    fields() {
      return this.$store.getters.fields
    }
  },
  watch: {

    items() {
      this.clearTh = this.items.map(function(sort) {
        let clear = []
        for (const [key, value] of Object.entries(sort)) {
        if (key.includes('PROPERTY_') || key === 'ID')
        {
          if (typeof value === 'object')
          for (const [key1, value1] of Object.entries(value)) {
            sort[key] = value1
            
          }
          clear[key] = sort[key]
        }
        
      }
      return clear
      })
    },

    fields() {
      let clear = [{key: 'ID', label: 'ID'},]
      for (const [key, value] of Object.entries(this.fields)) {
        if (key.includes('PROPERTY_'))
        clear.push({'key': key, label: value.NAME})
      }
      this.clearField = clear
    }





  }
}
</script>

<style lang="scss">

</style>
