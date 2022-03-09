<template>
  <div>

    <!-- Mobile Nav -->

    <div class="d-md-none">
      <div class="text-white fixed-top sticky" style="z-index: 9999;">
        <div style="background: url(/suggestions/mobile/background-header.png); background-size: cover;">
          <div class="container">
            <div class="row">
              <div class="col-md-12">
                <div class="d-flex justify-content-between align-items-center">
                  <div class="py-3 ps-2">
                    <span class="fw-bold">
                    Feedback Mentor 
                    </span><br>
                    Feedbackboard
                  </div>
                  <div class="pe-2">
                    <a class="d-block" data-bs-toggle="offcanvas" @click="snap()" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
                      <img :src="isToggled ? '/shared/mobile/icon-close.svg' : '/shared/mobile/icon-hamburger.svg'" alt="" @click="isToggled = !isToggled">
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>        
      </div>

      <div class="offcanvas offcanvas-end" style="background-color: #F4F5FA;" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
        <div class="offcanvas-body mt-5 pt-5">
          
          <div class="container p-0 m-0">
            <div class="row p-0 m-0">

              <div class="col-md-4 col-lg-12">
                <div class="bg-white px-3 pb-md-1 py-3 mt-md-0 mt-1 rounded h-100">
                  <span v-for="(category, index) in categoryFilterOptions" :key="index" data-bs-dismiss="offcanvas" @click="toggleCategory(category.name); isToggled = !isToggled;" :class="category.isActive ? 'bg-primary' : 'bg-light text-dark fw-semibold'" role='button' class="badge px-3 py-2 me-2 fs-smaller">
                    {{ category.title }}
                  </span>
                </div>
              </div>

              <div class="col-md-4 col-lg-12 mt-lg-3">
                <div class="bg-white pt-4 pb-0 px-4 mt-4 mt-md-0 pb-md-1 rounded h-100">
                  <span style="font-weight: 600; font-size: 18px; color: #3A4374;">
                    Roadmap 
                  </span>
                  <NuxtLink to="/roadmap" >
                    <span  data-bs-toggle="offcanvas"  class="float-end text-muted text-underline-hover">
                      <small>View</small>
                    </span>
                  </NuxtLink>

                  <ul class="ps-0 fw-light mt-4 fs-6 text-muted fs-small mb-0">
                    <li class="my-1">
                      <img src="/oval-maroon.svg" class="me-2"> Planned
                      <span class="float-end">
                        {{ filterPlanned.length }}
                      </span>
                    </li>
                    <li class="my-1">
                      <img src="/oval-purple.svg" class="me-2"> In-Progress
                      <span class="float-end">
                        {{ filterInProgress.length }}
                      </span>
                    </li>
                    <li class="my-1">
                      <img src="/oval-sky.svg" class="me-2"> Live
                      <span class="float-end">
                        {{ filterLive.length }}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Mobile Subnav -->

    <div class="bg-dark-blue d-md-none mt-5">
      <div class="container">
        <div class="row px-2">
          <div class="col-md-12 text-white pt-5 mt-1 pb-3">
            <span>
              <small>
                Sort by: 
                <div class="dropdown d-inline">
                  <button class="btn btn-dropdown dropdown-toggle ps-4" style="background-color: transparent!important; color: #FFF!important; font-weight: 600!important;" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
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
                  <span class="fw-semibold" style="font-size: 14px;">
                    + Add Feedback
                  </span>
                </button>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Tablet/Desktop Nav -->

    <div class="container">
      <div class="row mt-md-5">
        <div class="col-lg-3 col-md-12 p-0 m-0">
          
          <div class="container p-0 m-0">
            <div class="row p-0 m-0">

              <div class="col-md-4 mt-5 col-lg-12 mt-md-0 mb-lg-3 d-none d-md-block">
                <div class="text-white radial-gradient pb-md-1 rounded pt-5 pb-3 h-100 px-3 mb-3">
                  <h4 class="m-0 fw-bold">Frontend Mentor</h4> 
                  <small> <span class=" fw-light">Feedback Board</span></small> 
                </div>
              </div>

              <div class="col-md-4 col-lg-12">
                <div class="bg-white px-3 pb-md-1 py-3 mt-md-0 mt-3 rounded d-none d-md-block h-100">
                  <span v-for="(category, index) in categoryFilterOptions" :key="index" @click="toggleCategory(category.name)" :class="category.isActive ? 'bg-primary' : 'bg-light text-dark fw-semibold'" role='button' class="badge px-3 py-2 me-2 fs-smaller">
                    {{ category.title }}
                  </span>
                </div>
              </div>

              <div class="col-md-4 col-lg-12 mt-lg-3">
                <div class="bg-white p-4 my-3 mt-md-0 pb-md-1 rounded d-none d-md-block h-100">
                  <span style="font-weight: 600; font-size: 18px; color: #3A4374;">
                    Roadmap 
                  </span>
                  <NuxtLink to="/roadmap">
                    <span class="float-end text-muted text-underline-hover">
                      <small>View</small>
                    </span>
                  </NuxtLink>

                  <ul class="ps-0 fw-light mt-4 fs-6 text-muted fs-small">
                    <li class="my-1">
                      <img src="/oval-maroon.svg" class="me-2"> Planned
                      <span class="float-end">
                        {{ filterPlanned.length }}
                      </span>
                    </li>
                    <li class="my-1">
                      <img src="/oval-purple.svg" class="me-2"> In-Progress
                      <span class="float-end">
                        {{ filterInProgress.length }}
                      </span>
                    </li>
                    <li class="my-1">
                      <img src="/oval-sky.svg" class="me-2"> Live
                      <span class="float-end">
                        {{ filterLive.length }}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>          
        </div>

        <!-- Tablet/Desktop Subnav -->

        <div class="col-lg-9 col-md-12 mb-5 mt-lg-0 mt-md-4">
          <div class="text-white rounded px-4 py-4 bg-white bg-dark-blue d-none d-md-block">
            <div class="d-md-inline-block pe-4 d-none" style="font-size: 18px;">
              <img src="/light-bulb.svg" class="me-4 mb-2">
              <strong>{{ filterSuggestions.length }} Suggestions</strong> 
            </div>

            <span class="">
              <small>
                Sort by: 
                <div class="dropdown d-inline">
                  <button class="btn btn-dropdown dropdown-toggle ps-4" style="background-color: transparent!important; color: #FFF!important; font-weight: 600!important;" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
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
                  <span class="fw-semibold" style="font-size: 14px;">
                    + Add Feedback
                  </span>
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
                <span class="fw-bold text-blue" style="font-size: 24px;">There is no feedback yet. </span>
                <br><br>
                  Got a suggestion? Found a bug that needs to be squashed? <br>
                  We love hearing about new ideas to improve our app.
            </p>
            <NuxtLink to="/feedback-new">
              <button type="button" class="mt-5 mb-5 btn btn-primary py-2 px-4">
                <span class="fw-semibold" style="font-size: 14px;">
                  + Add Feedback
                </span>
              </button>
            </NuxtLink>
          </div>

          <div v-else v-for="(product, index) in productRequestsVisible" :key="index" class="rounded mt-3 bg-white fw-light">
            <div class="container">
              <div class="row pt-4 pb-3">
                <div class="col-md-1 d-none d-md-block col-md-1">
                  <span @click="toggleUpvote(product.id)" class="badge bg-light text-dark px-3 py-0 mx-0 mt-0 fw-bold fs-smaller" :class="product.upvoters.includes(currentUser.username) ? 'bg-blue text-white' : ''" role="button">
                    <svg width="10" height="7" class="mb-2" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 6l4-4 4 4" :stroke="product.upvoters.includes(currentUser.username) ? '#FFFFFF' : '#4661E6'" stroke-width="2" fill="none" fill-rule="evenodd"/>
                    </svg>
                    <br>
                    <span class="fw-bold" :class="product.upvoters.includes(currentUser.username) ? 'text-white' : 'text-blue'">{{ product.upvotes }}</span>
                  </span>
                </div>
                <div class="col-md-10 ps-md-4">
                  <NuxtLink :to="'/posts/' + product.id" class="text-dark text-decoration-none">
                    <span class="fw-bold text-blue" style="font-size: 18px;">{{ product.title }}</span>
                  </NuxtLink>
                  <br>
                  <div class="py-1 fs-small" style="font-weight: 300; color=#647196;">{{ product.description }}</div>
                  <span id="badge-no-click" class="badge bg-light badge-no-click text-dark px-3 py-0 mx-0 mt-2" style="font-weight: 500; font-size: 13px;">
                    {{ capitalize(product.category) }}
                  </span>
                </div>
                <div class="d-sm-block d-md-none col-md-12">
                  <div class="fw-bold h-100 d-flex justify-content-center align-items-center">
                    <div class="d-flex justify-content-between w-100 mt-2">
                      <div>
                        <span @click="toggleUpvote(product.id)" class="badge bg-light text-dark px-3 py-0 mx-0 mt-0 fw-bold fs-smaller" :class="product.upvoters.includes(currentUser.username) ? 'bg-blue text-white' : ''" role="button">
                          <svg width="10" height="7" class="me-2" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 6l4-4 4 4" :stroke="product.upvoters.includes(currentUser.username) ? '#FFFFFF' : '#4661E6'" stroke-width="2" fill="none" fill-rule="evenodd"/>
                          </svg>
                          <!-- <img src="/shared/icon-arrow-up.svg" alt="arrow-up" class="me-2"> -->
                          <span class="fw-bold" :class="product.upvoters.includes(currentUser.username) ? 'text-white' : 'text-blue'">{{ product.upvotes }}</span>
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
import { useStore } from '~~/stores/store'

export default {
  data() {
    return {
      store: useStore(),
      isToggled: false,
      productRequestsVisible: [],
      productRequests: useStore().productRequests,
      currentUser: useStore().currentUser,
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
    snap: function () {
      // var offcanvasElementList = [].slice.call(document.querySelectorAll('.offcanvas'))
      // var offcanvasList = offcanvasElementList.map(function (offcanvasEl) {
      //   return new bootstrap.Offcanvas(offcanvasEl)
      // })

      // console.log(offcanvasElementList)
    },
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
    toggleUpvote: function (commentID) {
      this.store.toggleUpvote(commentID, this.currentUser.username)
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
    window.scrollTo(0, 0)
  },
  async created() {
    try {
      // const products = await axios.get(`http://localhost:3004/productRequests`);
      // const userInfo = await axios.get(`http://localhost:3004/currentUser `);
      
      // this.productRequests = products.data;
      this.productRequestsVisible = this.productRequests.filter(y => y.status === 'suggestion')

    } catch (error) {
      console.log(error);
    }
  },
}
</script>

<style>
body, html {
  font-family: 'Jost', sans-serif;
  font-size: 16px;
  letter-spacing: .1px;;
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

.bg-blue:hover {
  background-color: #4661E6!important;
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
  letter-spacing: -0.25px!important;
}

.rounded {
  border-radius: 10px !important;
}

.badge {
  border-radius: 10px;
  padding-top: 11px!important;
  padding-bottom: 11px!important;
}

.bg-blue {
  background-color: #4661E6!important;
  color: #FFF!important;
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

.btn-blue { 
  background-color: #4661E6!important;
}

.btn-blue:hover { 
  background-color: #7C91F9!important;
}

.bg-dark-blue {
  background-color: #373F68 !important;
}

.fw-reg {
  font-weight: 400!important;
}

.fs-smaller {
  font-size: 13px !important;
}

.fs-small {
  font-size: 16px !important;
}

.fw-semibold {
  font-weight: 600!important;
}

.fw-bold {
  font-weight: 600!important;
}

.font-light-blue {
  color: #4661E6!important;
}

.font-purple {
  color: #AD1FEA;
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
  border-radius: 6px;
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

.text-dark-blue {
  color: #4661E6!important;
  font-size: .8em;
  font-weight: bold;
}

.text-underline-hover:hover {
  text-decoration: underline;
}

.text-custom {
  font-family: 'Jost', sans-serif!important;
  font-size: 15px!important;
}

input[type=text] {
  border-radius: 6px!important;
  background-color: #F7F8FD!important;
  border: none;
  padding: 10px 16px !important;
  font-family: 'Jost', sans-serif!important;
  font-size: 15px!important;
  color: #3A4374!important;
}

textarea, .dropdown button {
  border-radius: 6px!important;
  background-color: #F7F8FD!important;
  border: none!important;
  padding: 10px 16px !important;
  font-family: 'Jost', sans-serif!important;
  font-size: 15px!important;
  color: #3A4374!important;
}

input[type=text]:focus, textarea:focus, .dropdown button:focus {
  border: 1px solid #4761E6 !important;
  background-color: #F7F8FD;
  box-shadow: none!important;
}
</style>
