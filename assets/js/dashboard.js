import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.js';
// 匯入分頁元件
import pagination from './pagination.js';
import productDetialModal from './productDetial.js';
import productModifyModal from './productModifyModal.js';
import deleteModal from './deleteModal.js';

const urlBase= 'https://vue3-course-api.hexschool.io/v2';
const path='fleur';

// Modal初始值
let productModal =null;
let productDetial=null;
let delProductModal=null;

// sweetalert套件
const Swal = SweetAlert;
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 800,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

const app = createApp({
    components:{
        pagination,
        productDetialModal,
        productModifyModal,
        deleteModal
    },
    data() {
        return {
            products: [],
            tempProduct: {
                imagesUrl:[],
            },
            add:true,
            pagination:{},
        }
    },
    methods: {
        checkLogin(){
            const url=`${urlBase}/api/user/check`
            axios.post(url)
            .then(res=>{
                alert('You are in login state')
                this.getProducts()
            })
            .catch(err=>{
                console.dir(err.response);
            })
        },
        checkLogout(){
            const url=`${urlBase}/logout`
            axios.post(url)
            .then(res=>{
                window.location ='./index.html'
            })
            .catch(err=>{
                console.dir(err.response);
            })
        },
        getProducts(page){
            const url=`${urlBase}/api/${path}/admin/products/?page=${page}`
            axios.get(url)
            .then(res=>{
                this.products=res.data.products;
                this.pagination=res.data.pagination;
            })
            .catch(err=>{
                console.dir(err.response);
            })
        },
        // 查看產品細節
        checkProduct(product){
            this.tempProduct =product;
            productDetial.show();
        },
        // 打開Model
        openModel(state,product){
            if(state ==='add'){
                this.tempProduct ={
                    imagesUrl:[],
                };
                this.add = true;
                productModal.show();
            }else if(state ==='edit'){
                this.tempProduct= {...product};
                this.add = false;
                productModal.show();
            }else if(state==='delete'){
                delProductModal.show();
                this.tempProduct= {...product};
            }
        },
    },
    mounted() {
        //載入時就先取得token跟發送axios時預設把token內容加進headers
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        axios.defaults.headers.common['Authorization'] = token;

        // 取得產品列表
       this.getProducts();

       //  BS實體化
       productModal=new bootstrap.Modal(document.querySelector("#productModal"));
       productDetial=new bootstrap.Modal(document.getElementById('productDetial'));
       delProductModal=new bootstrap.Modal(document.getElementById('delProductModal'))
    },
});

app.mount('#app');
