<template>
  <div>
    <div class="container">
      <div class="row mb-5">
        <div class="col-md-6 offset-3">
          <div class="py-4">
            <nuxtLink to="/" class="text-decoration-none">
              <img src="/shared/icon-arrow-left.svg" class="me-3" alt="left arrow">
              <span class="fs-smaller fw-bold text-muted">Go Back</span>
            </nuxtLink>
          </div>
          <div class="position-relative bg-white p-4 mt-4 rounded">

            <div class="position-absolute top-0 start-0 translate-middle ms-5">
              <img src="/shared/icon-edit-feedback.svg" alt="icon-new-feedback">
            </div>

            <h4 class="mt-4 pt-2 mb-3 text-blue fw-bolder">
              <span style="font-weight: 600!important;">Editing '{{ currProduct.title }}'</span>
            </h4>

            <br>

            <span class="fw-bold">
              <small>
                Feedback Title
              </small>
            </span>  <br>
            <span class="text-muted fs-smaller">
              Add a short, descriptive headline
            </span>
            <br>
            <input type="text" class="form-control my-2 w-100 p-2">

            <br>

            <span class="fw-bold">
              <small>
                Category
              </small>
            </span>  <br>
            <span class="text-muted fs-smaller">
              Choose a category for your feedback
            </span>
            <br>
            
            <span class="d-block mt-2 mb-2">
              <small>
                  <select class="form-select d-inline w-100" aria-label="Default select example">
                    <option selected>Feature</option>
                    <option value="1">UI</option>
                    <option value="2">UX</option>
                    <option value="3">Enhancement</option>
                    <option value="4">Bug</option>
                  </select>
              </small>
            </span>

            <br>

            <span class="fw-bold">
              <small>
                Update Status
              </small>
            </span>  
            <br>

            <span class="d-block mt-2 mb-2">
              <small>
                  <select class="form-select d-inline w-100" aria-label="Default select example">
                    <option selected>Suggestion</option>
                    <option value="1">Planned</option>
                    <option value="2">In-Progress</option>
                    <option value="3">Live</option>
                  </select>
              </small>
            </span>

            <br>

            <span class="fw-bold">
              <small>
                Feedback Detail
              </small>
            </span>  <br>
            <span class="text-muted fs-smaller">
              {Include any specific comments on what should be improved, added, etc.}
            </span>
            <br>
            <textarea v-model="currProduct.description" maxlength="250" class="w-100 mt-2 mb-1 form-control" />
            <br>

            <div class="d-flex justify-content-between mt-2 mb-2">
              <NuxtLink to="/">
                <button type="button" class="btn btn-danger py-2 px-4 me-4">
                  <small>
                    Delete
                  </small>
                </button>
              </NuxtLink>

              <div class="d-inline">
                <NuxtLink :to="'/posts/' + currProduct.id">
                  <button type="button" class="btn btn-primary py-2 px-4 me-4">
                    <small>
                      Cancel
                    </small>
                  </button>
                </NuxtLink>

                <NuxtLink to="/">
                  <button type="button" class="btn btn-primary py-2 px-4">
                    <small>
                      Add Feedback
                    </small>
                  </button>
                </NuxtLink>
              </div>
              
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      currProduct: {}
    }
  },
  computed: {
    descriptionLength: function () {
      if (currProduct.description) {
        return currProduct.description.length
      } else {
        return 0
      }
    }
  },
  mounted () {
    window.scrollTo(0, 0)
  },
  async created() {
    try {
      const products = await axios.get(`http://localhost:3004/productRequests`);

      this.currProduct = products.data.find(x => {
        console.log(x.id, this.$route.params.id)
        return this.$route.params.id == x.id 
      }) 
    } catch (error) {
      console.log(error);
    }
  },
}
</script>

<style>
</style>
