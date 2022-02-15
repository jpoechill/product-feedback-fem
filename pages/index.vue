<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-md-3">
          <div class="bg-white rounded pt-5 pb-3 px-3">
            <h4 class="m-0">Frontend Mentor</h4>
            <small> <span class=" fw-light">Feedback Board</span></small>
          </div>
          <div class="bg-white px-3 py-3 mt-3 rounded">
            <span class="badge bg-primary me-2">All</span>
            <span class="badge bg-light text-dark me-2">UI</span>
            <span class="badge bg-light text-dark me-2">UX</span>
            <span class="badge bg-light text-dark me-2">Enhancement</span>
            <span class="badge bg-light text-dark me-2">Bug</span>
            <span class="badge bg-light text-dark me-2">Feature</span>
          </div>
          <div class="bg-white p-3 mt-3 rounded">
            Roadmap <span class="float-end text-muted"><small>View</small></span>
            <br><br>
            <ul class="ps-3 fw-light text-muted">
              <li class="ps-2 fs-4">
                <span class="fs-6">Planned <span class="d-inline float-end">0</span></span>
              </li>
              <li>
                <img src="/oval-maroon.png" alt="">
              </li>
            </ul>
          </div>
        </div>

        <div class="col-md-9">
          <div class="bg-white">
            Suggestions 
            <NuxtLink to="/feedback-new">
              <button type="button" class="btn btn-primary">+ Add Feedback</button>
            </NuxtLink>
          </div>
          <div class=" mt-3 bg-white">
            There is no feedback yet. <br><br>
            Got a suggestion? Found a bug that needs to be squashed? We love hearing about new ideas to improve our app.

            <br><br>
            
            <button type="button" class="btn btn-primary">+ Add Feedback</button>
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
  border-radius: 100px;
}

/* custom bullet colors */
ul {
  list-style: none; /* Remove default bullets */
}

ul li::before {
  content: "\2022";  /* Add content: \2022 is the CSS Code/unicode for a bullet */
  color: red; /* Change the color */
  font-weight: bold; /* If you want it to be bold */
  display: inline-block; /* Needed to add space between the bullet and the text */
  width: 1em; /* Also needed for space (tweak if needed) */
  margin-left: -1em; /* Also needed for space (tweak if needed) */
}

.lh-bullet-point {
  line-height: .4em;
}
</style>
