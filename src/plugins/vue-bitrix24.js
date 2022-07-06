import Vue from 'vue';
import { Bitrix24, BxButtonWrapper, BxButton } from 'vue-bitrix24';

[BxButtonWrapper, BxButton].forEach((Component) => {
  Vue.component(Component.name, Component);
});

export default Bitrix24;