<template>
  <div id="app">
<div>
  <b-navbar type="dark" variant="dark">
    <b-navbar-nav>
      <b-nav-item href="#" @click="showModal()">Добавить</b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</div>


    <b-table striped hover :items="clearTh" :fields="clearField">
      <template #cell(PROPERTY_BTN) = row>
        <b-button size="sm" @click="showEditElem(row.item)" class="mr-2">
          <b-icon-pen></b-icon-pen>
        </b-button>
        <b-button size="sm" @click="deleteElem(row.item.ID)" class="mr-2">
          <b-icon-backspace></b-icon-backspace>
        </b-button>
      </template>
    </b-table>

  <div>
    <b-modal ref="my-modal" size="lg" hide-footer title="Using Component Methods">
      <div class="d-block text-center">

        <b-form-group label="Тип расхода">
          <b-form-select v-model="typePayment" :options="fields.PROPERTY_123.DISPLAY_VALUES_FORM"></b-form-select>
        </b-form-group>

        <b-form-group>
          <label for="name-input">Назначения платежа <small style="color: red;" v-if="!$v.payname.required">(необходимо заполнить)</small></label>
          <b-form-input v-model="payname" type="text"></b-form-input>
          
        </b-form-group>

        <b-form-group label="Планируемая дата оплаты">
          <b-form-input v-model="trueDate"  type="date"></b-form-input>
        </b-form-group>

        <b-form-group label="Фактическая дата оплаты">
          <b-form-input v-model="realDate" type="date"></b-form-input>
        </b-form-group>

        <b-form-group>
          <label for="">Сумма расхода <small style="color: red;" v-if="!$v.payment.required">(необходимо заполнить)</small></label>
          <b-form-input v-model="payment" type="number"></b-form-input>
        </b-form-group>

        <label for="">Поле связь со сделкой <small style="color: red;" v-if="!$v.dealJoin.required">(необходимо выбрать)</small></label>
        <b-form-group>
          <b-form-select v-model="dealJoin" :options="deals"></b-form-select>
        </b-form-group>

        <label for="">Ответственный <small style="color: red;" v-if="!$v.selected.required">(необходимо выбрать)</small></label>
        <b-form-group>
          <b-form-select v-model="selected" :options="users"></b-form-select>
        </b-form-group>

        

      </div>
      <b-button  v-if="editadd" class="mt-3" variant="outline-info" block @click.prevent="elemAd()">Добавить</b-button>
      <b-button  v-if="!editadd" class="mt-3" variant="outline-info" block @click.prevent="elemEdit()">Изменить</b-button>
    </b-modal>
  </div>

      <div class="layer2">
        <b-card>
          Расчёт по <b-form-select v-model="dealCount" :options="deals"></b-form-select>
          <b-card-text>
            Сумма расходов: {{this.countData.AllPay}}<br>
            Сумма тип расхода а: {{this.countData.TypeA}} <br>
            Сумма тип расхода б: {{this.countData.TypeB}} <br>
            Общая сумма расходов по типам: {{countData.ABPay}}<br>
            Маржинальность: {{this.countData.Profit}}%<br>
          </b-card-text>
        </b-card>
      </div>

  </div>
  
</template>

<script>
import {required} from 'vuelidate/lib/validators'
export default {
  data: () => ({
    clearTh: [],
    clearField: [],
    typePayment: null,
    dealJoin: null,
    selected: null,
    payname: '',
    trueDate: '',
    realDate: '',
    payment: null,
    editadd: false,
    id: null,
    dealCount: null,
    countData: {}
  }),
  async mounted() {
    console.log(BX24.getAuth())
    await this.$store.dispatch('fetchFields')
  },

  
  methods: {
    showModal() {
        this.editadd = true
        this.$refs['my-modal'].show()
      },
    async deleteElem(id) {
        await this.$store.dispatch('deleteItem', id)
      },
    async showEditElem(item){
      if (item.PROPERTY_129)
      this.realDate  = (item.PROPERTY_129).replace(/([0-9]{2}).([0-9]{2}).([0-9]{4})/, '$3-$2-$1');
      if (item.PROPERTY_127)
      this.trueDate  = (item.PROPERTY_127).replace(/([0-9]{2}).([0-9]{2}).([0-9]{4})/, '$3-$2-$1');
      this.editadd = false
      this.selected = item.selected
      this.dealJoin = item.dealJoin
      this.payment = item.PROPERTY_131
      this.payname = item.PROPERTY_125
      this.typePayment = item.typePayment
      this.id = item.ID
      this.$refs['my-modal'].show()
    },
    async elemAd() {
      if (this.$v.$invalid){
        this.$v.touch()
        return
      }
      
      const formData = {
        payname: this.payname,
        trueDate: this.trueDate,  
        realDate: this.realDate,
        payment: this.payment,
        typePayment: this.typePayment,
        dealJoin: this.dealJoin,
        selected: this.selected   
      }
      console.log(this.trueDate, this.realDate, typeof this.trueDate, typeof this.realDate)
      await this.$store.dispatch('addItem', formData)
    },
    async elemEdit() {
      if (this.$v.$invalid){
        this.$v.touch()
        return
      }
      const formData = {
        payname: this.payname,
        trueDate: this.trueDate,  
        realDate: this.realDate,
        payment: this.payment,
        typePayment: this.typePayment,
        dealJoin: this.dealJoin,
        selected: this.selected,  
        id: this.id 
      }
      await this.$store.dispatch('editItem', formData)
    }
  },


  computed: {
    items() {
      return this.$store.getters.items
    },
    fields() {
      return this.$store.getters.fields
    },
    deals() {
      return this.$store.getters.deals
    },
    dealsPay() {
      return this.$store.getters.dealsPay
    },
    users() {
      return this.$store.getters.users
    }
  },
  validations: {
    payname: {required},
    payment: {required},
    dealJoin: {required},
    selected: {required}
  },
  watch: {

    dealCount() {
      this.countData = {
        TypeA: null,
        TypeB: null,
        AllPay: null,
        ABPay: null,
        Profit: null
    }
      this.clearTh.forEach(elem => {
        if(this.dealCount === elem.dealJoin)
        {
          if (elem.typePayment == 93 || elem.typePayment == 95)
          this.countData.ABPay += parseFloat(elem.PROPERTY_131)
          if(elem.typePayment == 93)
          this.countData.TypeA += parseFloat(elem.PROPERTY_131)
          else if(elem.typePayment == 95)
          this.countData.TypeB += parseFloat(elem.PROPERTY_131)
          this.countData.AllPay += parseFloat(elem.PROPERTY_131)
        }
      })
      this.countData.Profit = (100 - this.countData.AllPay / (this.dealsPay[this.dealCount] / 100 )).toFixed(2) // маржинальность
    },

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
      for (let elem of this.clearTh)
      {
          elem.dealJoin = elem.PROPERTY_133
          elem.selected  = elem.PROPERTY_135
          elem.typePayment = elem.PROPERTY_123
          elem.PROPERTY_133 = this.deals[elem.PROPERTY_133]
          elem.PROPERTY_135 = this.users[elem.PROPERTY_135]
          elem.PROPERTY_123 = this.fields.PROPERTY_123.DISPLAY_VALUES_FORM[elem.PROPERTY_123]
      }
    },

    fields() {
      let clear = [{key: 'ID', label: 'ID'},]
      for (const [key, value] of Object.entries(this.fields)) {
        if (key.includes('PROPERTY_'))
        clear.push({'key': key, label: value.NAME})
      }
      clear.push({'key': "PROPERTY_BTN", label: "Действия"})
      this.clearField = clear
    }





  }
}
</script>

<style lang="scss">
@import 'assets/index.css'; 
</style>
