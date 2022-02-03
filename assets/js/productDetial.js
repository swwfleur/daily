export default{
    props:['tempProduct'],
    template:
    `<div class="modal fade" id="productDetial" tabindex="-1" aria-labelledby="productDetialLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="productDetialLabel">Product Details</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
                  <!-- Product detials Start-->
                  <div class="py-3">
                    <template v-if="tempProduct.category">
                    <div class="p-3">
                      <img :src="tempProduct.imageUrl" :alt="tempProduct.title" class="primary-image mx-auto d-block">
                      <h3 class="my-2">{{tempProduct.title}}<span class="badge bg-warning text-dark ms-3 fs-6">
                        {{tempProduct.category}}
                      </span></h3>
                      <p>Description: {{ tempProduct.description }}</p>
                      <p>Details:{{ tempProduct.content }}</p>
                      <div class="price-box">
                        <span class="price-final text-decoration-line-through me-2">£{{ tempProduct.origin_price }}</span>
                        <span class="price-original text-danger me-2 fs-5">£{{ tempProduct.price }}</span>
                        <span>/ {{tempProduct.unit}}</span>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col"><img :src="pic" :alt="tempProduct.title" class="images m-1" v-for="(pic,index) in tempProduct.imagesUrl">
                      </div></div>
                  </template>
                  </div>
        </div>
        <div class="modal-footer">
        </div>
      </div>
    </div>
      </div>`,
}