// resources/js/bootstrap.js
import axios from "axios";

window.axios = axios;

// Laravel identifica requisições AJAX e CSRF por estes headers
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

// lê o token do <meta> e envia nos dois headers aceitos pelo VerifyCsrfToken
const csrf = document.querySelector('meta[name="csrf-token"]')?.content || "";
if (csrf) {
  axios.defaults.headers.common["X-CSRF-TOKEN"] = csrf;
  axios.defaults.headers.common["X-XSRF-TOKEN"] = csrf;
}

// se você usa front e back em hosts/portas diferentes durante o dev
axios.defaults.withCredentials = true;

// fallback: se por algum motivo o client NÃO enviar o override,
// forçamos o X-HTTP-Method-Override quando o método for put/patch/delete
axios.interceptors.request.use((config) => {
  const m = (config.method || "").toLowerCase();
  if (["put", "patch", "delete"].includes(m) && !config.headers["X-HTTP-Method-Override"]) {
    config.headers["X-HTTP-Method-Override"] = m.toUpperCase();
    config.method = "post";
  }
  return config;
});
