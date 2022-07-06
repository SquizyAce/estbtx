<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$BX24.callMethod('placement.bind', { PLACEMENT: 'CRM_DEAL_DETAIL_TAB', HANDLER: "https://cdn-ru.bitrix24.ru/b22015474/app_local/88498740a86f640208fc0b8d179d6bd7/index.html", TITLE: 'Расходы по сделкам' });
    console.log(this.$BX24.getAuth());
    this.$BX24.batch({
      info: ['app.info'],
      profile: ['profile'],
    }).then(console.log);

    console.log(this.$BX24.placement.info())
    
    console.log('Выше')

  },
  inject: ['$BX24'],
}
</script>

<style lang="scss">

</style>
