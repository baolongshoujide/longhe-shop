import ImageView from "./ImageView/index.vue";
import Sku from "./XtxSku/index.vue";

export const componentPlugin = {
  // install是固定方法，必须加
  install(app) {
    // app.compoent定义全局组件，app.directive定义v-指令
    app.component("ImageView", ImageView);
    app.component("XtxSku", Sku);
  },
};
