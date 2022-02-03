import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js';

const app =createApp({
    data(){
        return{
            urlBase:'https://vue3-course-api.hexschool.io/v2',
            path:'fleur',
            user:{
                username:'',
                password:''
            }
        }
    },
    methods: {
        login(){
            axios.post(`${this.urlBase}/admin/signin`, this.user)
            .then(res =>{
                // 用解構的方式把token跟expired取出
                const {token, expired} =res.data;
                // 把token跟expired存入cookie
                // 帶入hexToken的token是自定義名稱，expired為Unix時間戳用new Date把時間戳生成日期
                document.cookie = `hexToken=${token}; expires=${ new Date(expired)}`;
                // 跳轉到商品頁
                window.location ='./dashboard.html';
            })
            .then(err =>{
                console.dir(err.data.message);
            })
        }
    },
    mounted() {
        
    },
});


app.mount('#app')
