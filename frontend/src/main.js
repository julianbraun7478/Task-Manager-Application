import './assets/main.css'

import { createApp } from 'vue'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import App from './App.vue'

const app = createApp(App);

// Configure toast options
// app.use(toast, {
//   autoClose: 5000,
//   position: toast.POSITION.TOP_RIGHT,
//   maxToasts: 5,
//   newestOnTop: true,
//   closeButton: true,
//   pauseOnHover: true,
// });

createApp(App).mount('#app')
