const urlBase= 'https://vue3-course-api.hexschool.io/v2';
const path='fleur';
let productModal=null;

export default{
    props:['tempProduct','add'],
    template:
    `<div id="productModal" ref="productModal" class="modal fade" 
    tabindex="-1" aria-labelledby="delProductModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content border-0">
            <div class="modal-header">
                <h5 class="modal-title" id="productModalLabel">Product</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <!-- Add Product -->
                <form>
                    <div class="row mb-2">
                        <div class=" col form-floating">
                            <input type="input" class="form-control" id="title" v-model="tempProduct.title">
                            <label for="title">Title</label>
                        </div>
                        <div class="col form-floating">
                            <input type="input" class="form-control" id="category" v-model="tempProduct.category">
                            <label for="category">Category</label>
                        </div>
                    </div>
                    <div class="row mb-2">
                        <div class="col form-floating">
                            <input type="input" class="form-control" id="unit" v-model="tempProduct.unit">
                            <label for="unit">Unit</label>
                        </div>
                        <div class=" col form-floating">
                            <input type="input" class="form-control" id="content" v-model="tempProduct.content">
                            <label for="content">Content</label>
                        </div>
                    </div>
                    <div class="row mb-2">
                        <div class="col form-floating">
                            <input type="number" class="form-control" id="origin-price"
                                v-model.number="tempProduct.origin_price">
                            <label for="origin-price">Origin Price</label>
                        </div>
                        <div class="col form-floating">
                            <input type="number" class="form-control" id="price" v-model.number="tempProduct.price">
                            <label for="price">Price</label>
                        </div>
                        <div class="col form-check pt-3">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked
                                :true-value="1" :false-value="0" v-model="tempProduct.is_enabled">
                            <label class="form-check-label" for="availableChecked">
                                Available
                            </label>
                        </div>
                    </div>
                    <div class="form-floating mb-2">
                        <textarea class="form-control" aria-label="With textarea" id="description"
                            v-model="tempProduct.description"></textarea>
                        <label for="description">Description</label>
                    </div>
                    <div class="row mb-2">
                        <div class="col form-floating">
                            <input type="input" class="form-control" v-model="tempProduct.imageUrl">
                            <label>Primary Image</label>
                        </div>
                        <div class="col">
                            <img :src="tempProduct.imageUrl" alt="" class="primary-image">
                        </div>
                    </div>
                    <!-- 多圖 -->
                    <div v-if="Array.isArray(tempProduct.imagesUrl)">
                        <div v-for="(pic,key) in tempProduct.imagesUrl" :key="key +'111'" class="row">
                            <div class="form-floating col-6">
                                <input type="text" class="form-control" v-model="tempProduct.imagesUrl[key]">
                                <label>More Images</label>
                            </div>
                            <div class="col-6">
                                <img :src="tempProduct.imagesUrl[key]" alt="" class="images mb-1">
                            </div>
                        </div>
                        <button
                            v-if="!tempProduct.imagesUrl.length || tempProduct.imagesUrl[tempProduct.imagesUrl.length-1]"
                            type="button" class="btn btn-primary w-50 mb-1" @click="tempProduct.imagesUrl.push('')">Add
                            Pic</button>
                        <button v-else type="button" class="btn btn-danger w-50"
                            @click="tempProduct.imagesUrl.pop()">Delete Pic</button>
                    </div>
                </form>
                <!-- Add Product End -->
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancle</button>
                <button type="button" class="btn btn-primary" @click="updateProduct">Add</button>
            </div>
        </div>
    </div>
</div>`
,
    methods: {
        // 新增 & 編輯產品
        updateProduct() {
            let url=`${urlBase}/api/${path}/admin/product`;
            let httpMethod='post';
            if(!this.add){
                url=`${urlBase}/api/${path}/admin/product/${this.tempProduct.id}`;
                httpMethod='put';
            }
            axios[httpMethod](url,{data:this.tempProduct})
            .then(res=>{
                console.log(res.data);
                this.$emit('get-products');
                productModal.hide();
            })
            .catch(err => {
                console.dir(err.response);
            })
        },
    },
    mounted() {
        productModal=new bootstrap.Modal(document.querySelector("#productModal"));
    },
}