<template>
  <div id="app">
    <nav>
    </nav>
    <b-table striped hover :items="clearTh" :fields="clearField"></b-table>
  </div>
</template>

<script>
export default {
  data: () => ({
    clearTh: {},
    clearField: []
  }),
  async mounted() {
    console.log(BX24.getAuth())
    await this.$store.dispatch('fetchItems')
    await this.$store.dispatch('fetchFields')
    
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
      console.log(this.items)
      this.clearTh = this.items.map(function(sort) {
        let clear = []
        for (const [key, value] of Object.entries(sort)) {
        if (key.includes('PROPERTY_') || key === 'ID')
        clear[key] = value
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
