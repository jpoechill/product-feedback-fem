<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-md-3">
          <div class="text-white radial-gradient rounded pt-5 pb-3 px-3">
            <h4 class="m-0">Frontend Mentor</h4>
            <small> <span class=" fw-light">Feedback Board</span></small>
          </div>
          <div class="bg-white px-3 py-3 mt-3 rounded">
            <span class="badge bg-primary px-3 py-2 me-2 fs-smaller">All</span>
            <span class="badge bg-light text-dark px-3 py-2 me-2 fs-smaller fw-bold">UI</span>
            <span class="badge bg-light text-dark px-3 py-2 me-2 fs-smaller fw-bold">UX</span>
            <span class="badge bg-light text-dark px-3 py-2 me-2 fs-smaller fw-bold">Enhancement</span>
            <span class="badge bg-light text-dark px-3 py-2 me-2 fs-smaller fw-bold">Bug</span>
            <span class="badge bg-light text-dark px-3 py-2 me-2 fs-smaller fw-bold">Feature</span>
          </div>
          <div class="bg-white p-4 my-3 rounded">
            Roadmap 

            <NuxtLink to="/roadmap">
              <span class="float-end text-muted">
              <small>View</small></span>
            </NuxtLink>

            <ul class="ps-0 fw-light mt-4 fs-6 text-muted fs-small">
              <li class="my-1">
                <img src="/static/oval-maroon.svg" class="me-2"> Planned <span class="float-end fw-bold">0</span>
              </li>
              <li class="my-1">
                <img src="/static/oval-purple.svg" class="me-2"> In-Progress <span class="float-end fw-bold">0</span>
              </li>
              <li class="my-1">
                <img src="/static/oval-sky.svg" class="me-2"> Live <span class="float-end fw-bold">0</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="col-md-9 mb-5">
          <div class="text-white rounded px-4 py-4 bg-white bg-dark-blue">
            <img src="/static/light-bulb.svg" class="me-4 mb-2">
            <strong>0 Suggestions</strong> 
            
            <span class="ms-4">
              <small>
                Sort by : 
                
                <span class="fw-bold">
                  Most Upvotes v
                </span>
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

          <div class="rounded mt-3 bg-white fw-light">
            <div class="container">
              <div class="row pt-4 pb-3">
                <div class="col-md-1">
                  <span class="badge bg-light text-dark px-3 py-0 mx-0 mt-0 fw-bold fs-smaller">
                    <span class="text-dark">^</span><br>
                    112
                  </span>
                </div>
                <div class="col-md-10">
                  <NuxtLink to="/feedback-detail" class="text-dark text-decoration-none">
                    <span class="fw-bold">Add tags for solutions</span>
                  </NuxtLink>
                  <br>
                  <div class="text-muted py-1 fs-small">Easier to search for solutions based on a specific task.</div>
                  <span class="badge bg-light text-dark px-3 py-0 mx-0 mt-2 fw-bold fs-smaller">Enhancement</span>
                </div>
                <div class="col-md-1">
                  <div class="fw-bold h-100 d-flex justify-content-center align-items-center">
                    <img src="/static/chat-bubble.svg" class="me-3" alt=""> 2
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="rounded p-5 mt-3 bg-white text-center text-muted fw-light">
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
  }
}
</script>

<style>
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
  border-radius: 6px !important;
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
