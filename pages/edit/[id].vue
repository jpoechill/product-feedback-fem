<template>
  <div>
    <div class="container mt-md-5">
      <div class="row mb-5">
        <div class="col-lg-6 offset-lg-3 col-md-12">
          <div class="py-4">
            <div>
              <button @click="$router.back()" class="btn" role="button">
                <img src="/shared/icon-arrow-left.svg" class="me-3" alt="Left Arrow">
                <span class="fs-smaller fw-bold text-muted" role="button">Go Back</span>
              </button> 
            </div>
          </div>
          <div class="position-relative bg-white p-4 mt-4 rounded">

            <div class="position-absolute top-0 start-0 translate-middle ms-5">
              <img src="/shared/icon-edit-feedback.svg" alt="New Feedback Icon">
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
            <span class="text-muted mb-2 d-block" style="font-size: 14px;">
              Choose a category for your feedback
            </span>
            
            <div class="dropdown d-block w-100">
              <button class="d-flex py-2 mt-2 justify-content-between border align-items-center btn btn-dropdown text-left dropdown-toggle ps-4 text-dark w-100 border-box" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                <span>{{ categoryOptions.find(x => x.isActive ).title }}</span>
              </button>
              <ul class="dropdown-menu text-muted w-100 my-2 p-0" aria-labelledby="dropdownMenuButton1">
                <li v-for="(option, index) in categoryOptions" @click="toggleCategory(option.name)" :key="index" class="d-flex justify-content-between dropdown-item text-muted w-100 p-0" :class="index !== (categoryOptions.length - 1) ? 'border-bottom' : ''">
                  <a class="dropdown-item" href="#">
                    <div class="d-flex text-muted justify-content-between align-items-center">                          
                      <span><small>{{ option.title }}</small></span>
                      <div class="d-inline">
                        <img v-if="option.isActive" src="/checkmark-purple.svg" alt="Checkmark Purple">
                      </div>
                    </div> 
                  </a>
                </li>
              </ul>
            </div>

            <br>

            <span class="fw-bold text-blue" style="font-size: 14px;">
              Update Status
            </span>  

            <div class="dropdown d-block w-100">
              <button class="d-flex py-2 mt-2 justify-content-between border align-items-center btn btn-dropdown text-left dropdown-toggle ps-4 text-dark w-100 border-box" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                <span>{{ statusOptions.find(x => x.isActive).title }}</span>
              </button>
              <ul class="dropdown-menu text-muted w-100 my-2 p-0" aria-labelledby="dropdownMenuButton1">
                <li v-for="(option, index) in statusOptions" @click="toggleStatus(option.name)" :key="index" class="d-flex justify-content-between dropdown-item text-muted w-100 p-0" :class="index !== (statusOptions.length - 1) ? 'border-bottom' : ''">
                  <a class="dropdown-item" href="#">
                    <div class="d-flex text-muted justify-content-between align-items-center">                          
                      <span><small>{{ option.title }}</small></span>
                      <div class="d-inline">
                        <img v-if="option.isActive" src="/checkmark-purple.svg" alt="Checkmark Purple">
                      </div>
                    </div> 
                  </a>
                </li>
              </ul>
            </div>

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
              <button @click="store.deleteFeedback(currProduct.id); this.$router.push('/')" type="button" class="btn btn-danger py-2 px-4 me-4">
                <small>
                  Delete
                </small>
              </button>

              <div class="d-inline">
                <NuxtLink :to="'/posts/' + currProduct.id"  type="button" class="btn btn-primary btn-dark-blue py-2 px-4 me-4">
                  <small>
                    Cancel
                  </small>
                </NuxtLink>

                <button @click="validate()" type="button" class="btn btn-primary py-2 px-4">
                  <small>
                    Save Changes
                  </small>
                </button>
              </div>
              
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
        this.$router.push('/')
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
      console.log('zz')
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
      const products = this.productRequests

      this.currProduct = {...products.find(x => {
        return this.$route.params.id == x.id 
      }) }

      this.statusOptions = this.statusOptions.map(x => {
        if (x.name === this.currProduct.status) {
          x.isActive = true
          return x
        } else {
          x.isActive = false
          return x
        }
      })

      this.categoryOptions = this.categoryOptions.map(x => {
        if (x.name === this.currProduct.category) {
          x.isActive = true
          return x
        } else {
          x.isActive = false
          return x
        }
      })

      this.currProductTitle = this.currProduct.title.slice()
    } catch (error) {
      console.log(error);
    }
  },
}
</script>

<style scoped>

</style>
