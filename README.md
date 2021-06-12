# carmanage-back

- CarE后台管理
- Vue.js
- axios get跨域在main.js里设置axios.defaults.baseURL
- axios post跨域在main.js里设置axios.defaults.headers['Content-Type']="application/x-www-form-urlencoded", 要用json格式，设置为"text/plain"，post的时候data用JSON.stringfy转换一下。