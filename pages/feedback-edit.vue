<template>
  <div>
    <div class="container">
      <div class="row mb-5">
        <div class="col-md-6 offset-3">
          <div class="py-4">
            <nuxtLink to="/">
              Go Back
            </nuxtLink>
          </div>
          <div class="bg-white p-4 rounded">
            <h4 class="mb-3 fw-bold">
              + Create New Feedback
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
            <input type="text" class="form-control my-2 w-100 p-2">
            <br>

            <span class="fw-bold">
              <small>
                Feedback Detail
              </small>
            </span>  <br>
            <span class="text-muted fs-smaller">
              Include any specific comments on what should be improved, added, etc.
            </span>
            <br>
            <textarea class="w-100 mt-2 form-control" />
            <br>

            <div class="d-flex justify-content-end mt-2">
              <NuxtLink to="/">
                <button type="button" class="btn btn-primary py-2 px-4 me-4">
                  <small>
                    + Add Feedback
                  </small>
                </button>
              </NuxtLink>

              <NuxtLink to="/">
                <button type="button" class="btn btn-primary py-2 px-4">
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
</template>

<script>
export default {
  components: {
  }
}
</script>

<style>
</style>
