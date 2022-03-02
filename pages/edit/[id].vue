<template>
  <div>
    <div class="container">
      <div class="row mb-5">
        <div class="col-md-6 offset-md-3 col-sm-12">
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
              <span style="font-weight: 600!important;">Editing '{{ currProductTitle }}'</span>
            </h4>

            <br>

            <span class="fw-bold text-blue">
              <small>
                Feedback Title
              </small>
            </span>  <br>
            <span class="text-muted" style="font-size: 14px;">
              Add a short, descriptive headline
            </span>
            <br>
            <input type="text" class="form-control my-2 w-100 p-2" v-model="currProduct.title" :class="[hasErrorTitle ? 'has-error' : '']">
            <span v-if="hasErrorTitle" class="d-block mt-1" style="font-size: 14px; color: red; font-weight: 300">
              Can't be empty.
            </span>
            <br>

            <span class="fw-bold text-blue">
              <small>
                Category
              </small>
            </span>  <br>
            <span class="text-muted" style="font-size: 14px;">
              Choose a category for your feedback
            </span>
            
            <span class="ms-4">
              <small>
                <div class="dropdown my-2">
                  <button class="d-flex py-2 justify-content-between border align-items-center btn btn-dropdown text-left dropdown-toggle ps-4 text-dark w-100 border-box" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <!-- <small> -->
                      <span>
                        {{ categoryOptions.find(x => x.isActive).title }}
                      </span>
                    <!-- </small>  -->
                  </button>
                  <div class="dropdown-menu text-muted w-100 my-2" aria-labelledby="dropdownMenuButton">
                    <div v-for="(option, index) in categoryOptions" @click="toggleCategory(option.name)" class="d-flex justify-content-between dropdown-item text-muted" :class="index !== (categoryOptions.length - 1) ? 'border-bottom' : ''" :key="index" role="button">
                      <span>{{ option.title }} </span>
                      <div class="d-inline">
                        <img v-if="option.isActive" src="/checkmark-purple.svg" alt="">
                      </div>
                    </div>
                  </div>
                </div>
              </small>
            </span>

            <br>

            <span class="fw-bold text-blue" style="font-size: 14px;">
              Update Status
            </span>  

            <!-- <span class="d-block mt-2 mb-2">
              <small>
                  <select class="form-select d-inline w-100" aria-label="Default select example">
                    <option selected>Suggestion</option>
                    <option value="1">Planned</option>
                    <option value="2">In-Progress</option>
                    <option value="3">Live</option>
                  </select>
              </small>
            </span> -->

            <span class="ms-4">
              <small>
                <div class="dropdown my-2">
                  <button class="d-flex py-2 justify-content-between border align-items-center btn btn-dropdown text-left dropdown-toggle ps-4 text-dark w-100 border-box" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <!-- <small> -->
                      <span>
                        {{ statusOptions.find(x => x.isActive).title }}
                      </span>
                    <!-- </small>  -->
                  </button>
                  <div class="dropdown-menu text-muted my-2 w-100" aria-labelledby="dropdownMenuButton">
                    <div v-for="(option, index) in statusOptions" @click="toggleStatus(option.name)" class="d-flex justify-content-between dropdown-item text-muted" :class="index !== (statusOptions.length - 1) ? 'border-bottom' : ''" :key="index" role="button">
                      <span class="text-custom">{{ option.title }} </span>
                      <div class="d-inline">
                        <img v-if="option.isActive" src="/checkmark-purple.svg" alt="">
                      </div>
                    </div>
                  </div>
                </div>
              </small>
            </span>

            <br>

            <span class="fw-bold text-blue">
              <small>
                Feedback Detail
              </small>
            </span>  <br>
            <span class="text-muted" style="font-size: 14px;">
              Include any specific comments on what should be improved, added, etc.
            </span>
            <br>
            <textarea v-model="currProduct.description" maxlength="250" class="w-100 mt-2 mb-1 form-control" :class="[hasErrorFeedback ? 'has-error' : '']" />
            <span v-if="hasErrorFeedback" class="d-block mt-1" style="font-size: 14px; color: red; font-weight: 300">
              Can't be empty.
            </span>
            <br>

            <div class="d-flex justify-content-between mt-2 mb-2">
              <!-- <NuxtLink to="/"> -->
                <button @click="store.deleteFeedback(currProduct.id); this.$router.push('/')" type="button" class="btn btn-danger py-2 px-4 me-4">
                  <small>
                    Delete
                  </small>
                </button>
              <!-- </NuxtLink> -->

              <div class="d-inline">
                <NuxtLink :to="'/posts/' + currProduct.id">
                  <button type="button" class="btn btn-primary btn-dark-blue py-2 px-4 me-4">
                    <small>
                      Cancel
                    </small>
                  </button>
                </NuxtLink>

                <!-- <NuxtLink to="/"> -->
                  <button @click="validate()" type="button" class="btn btn-primary py-2 px-4">
                    <small>
                      Save Changes
                    </small>
                  </button>
                <!-- </NuxtLink> -->
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
import { useStore } from '~~/stores/store'

export default {
  data() {
    return {
      hasErrorTitle: false,
      hasErrorFeedback: false,
      currProductTitle: '',
      currProduct: {},
      store: useStore(),
      productRequests: useStore().productRequests,
      statusOptions: [
        {
          name: 'suggestion',
          title: 'Suggestion',
          isActive: true
        },
        {
          name: 'planned',
          title: 'Planned',
          isActive: false
        },
        {
          name: 'inProgress',
          title: 'In-Progress',
          isActive: false
        },
        {
          name: 'live',
          title: 'Live',
          isActive: false
        },
      ],
      categoryOptions: [
        {
          name: 'feature',
          title: 'Feature',
          isActive: true
        },
        {
          name: 'ui',
          title: 'UI',
          isActive: false
        },
        {
          name: 'ux',
          title: 'UX',
          isActive: false
        },
        {
          name: 'enhancement',
          title: 'Enhancement',
          isActive: false
        },
        {
          name: 'bug',
          title: 'Bug',
          isActive: false
        },
      ],
    }
  },
  methods: {
    validate: function () {
      if (this.currProduct.title === '') {
        this.hasErrorTitle = true
      } else {
        this.hasErrorTitle = false
      }

      if (this.currProduct.description === '') {
        this.hasErrorFeedback = true
      } else {
        this.hasErrorFeedback = false
      }

      if (!this.hasErrorTitle && !this.hasErrorFeedback) {
        this.currProduct.category = this.categoryOptions.find(x => {
          return x.isActive === true
        }).name
        
        this.currProduct.status = this.statusOptions.find(x => {
          return x.isActive === true
        }).name

        this.store.editFeedback(this.currProduct.id, this.currProduct)
      }
    },
    toggleStatus: function (statusName) {
      this.statusOptions = this.statusOptions.map(x => {
        if (x.name === statusName) {
          x.isActive = true
        } else {
          x.isActive = false
        }
        
        return x
      }) 
    },
    toggleCategory: function (categoryName) {
      this.categoryOptions = this.categoryOptions.map(x => {
        if (x.name === categoryName) {
          x.isActive = true
        } else {
          x.isActive = false
        }
        
        return x
      }) 
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
      // const products = await axios.get(`http://localhost:3004/productRequests`);
      const products = this.productRequests
      let self = this

      this.currProduct = {...products.find(x => {
        return this.$route.params.id == x.id 
      }) }

      console.log(this.currProduct)

      this.currProductTitle = this.currProduct.title.slice()
    } catch (error) {
      console.log(error);
    }
  },
}
</script>

<style scoped>

</style>
