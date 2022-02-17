<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-md-3">
          <div class="text-white radial-gradient rounded pt-5 pb-3 px-3">
            <h4 class="m-0 fw-bold">Frontend Mentor</h4> 
            <small> <span class=" fw-light">Feedback Board</span></small> 
            <!-- {{ fruits }} -->
          </div>
          <div class="bg-white px-3 py-3 mt-3 rounded">
            <span v-for="(category, index) in categoryFilterOptions" :key="index" @click="toggleCategory(category.name)" :class="category.isActive ? 'bg-primary' : 'bg-light text-dark fw-bold'" role='button' class="badge px-3 py-2 me-2 fs-smaller">
              {{ category.title }}
            </span>
          </div>
          <div class="bg-white p-4 my-3 rounded">
            Roadmap 
            <!-- {{ counter }} -->

            <NuxtLink to="/roadmap">
              <span class="float-end text-muted">
              <small>View</small></span>
            </NuxtLink>

            <ul class="ps-0 fw-light mt-4 fs-6 text-muted fs-small">
              <li class="my-1">
                <img src="/static/oval-maroon.svg" class="me-2"> Planned
                <span class="float-end fw-bold">
                  {{ filterPlanned.length }}
                </span>
              </li>
              <li class="my-1">
                <img src="/static/oval-purple.svg" class="me-2"> In-Progress
                <span class="float-end fw-bold">
                  {{ filterInProgress.length }}
                </span>
              </li>
              <li class="my-1">
                <img src="/static/oval-sky.svg" class="me-2"> Live
                <span class="float-end fw-bold">
                  {{ filterLive.length }}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div class="col-md-9 mb-5">
          <div class="text-white rounded px-4 py-4 bg-white bg-dark-blue">
            <img src="/static/light-bulb.svg" class="me-4 mb-2">
            <strong>{{ filterSuggestions.length }} Suggestions</strong> 
            
            <span class="ms-4">
              <small>
                Sort by : 
                  <select class="form-select d-inline w-25" aria-label="Default select example">
                    <option selected>Most Upvotes</option>
                    <option value="1">Least Upvotes</option>
                    <option value="2">Most Comments</option>
                    <option value="3">Least Comments</option>
                  </select>
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
            <img src="/static/inspector-gadget.svg" alt="inspector-img" class="py-5">
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
                <div class="col-md-1">
                  <span class="badge bg-light text-dark px-3 py-0 mx-0 mt-0 fw-bold fs-smaller">
                    <img src="/static/shared/icon-arrow-up.svg" alt="arrow-up" class="mb-2">
                    <br>
                    <span class="text-dark fw-bolder">{{ product.upvotes }}</span>
                  </span>
                </div>
                <div class="col-md-10">
                  <NuxtLink to="/feedback-detail" class="text-dark text-decoration-none">
                    <span class="fw-bold text-blue">{{ product.title }}</span>
                  </NuxtLink>
                  <br>
                  <div class="text-muted py-1 fs-small">{{ product.description }}</div>
                  <span @click="toggleCategory(product.category)" class="badge bg-light text-dark px-3 py-0 mx-0 mt-2 fw-bold fs-smaller" role="button">
                    {{ capitalize(product.category) }}
                  </span>
                </div>
                <div class="col-md-1">
                  <div class="fw-bold h-100 d-flex justify-content-center align-items-center">
                    <img src="/static/chat-bubble.svg" class="me-3" alt="">
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
// import { mapState } from 'vuex'

export default {
  data() {
    return {
      productRequestsVisible: [],
      productRequests: [],
      currentUser: {},
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
    capitalize: function (string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
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
    }
  },
  computed: {
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
    console.log(this)
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

.badge.text-dark {
  color: #4661E6!important;
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

.bg-dark-blue {
  background-color: #373F68 !important;
}

.fs-smaller {
  font-size: 12px !important;
}

.fs-small {
  font-size: 15px !important;
}
</style>
