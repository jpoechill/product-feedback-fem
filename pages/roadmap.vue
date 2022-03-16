<template>
  <main>

    <!-- Mobile Nav -->

    <div class="bg-dark-blue pb-2 pt-2 text-white d-md-none">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="d-flex px-3 justify-content-between align-items-center">
              <div>
                <div class="d-block mb-2 mt-2">
                  <button @click="$router.back()" class="btn" role="button">
                    <img src="/shared/icon-arrow-left.svg" class="me-3" role="button" alt="Left Arrow">
                    <span class="fs-smaller fw-bold text-white">Go Back</span>
                  </button>
                </div>
                <h4 class="fw-bolder">Roadmap</h4>
              </div>
              <div>
                <NuxtLink to="/feedback-new">
                  <button type="button" class="btn btn-primary fs-small fw-bold py-2 px-4">
                    <small>
                      + Add Feedback
                    </small>
                  </button>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Mobile Nav -->

    <div class="border-bottom d-md-none">
      <div class="container">
        <div class="row d-flex pt-1 justify-content-between">
          <div class="col-4 p-3 text-center d-inline-block" role="button" :class="statuses[0].isActive ? 'border-bottom-purple' : ''" @click="toggleTabs('planned')">
            <button class="btn text-decoration-none text-muted fs-smaller" :class="statuses[0].isActive ? 'fw-bold text-blue' : ''">Planned ({{ filterPlanned.length }})</button>
          </div>
          <div class="col-4 p-3 text-center d-inline-block" role="button" :class="statuses[1].isActive ? 'border-bottom-purple' : ''" @click="toggleTabs('inProgress')">
            <button class="btn text-decoration-none text-muted fs-smaller" :class="statuses[1].isActive ? 'fw-bold text-blue' : ''">In-Progress ({{ filterInProgress.length }})</button>
          </div>
          <div class="col-4 p-3 text-center d-inline-block" role="button" :class="statuses[2].isActive ? 'border-bottom-purple' : ''" @click="toggleTabs('live')">
            <button class="btn text-decoration-none text-muted fs-smaller" :class="statuses[2].isActive ? 'fw-bold text-blue' : ''">Live ({{ filterLive.length }})</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Tablet/Desktop Nav -->

    <div class="container d-none d-md-block mt-5">
      <div class="row">
        <div class="col-md-12">
          <div class="bg-dark-blue text-white rounded mb-3 px-4 py-4 ">
            <div class="d-flex px-3 justify-content-between align-items-center">
              <div>
                <button @click="$router.back()" class="btn mb-2 mt-2" role="button">
                  <div class="d-block">
                    <img src="/shared/icon-arrow-left.svg" class="me-3" role="button" alt="Left Arrow">
                    <span class="fs-smaller fw-bold text-white" role="button">Go Back</span>
                  </div>
                </button>
                <h3 class="fw-bolder">Roadmap</h3>
              </div>
              <div>
                <NuxtLink to="/feedback-new">
                  <button type="button" class="btn btn-primary fs-small fw-bold py-2 px-4">
                    <small>
                      + Add Feedback
                    </small>
                  </button>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container mt-3 d-md-none">
      <div class="row mt-4 mb-5">
        <div class="col-md-4" v-if="statuses[0].isActive">
          <span class="fw-bold fs-5 text-blue">Planned ({{ filterPlanned.length }})</span> <br>
          <span class="text-muted fs-small d-block mb-4 pb-0">Ideas prioritized for research</span>
          <div v-for="(item, index) in filterPlanned" :key="index" class="py-0 rounded bg-dark mb-4 position-relative overflow-hidden">
            <div class="bg-white text-dark p-4 border-top-orange">
              <img src="/oval-maroon.svg" class="me-2 mb-1"> 
                <span class="d-inline ps-2 text-muted fs-small">{{ capitalize(item.status) }}</span>  
                <NuxtLink :to="'/posts/' + item.id" class="text-decoration-none text-blue">
                  <span class="d-block mt-3 mb-2 fw-bold">{{ item.title }}</span>
                </NuxtLink>
                <span class="d-block text-muted fs-small">
                  {{ item.description }}
                </span>
                <span id="" class="badge custom-badge badge-no-click bg-light text-dark ps-3 pe-3 ms-0 mt-3 me-2 fs-smaller fw-bold">
                  {{ capitalize(item.category) }}  
                </span> 
                <br>
                <div class="d-flex justify-content-between align-items-center">
                  <button @click="toggleUpvote(item.id)" class="btn badge bg-light text-dark px-3 py-0 mx-0 mt-1 fw-bold fs-smaller" :class="item.upvoters && item.upvoters.includes(currentUser.username) ? 'bg-blue text-white' : ''" role="button">
                    <svg width="10" height="7" class="me-2" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 6l4-4 4 4" :stroke="item.upvoters && item.upvoters.includes(currentUser.username) ? '#FFFFFF' : '#4661E6'" stroke-width="2" fill="none" fill-rule="evenodd"/>
                    </svg>
                    <span class="fw-bold" :class="item.upvoters && item.upvoters.includes(currentUser.username) ? 'text-white' : 'text-blue'">
                      {{ item.upvotes }}
                    </span>
                  </button>
                  <div>
                    <img src="/chat-bubble.svg" alt="" class="pe-3 mb-1">
                    <span v-if="!item.comments" class="fw-bold fs-6">
                      0
                    </span>
                    <span v-else class="fw-bold fs-6">
                      {{ item.comments.length }}
                    </span>
                  </div>
                </div>
              </div>  
          </div>          
        </div>

        <div class="col-md-4" v-if="statuses[1].isActive">
          <span class="fw-bold fs-5 text-blue">In-Progress ({{ filterInProgress.length }})</span> <br>
          <span class="text-muted fs-small d-block mb-4 pb-0">Currently being developed</span>
          <div v-for="(item, index) in filterInProgress" :key="index" class="py-0 rounded bg-dark mb-4 position-relative overflow-hidden">
            <div class="bg-white text-dark p-4 border-top-purple">
              <img src="/oval-purple.svg" class="me-2 mb-1"> 
                <span class="d-inline ps-2 text-muted fs-small">{{ capitalize(item.status) }}</span>  
                <nuxtLink :to="'/posts/' + item.id" class="text-decoration-none text-blue">
                  <span class="d-block mt-3 mb-2 fw-bold">{{ item.title }}</span>
                </nuxtLink>
                <span class="d-block text-muted fs-small">
                  {{ item.description }}
                </span>
                <span id="" class="badge custom-badge bg-light badge-no-click text-dark ps-3 pe-3 ms-0 mt-3 me-2 fs-smaller fw-bold">
                  {{ capitalize(item.category) }}  
                </span> 
                <br>
                <div class="d-flex justify-content-between align-items-center">
                  <button @click="toggleUpvote(item.id)" class="btn badge bg-light text-dark px-3 py-0 mx-0 mt-1 fw-bold fs-smaller" :class="item.upvoters && item.upvoters.includes(currentUser.username) ? 'bg-blue text-white' : ''" role="button">
                    <svg width="10" height="7" class="me-2" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 6l4-4 4 4" :stroke="item.upvoters && item.upvoters.includes(currentUser.username) ? '#FFFFFF' : '#4661E6'" stroke-width="2" fill="none" fill-rule="evenodd"/>
                    </svg>
                    <span class="fw-bold" :class="item.upvoters && item.upvoters.includes(currentUser.username) ? 'text-white' : 'text-blue'">
                      {{ item.upvotes }}
                    </span>
                  </button>
                  <div>
                    <img src="/chat-bubble.svg" alt="" class="pe-3 mb-1">
                    <span v-if="!item.comments" class="fw-bold fs-6">
                      0
                    </span>
                    <span v-else class="fw-bold fs-6">
                      {{ item.comments.length }}
                    </span>
                  </div>
                </div>
              </div>  
          </div>
        </div>

        <div class="col-md-4" v-if="statuses[2].isActive">
          <span class="fw-bold fs-5 text-blue">Live ({{ filterLive.length }})</span> <br>
          <span class="text-muted fs-small d-block mb-4 pb-0">Released features</span>
          <div v-for="(item, index) in filterLive" :key="index" class="py-0 rounded bg-dark mb-4 position-relative overflow-hidden">
            <div class="bg-white text-dark p-4" style="border-top: 5px solid #62BCFA;">
              <img src="/oval-sky.svg" class="me-2 mb-1"> 
                <span class="d-inline ps-2 text-muted fs-small">{{ capitalize(item.status) }}</span>  
                <nuxtLink :to="'/posts/' + item.id" class="text-decoration-none text-blue">
                  <span class="d-block mt-3 mb-2 fw-bold">{{ item.title }}</span>
                </nuxtLink>
                <span class="d-block text-muted fs-small">
                  {{ item.description }}
                </span>
                <span id="" class="badge custom-badge badge-no-click bg-light text-dark ps-3 pe-3 ms-0 mt-3 me-2 fs-smaller fw-bold">
                  {{ capitalize(item.category) }}  
                </span>  
                <div class="d-flex justify-content-between align-items-center">
                  <button @click="toggleUpvote(item.id)" class="btn badge bg-light text-dark px-3 py-0 mx-0 mt-1 fw-bold fs-smaller" :class="item.upvoters && item.upvoters.includes(currentUser.username) ? 'bg-blue text-white' : ''" role="button">
                    <svg width="10" height="7" class="me-2" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 6l4-4 4 4" :stroke="item.upvoters && item.upvoters.includes(currentUser.username) ? '#FFFFFF' : '#4661E6'" stroke-width="2" fill="none" fill-rule="evenodd"/>
                    </svg>
                    <span class="fw-bold" :class="item.upvoters && item.upvoters.includes(currentUser.username) ? 'text-white' : 'text-blue'">
                      {{ item.upvotes }}
                    </span>
                  </button>
                  <div>
                    <img src="/chat-bubble.svg" alt="" class="pe-3 mb-1">
                    <span v-if="!item.comments" class="fw-bold fs-6">
                      0
                    </span>
                    <span v-else class="fw-bold fs-6">
                      {{ item.comments.length }}
                    </span>
                  </div>
                </div>
              </div>  
          </div>
        </div>
      </div>
    </div>

    <div class="container mt-3 d-none d-md-block">
      <div class="row mt-4 mb-5">
        <div class="col-md-4">
          <span class="fw-bold">Planned ({{ filterPlanned.length }})</span> <br>
          <span class="text-muted fs-small d-block mb-4 pb-2">Ideas prioritized for research</span>

          <div v-for="(item, index) in filterPlanned" :key="index" class="py-0 rounded bg-dark mb-4 position-relative overflow-hidden">
            <div class="bg-white text-dark p-4 border-top-orange">
              <img src="/oval-maroon.svg" class="me-2 mb-1"> 
                <span class="d-inline ps-2 text-muted fs-small">{{ capitalize(item.status) }}</span>  
                <NuxtLink :to="'/posts/' + item.id" class="text-decoration-none text-blue">
                  <span class="d-block pt-3 pb-2 fw-bold">{{ item.title }}</span>
                </NuxtLink>
                <span class="d-block text-muted fs-small">
                  {{ item.description }}
                </span>
                <span id="" class="badge custom-badge badge-no-click bg-light text-dark ps-3 pe-3 ms-0 mt-3 me-2 fs-smaller fw-bold">
                  {{ capitalize(item.category) }}  
                </span> 
                <br>
                <div class="d-flex justify-content-between align-items-center">
                  <button @click="toggleUpvote(item.id)" class="btn badge bg-light text-dark px-3 py-0 mx-0 mt-1 fw-bold fs-smaller" :class="item.upvoters && item.upvoters.includes(currentUser.username) ? 'bg-blue text-white' : ''" role="button">
                    <svg width="10" height="7" class="me-2" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 6l4-4 4 4" :stroke="item.upvoters && item.upvoters.includes(currentUser.username) ? '#FFFFFF' : '#4661E6'" stroke-width="2" fill="none" fill-rule="evenodd"/>
                    </svg>
                    <span class="fw-bold" :class="item.upvoters && item.upvoters.includes(currentUser.username) ? 'text-white' : 'text-blue'">
                      {{ item.upvotes }}
                    </span>
                  </button>
                  <div>
                    <img src="/chat-bubble.svg" alt="" class="pe-3 mb-1">
                    <span v-if="!item.comments" class="fw-bold fs-6">
                      0
                    </span>
                    <span v-else class="fw-bold fs-6">
                      {{ item.comments.length }}
                    </span>
                  </div>
                </div>
              </div>  
          </div>          

        </div>
        <div class="col-md-4">
          <span class="fw-bold">In-Progress ({{ filterInProgress.length }})</span> <br>
          <span class="text-muted fs-small d-block mb-4 pb-2">Currently being developed</span>
          <div v-for="(item, index) in filterInProgress" :key="index" class="py-0 rounded bg-dark mb-4 position-relative overflow-hidden">
            <div class="bg-white text-dark p-4 border-top-purple">
              <img src="/oval-purple.svg" class="me-2 mb-1"> 
                <span class="d-inline ps-2 text-muted fs-small">{{ capitalize(item.status) }}</span>  
                <nuxtLink :to="'/posts/' + item.id" class="text-decoration-none text-blue">
                  <span class="d-block pt-3 pb-2 fw-bold">{{ item.title }}</span>
                </nuxtLink>
                <span class="d-block text-muted fs-small">
                  {{ item.description }}
                </span>
                <span id="" class="badge custom-badge bg-light badge-no-click text-dark ps-3 pe-3 ms-0 mt-3 me-2 fs-smaller fw-bold">
                  {{ capitalize(item.category) }}  
                </span> 
                <br>
                <div class="d-flex justify-content-between align-items-center">
                  <button @click="toggleUpvote(item.id)" class="btn badge bg-light text-dark px-3 py-0 mx-0 mt-1 fw-bold fs-smaller" :class="item.upvoters && item.upvoters.includes(currentUser.username) ? 'bg-blue text-white' : ''" role="button">
                    <svg width="10" height="7" class="me-2" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 6l4-4 4 4" :stroke="item.upvoters && item.upvoters.includes(currentUser.username) ? '#FFFFFF' : '#4661E6'" stroke-width="2" fill="none" fill-rule="evenodd"/>
                    </svg>
                    <span class="fw-bold" :class="item.upvoters && item.upvoters.includes(currentUser.username) ? 'text-white' : 'text-blue'">
                      {{ item.upvotes }}
                    </span>
                  </button>
                  <div>
                    <img src="/chat-bubble.svg" alt="" class="pe-3 mb-1">
                    <span v-if="!item.comments" class="fw-bold fs-6">
                      0
                    </span>
                    <span v-else class="fw-bold fs-6">
                      {{ item.comments.length }}
                    </span>
                  </div>
                </div>
              </div>  
          </div>
        </div>
        
        <div class="col-md-4">
          <span class="fw-bold">Live ({{ filterLive.length }})</span> <br>
          <span class="text-muted fs-small d-block mb-4 pb-2">Released features</span>
          <div v-for="(item, index) in filterLive" :key="index" class="py-0 rounded bg-dark mb-4 position-relative overflow-hidden">
            <div class="bg-white text-dark p-4" style="border-top: 5px solid #62BCFA;">
              <img src="/oval-sky.svg" class="me-2 mb-1"> 
                <span class="d-inline ps-2 text-muted fs-small">{{ capitalize(item.status) }}</span>  
                <nuxtLink :to="'/posts/' + item.id" class="text-decoration-none text-blue">
                  <span class="d-block pt-3 pb-2 fw-bold">{{ item.title }}</span>
                </nuxtLink>
                <span class="d-block text-muted fs-small">
                  {{ item.description }}
                </span>
                <span id="" class="badge custom-badge badge-no-click bg-light text-dark ps-3 pe-3 ms-0 mt-3 me-2 fs-smaller fw-bold">
                  {{ capitalize(item.category) }}  
                </span>  
                <div class="d-flex justify-content-between align-items-center">
                  <button @click="toggleUpvote(item.id)" class="btn badge bg-light text-dark px-3 py-0 mx-0 mt-1 fw-bold fs-smaller" :class="item.upvoters && item.upvoters.includes(currentUser.username) ? 'bg-blue text-white' : ''" role="button">
                    <svg width="10" height="7" class="me-2" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 6l4-4 4 4" :stroke="item.upvoters && item.upvoters.includes(currentUser.username) ? '#FFFFFF' : '#4661E6'" stroke-width="2" fill="none" fill-rule="evenodd"/>
                    </svg>
                    <span class="fw-bold" :class="item.upvoters && item.upvoters.includes(currentUser.username) ? 'text-white' : 'text-blue'">
                      {{ item.upvotes }}
                    </span>
                  </button>
                  <div>
                    <img src="/chat-bubble.svg" alt="" class="pe-3 mb-1">
                    <span v-if="!item.comments" class="fw-bold fs-6">
                      0
                    </span>
                    <span v-else class="fw-bold fs-6">
                      {{ item.comments.length }}
                    </span>
                  </div>
                </div>
              </div>  
          </div>
        </div>

      </div>
    </div>
  </main>
</template>

<script>
// import axios from "axios";
import { useStore } from '~~/stores/store'

export default {
  data() {
    return {
      currentUser: useStore().currentUser,
      store: useStore(),
      statuses: [
        {
          name: 'planned',
          isActive: false,
        },
        {
          name: 'inProgress',
          isActive: true,
        },
        {
          name: 'live',
          isActive: false,
        }
      ],
      productRequests: useStore().productRequests,
    };
  },
  methods: {
    toggleUpvote: function (commentID) {
      this.store.toggleUpvote(commentID, this.currentUser.username)
    },
    toggleTabs: function (tabName) {
      this.statuses = this.statuses.map(x => {
        if (x.name === tabName) {
          x.isActive = true
        } else {
          x.isActive = false
        }

        return x
      })
    },
    capitalize: function (string) {
      if (string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
      } else {
        return ''
      }
    }
  },
  mounted () {
    window.scrollTo(0, 0)
  },
  computed: {
    filterPlanned: function () {
      return this.productRequests.filter(x => x.status === 'planned')
    },
    filterInProgress: function () {
      return this.productRequests.filter(x => x.status === 'in-progress')
    },
    filterLive: function () {
      return this.productRequests.filter(x => x.status === 'live')
    }
  },
  async created() {
    try {
    } catch (error) {
      console.log(error);
    }
  },
}
</script>

<style>
.border-top {
  border-top: 5px solid #dee2e6!important;
}

.bg-dark-blue {
  background-color: #373F68;
}

.border-top-purple {
  border-top: 6px solid #AD1FEA;
}

.border-top-orange {
  border-top: 6px solid #F49F85;
}

.border-bottom-purple {
  border-bottom: 5px solid #AD1FEA;
}
</style>
