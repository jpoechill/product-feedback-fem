<template>
  <div>
    <div class="container">
      <div class="row mb-4">
        <div class="col-md-8 offset-2">
          <div class="py-4">
            <nuxtLink to="/">
              Go Back
            </nuxtLink>
          </div>
          <div class="bg-white px-2 py-4 rounded">
            
            <div class="container py-2">
              <div class="row">
                <div class="col-md-1">
                  ^ 99
                </div>

                <div class="col-md-10">
                  <span class="fw-bold fs-6 d-block mb-2"> Add a dark theme option</span>
                  <span class="text-muted fs-small">
                    It would help people with light sensitivities and who prefer dark mode
                  </span>
                  <span class="badge bg-light text-dark ps-3 pe-3 ms-0 mt-3 me-2 fs-smaller fw-bold">Feature</span> 
                </div>

                <div class="col-md-1 d-flex justify-content-end align-items-center">
                  <img src="/static/chat-bubble.svg" class="me-3" alt="">
                  4
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>

      <div class="row mb-4">
        <div class="col-md-8 offset-2">
          
          <div class="bg-white px-2 py-4 rounded fs-small ">
            <span class="ps-4 fw-bold">4 Comments</span> <br><br>

            <!-- First Comment -->
            <div class="container text-muted">
              <div class="row">
                <div class="col-md-1">
                  <img src="/static/_elijahmoss.png" alt="" width="40px">
                </div>
                <div class="col-md-10">
                  Elijah Moss <br>
                  @hexagon.bestagon
                </div>
                <div class="col-md-1">
                  Reply
                </div>
              </div>
              <div class="row">
                <div class="col-md-11 offset-md-1 mt-3">
                  Also, please allow styles to be applied based on system preferences. I would love to be able to browse Frontend Mentor in the evening after my device’s dark mode turns on without the bright background it currently has.
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <hr>
                </div>
              </div>
            </div>

            <!-- Second Comment -->
            <div class="container text-muted">
              <div class="row">
                <div class="col-md-1">
                  <img src="/static/_jamesskinner.png" alt="" width="40px">
                </div>
                <div class="col-md-10">
                  James Skinner <br>
                  @hummingbird1
                </div>
                <div class="col-md-1">
                  Reply
                </div>
              </div>
              <div class="row">
                <div class="col-md-1 pt-3 text-center">
                  <div class="mx-auto" style="background-color: lightgrey; width: 1px; height: 100%;"></div>
                </div>
                <div class="col-md-11 mt-3">
                  Also, please allow styles to be applied based on system preferences. I would love to be able to browse Frontend Mentor in the evening after my device’s dark mode turns on without the bright background it currently has.
                  <br>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint officia labore, alias dolorem facilis veniam itaque perspiciatis eveniet natus suscipit ullam distinctio, neque saepe placeat amet incidunt porro unde nemo numquam excepturi quo. Optio corrupti saepe soluta laudantium aliquam, odio repudiandae atque laborum accusantium incidunt rem non cumque et praesentium voluptatibus velit fugit quod iure, error nam in? Iusto dicta saepe laudantium aspernatur ratione quos, quibusdam magni ut expedita culpa. Ratione minima, id corrupti nesciunt assumenda perspiciatis nemo odio nostrum? Rerum molestiae magnam corrupti dignissimos debitis repudiandae, ipsam excepturi? Corporis amet tenetur quaerat totam illum, beatae cupiditate praesentium sunt saepe.
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      <div class="row mb-5">
        <div class="col-md-8 offset-2">
          <div class="bg-white px-2 py-4 rounded fs-small ">
            <span class="ps-4 fw-bolder">Add Comment</span> <br><br>

            <div class="px-4">
              <textarea class="form-control ">
              </textarea>
            </div>

            <div class="d-flex justify-content-between px-4 mt-4">
              <div class="d-inline text-muted fs-small">250 Characters Left</div>
              <div class="d-inline">
                <button type="button" class="btn btn-primary fw-bold py-2 px-4">
                  <small>
                    Post Comment
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
export default {
  components: {
  }
}
</script>

<style>
</style>
