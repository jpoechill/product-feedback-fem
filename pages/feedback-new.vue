<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-md-6 offset-3">
          <div>
            <nuxtLink to="/">
              Go Back
            </nuxtLink>
          </div>
          <div class="bg-white">
            <h4>
              + Create New Feedback
            </h4>

            <br><br>

            Feedback Title <br>
            Add a short, descriptive headline

            <input type="text">

            <br><br>

            Category <br>
            Choose a category for your feedback

            <br><br>

            Feedback Detail <br>
            Include any specific comments on what should be improved, added, etc.
            <br><br>
            <textarea class="w-100">

            </textarea>
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
