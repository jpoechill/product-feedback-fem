<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-md-3">
          <div class="text-white radial-gradient rounded pt-5 pb-3 px-3 mb-3">
            <h4 class="m-0 fw-bold">Frontend Mentor</h4> 
            <small> <span class=" fw-light">Feedback Board</span></small> 
            <!-- {{ fruits }} -->
          </div>
          <div class="bg-white px-3 py-3 mt-3 rounded d-none d-md-block">
            <span v-for="(category, index) in categoryFilterOptions" :key="index" @click="toggleCategory(category.name)" :class="category.isActive ? 'bg-primary' : 'bg-light text-dark fw-bold'" role='button' class="badge px-3 py-2 me-2 fs-smaller">
              {{ category.title }}
            </span>
          </div>
          <div class="bg-white p-4 my-3 rounded d-none d-md-block">
            Roadmap 

            <NuxtLink to="/roadmap">
              <span class="float-end text-muted">
              <small>View</small></span>
            </NuxtLink>

            <ul class="ps-0 fw-light mt-4 fs-6 text-muted fs-small">
              <li class="my-1">
                <img src="/oval-maroon.svg" class="me-2"> Planned
                <span class="float-end fw-bold">
                  {{ filterPlanned.length }}
                </span>
              </li>
              <li class="my-1">
                <img src="/oval-purple.svg" class="me-2"> In-Progress
                <span class="float-end fw-bold">
                  {{ filterInProgress.length }}
                </span>
              </li>
              <li class="my-1">
                <img src="/oval-sky.svg" class="me-2"> Live
                <span class="float-end fw-bold">
                  {{ filterLive.length }}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div class="col-md-9 mb-5">
          <div class="text-white rounded px-4 py-4 bg-white bg-dark-blue">
            <div class="d-md-inline-block pe-4 d-none">
              <img src="/light-bulb.svg" class="me-4 mb-2">
              <strong>{{ filterSuggestions.length }} Suggestions</strong> 
            </div>

            <span class="">
              <small>
                Sort by: 
                <div class="dropdown d-inline">
                  <button class="btn btn-dropdown dropdown-toggle ps-4" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <small><span>{{ sortOptions.find(x => x.isActive ).title }}</span></small> 
                  </button>
                  <div class="dropdown-menu text-muted" aria-labelledby="dropdownMenuButton">
                    <div v-for="(option, index) in sortOptions" @click="toggleSort(option.name)" class="d-flex justify-content-between dropdown-item text-muted" :class="index !== (sortOptions.length - 1) ? 'border-bottom' : ''" :key="index" role="button">
                      <span>{{ option.title }} </span>
                      <div class="d-inline">
                        <img v-if="option.isActive" src="/checkmark-purple.svg" alt="">
                      </div>
                    </div>
                  </div>
                </div>
              </small>
            </span>

            <div class="float-end content-padding">
              <NuxtLink to="/feedback-new">
                <button type="button" class="btn btn-primary py-2 px-4">
                  <small>
                    + Add Feedback
                  </small>
                </button>
              </NuxtLink>
            </div>
          </div>

          <div v-if="!productRequestsVisible">
            Loading
          </div>
          <div v-else-if="productRequestsVisible.length === 0" class="rounded p-5 mt-3 bg-white text-center text-muted fw-light">
            <img src="/inspector-gadget.svg" alt="inspector-img" class="py-5">
              <p>
                <span class="fw-bold">There is no feedback yet. </span>
                <br><br>
                <small>
                  Got a suggestion? Found a bug that needs to be squashed? <br>
                  We love hearing about new ideas to improve our app.
                </small>
            </p>
            <NuxtLink to="/feedback-new">
              <button type="button" class="mt-5 mb-5 btn btn-primary py-2 px-4"><small>+ Add Feedback</small></button>
            </NuxtLink>
          </div>
          <div v-else v-for="(product, index) in productRequestsVisible" :key="index" class="rounded mt-3 bg-white fw-light">
            <div class="container">
              <div class="row pt-4 pb-3">
                <div class="col-md-1 d-none d-md-block col-md-1">
                  <span class="badge bg-light text-dark px-3 py-0 mx-0 mt-0 fw-bold fs-smaller" role="button">
                    <svg width="10" height="7" class="mb-2" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 6l4-4 4 4" stroke="#4661E6" stroke-width="2" fill="none" fill-rule="evenodd"/>
                    </svg>
                    <br>
                    <span class="text-dark fw-bolder">{{ product.upvotes }}</span>
                  </span>
                </div>
                <div class="col-md-10">
                  <NuxtLink :to="'/posts/' + product.id" class="text-dark text-decoration-none">
                    <span class="fw-bold text-blue">{{ product.title }}</span>
                  </NuxtLink>
                  <br>
                  <div class="text-muted py-1 fs-small">{{ product.description }}</div>
                  <span id="badge-no-click" class="badge bg-light badge-no-click text-dark px-3 py-0 mx-0 mt-2 fw-bold fs-smaller">
                    {{ capitalize(product.category) }}
                  </span>
                </div>
                <div class="d-sm-block d-md-none col-md-12">
                  <div class="fw-bold h-100 d-flex justify-content-center align-items-center">
                    <div class="d-flex justify-content-between w-100 mt-2">
                      <div>
                        <span class="badge bg-light text-dark px-3 py-0 mx-0 mt-0 fw-bold fs-smaller" role="button">
                          <img src="/shared/icon-arrow-up.svg" alt="arrow-up" class="me-2">
                          <span class="text-dark fw-bolder">{{ product.upvotes }}</span>
                        </span>
                      </div>
                      <div>
                        <img src="/chat-bubble.svg" class="me-3" alt="">
                        <span v-if="!product.comments">
                          0
                        </span>
                        <span v-else>
                          {{ product.comments.length }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="d-none d-md-block col-md-1">
                  <div class="fw-bold h-100 d-flex justify-content-center align-items-center">
                    <img src="/chat-bubble.svg" class="me-3" alt="">
                    <span v-if="!product.comments">
                      0
                    </span>
                    <span v-else>
                      {{ product.comments.length }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      productRequestsVisible: [],
      productRequests: [],
      currentUser: {},
      sortOptions: [
        {
          name: 'mostUpvotes',
          title: 'Most Upvotes',
          isActive: true
        },
        {
          name: 'leastUpvotes',
          title: 'Least Upvotes',
          isActive: false
        },
        {
          name: 'mostComments',
          title: 'Most Comments',
          isActive: false
        },
        {
          name: 'leastComments',
          title: 'Least Comments',
          isActive: false
        },
      ],
      categoryFilterOptions: [
        {
          name: 'all',
          title: 'All',
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
        {
          name: 'feature',
          title: 'Feature',
          isActive: false
        },
      ],
    };
  },
  methods: {
    sortBy: function (direction) {
      this.productRequestsVisible = this.productRequestsVisible.sort((a, b) => {
        if (!a.comments) {
          a.comments = []
        }

        if (!b.comments) {
          b.comments = []
        }

        if (direction === 'mostUpvotes') {
          return b.upvotes - a.upvotes
        } else if (direction === 'leastUpvotes')  {
          return a.upvotes - b.upvotes
        } else if (direction === 'mostComments') {
          return b.comments.length - a.comments.length
        } else if (direction === 'leastComments')  {
          return a.comments.length - b.comments.length
        }
      })
    },
    capitalize: function (string) {
      if (string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
      } else {
        return ''
      }
    },
    toggleSort: function (sortName) {
      let self = this

      this.sortOptions = this.sortOptions.map(x => {
        switch (sortName) {
          case 'mostUpvotes':
            self.sortBy('mostUpvotes')
            break;
          case 'leastUpvotes':
            self.sortBy('leastUpvotes')
            break;
          case 'mostComments':
            self.sortBy('mostComments')
            break;
          case 'leastComments':
            self.sortBy('leastComments')
            break;
        }
        
        if (x.name === sortName && x) {
          x.isActive = true
        } else {
          x.isActive = false
        }

        return x
      })
    },
    toggleCategory: function (categoryName) {
      let self = this

      this.categoryFilterOptions = this.categoryFilterOptions.map(x => {
        
        if (x.name === categoryName) {
          if (x.name === 'all') {
            self.productRequestsVisible = self.productRequests.filter(y => y.status === 'suggestion')
          } else {
            self.productRequestsVisible = self.productRequests.filter(y => y.category === x.name)
          }
          x.isActive = true
        } else {
          x.isActive = false
        }
        
        return x
      })

      console.log(self.activeSortOption.name)
      self.sortBy(self.activeSortOption.name)    
    }
  },
  computed: {
    activeSortOption: function () {
      return this.sortOptions.find(x => x.isActive === true)
    },
    filterSuggestions: function () {
      return this.productRequests.filter(x => x.status === 'suggestion')
    },
    filterPlanned: function () {
      return this.productRequests.filter(x => x.status === 'planned')
    },
    filterInProgress: function () {
      return this.productRequests.filter(x => x.status === 'in-progress')
    },
    filterLive: function () {
      return this.productRequests.filter(x => x.status === 'live')
    }
    // ...mapState("movies", ["movieList"]),
  },
  mounted () {
    console.log('ooga booga')
    window.scrollTo(0, 0)
  },
  async created() {
    try {
      const products = await axios.get(`http://localhost:3004/productRequests`);
      const userInfo = await axios.get(`http://localhost:3004/currentUser `);
      
      this.productRequests = products.data;
      this.productRequestsVisible = this.productRequests.filter(y => y.status === 'suggestion')
      this.currentUser = userInfo.data;

    } catch (error) {
      console.log(error);
    }
  },
}
</script>

<style>
body, html {
  font-family: 'Jost', sans-serif;
}

.text-blue {
  color: #3A4374 !important;
}

.radial-gradient {
  background-position: right 300px bottom -10px !important;
  background-size: 300%!important;
  background: radial-gradient(circle, rgba(232,77,112,1) 0%, rgba(163,55,246,1) 50%, rgba(40,167,237,1) 100%);
}

.badge {
  font-size: 14px;
  margin: 6px;
  font-weight: 300;
  padding: 8px;
}

.badge:hover {
  background-color: #CFD7FF!important;
}

.badge:active {
  background-color: #4661E6!important;
  color: #fff;
}

.badge-no-click:hover, #badge-no-click:active {
  color: #4661E6!important;
  background-color: #f8f9fa!important;
}

.badge:active span {
  color: #fff!important;
}

.badge:active svg path {
  stroke: #FFF!important;
}

.badge.text-dark {
  color: #4661E6!important;
}

.badge.text-dark:active {
  color: #FFF!important;
}

h4 {
  font-size: 20px;
  font-weight: 400;
}

.rounded {
  border-radius: 10px !important;
}

.badge {
  border-radius: 10px;
  padding-top: 11px!important;
  padding-bottom: 11px!important;
}

/* custom bullet colors */
ul {
  list-style-type: none !important; /* Remove default bullets */
}

.lh-bullet-point {
  line-height: .4em;
}

.btn {
  margin-top: -3px;
  border: 0px;
  border-radius: 10px;
}

.btn-primary {
  background-color: #AD1FEA;
}

.btn-primary:hover {
  background-color: #C75AF6;
}

.btn-dark-blue { 
  background-color: #3a4374!important;
}

.btn-dark-blue:hover { 
  background-color: #647196!important;
}

.bg-dark-blue {
  background-color: #373F68 !important;
}



.fs-smaller {
  font-size: 12px !important;
}

.fs-small {
  font-size: 15px !important;
}

/* custom dropdown */

.btn-dropdown, .btn-dropdown:hover {
  color: white;
}

.btn-dropdown:focus {
  box-shadow: none;
}

.dropdown-menu {
  width: 250px;
  padding: 0px;
  padding-top: 6px;
  padding-bottom: 4px;
  padding-right: 0px;
  margin-left: 14px;
  border: none;
  border-radius: 10px;
  box-shadow: 0px 5px 30px 10px rgba(0,0,0,0.1);
}

.dropdown-item {
  padding-right: 22px;
  padding-left: 22px;
  padding-top: 6px;
  padding-bottom: 6px;
}

.dropdown-item:focus, .dropdown-item:hover {
    color: #AD1FEA!important;
    background-color: transparent !important;
}
</style>
