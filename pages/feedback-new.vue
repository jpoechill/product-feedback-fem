<template>
  <main>
    <div class="container mt-4 mt-md-5">
      <div class="row mb-5">
        <div class="col-lg-6 offset-lg-3 offset-md-none col-md-12">
          <div class="pb-4 mb-4">
            <div>
              <button @click="$router.back()" class="btn">
                <img src="/shared/icon-arrow-left.svg" class="me-3" alt="Left Arrow">
                <span class="fs-smaller fw-bold text-muted">Go Back</span>
              </button> 
            </div>
          </div>
          <div class="position-relative bg-white p-4 mt-4 rounded">

            <div class="position-absolute top-0 start-0 translate-middle ms-5">
              <img src="/shared/icon-new-feedback.svg" alt="New Feedback Icon">
            </div>

            <h4 class="mt-4 pt-2 mb-3 text-blue fw-bold">
              Create New Feedback
            </h4>

            <br>

            <span class="text-blue fw-bold">
              <small>
                Feedback Title
              </small>
            </span>  <br>
            <span class="text-muted" style="font-size: 14px;">
              Add a short, descriptive headline
            </span>
            <br>
            <input v-model="feedback.title" type="text" class="form-control my-2 w-100 p-2" :class="[hasErrorTitle ? 'has-error' : '']">
            <span v-if="hasErrorTitle" class="d-block mt-1" style="font-size: 14px; color: red; font-weight: 300">
              Can't be empty.
            </span>
            <br>

            <span class="text-blue fw-bold">
              <small>
                Category
              </small>
            </span>  <br>
            <span class="text-muted" style="font-size: 14px;">
              Choose a category for your feedback
            </span>
            <br>

            <div class="dropdown d-block w-100">
              <button class="d-flex py-2 mt-2 justify-content-between border align-items-center btn btn-dropdown text-left dropdown-toggle ps-4 text-dark w-100 border-box" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                <span>{{ categoryOptions.find(x => x.isActive).title}}</span>
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

            <div class="text-blue fw-bold pt-2">
              <small>
                Feedback Detail
              </small>
            </div>
            <span class="text-muted" style="font-size: 14px;">
              Include any specific comments on what should be improved, added, etc.
            </span>
            <br>
            <textarea v-model="feedback.description" class="w-100 mt-2 form-control" :class="[hasErrorFeedback ? 'has-error' : '']" />
            <span v-if="hasErrorFeedback" class="d-block mt-2" style="font-size: 14px; color: red; font-weight: 300">
              Can't be empty.
            </span>
            <br>

            <div class="d-flex justify-content-end mt-2">
              <NuxtLink to="/" type="button" class="btn btn-dark-blue text-white py-2 px-4 me-4">
                <small>
                  Cancel
                </small>
              </NuxtLink>

              <button @click="validate()" type="button" class="btn btn-primary py-2 px-4">
                <small>
                  Add Feedback
                </small>
              </button>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { useStore } from '~~/stores/store'

export default {
  data() {
    return {
      store: useStore(),
      hasErrorTitle: false,
      hasErrorFeedback: false,
      feedback: {
        "id": '',
        "title": "",
        "category": "feature",
        "upvotes": 0,
        "status": "suggestion",
        "description": "",
        "comments": []
      },
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
    addFeedback: function () {
      this.store.addFeedback(this.feedback); 
      this.$router.push('/')
    },
    validate: function () {
      if (this.feedback.title === '') {
        this.hasErrorTitle = true
      } else {
        this.hasErrorTitle = false
      }

      if (this.feedback.description === '') {
        this.hasErrorFeedback = true
      } else {
        this.hasErrorFeedback = false
      }

      if (!this.hasErrorTitle && !this.hasErrorFeedback) {
        this.addFeedback()
      }
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
}
</script>

<style>
.has-error {
  border: 1px solid red!important;; 
}
</style>
