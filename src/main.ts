import { createSSRApp } from "vue";
import App from "./App.vue";
import '@tdesign/uniapp/common/style/theme/index.less';
import { registerDirectives } from "./directives";

export function createApp() {
  const app = createSSRApp(App);
  
  // 注册全局指令
  registerDirectives(app);
  
  return {
    app,
  };
}
