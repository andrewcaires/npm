import { createApp } from "vue";

import App from "./App.vue";

import store from "./stores";
import components from "./components";
import directives from "./directives";

const app = createApp(App);

app.use(store);
app.use(components);
app.use(directives);

app.mount("#app");
