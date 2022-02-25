<template>
  <div>
    <div class="container">
      <div class="row mb-4">
        <div class="col-md-8 offset-md-2 col-sm-12">
          <div class="py-4 d-flex justify-content-between">
            <!-- <nuxtLink to="/" class="text-decoration-none"> -->
            <div>
              <img src="/shared/icon-arrow-left.svg" class="me-3" alt="left arrow">
              <span @click="$router.back()" class="fs-smaller fw-bold text-muted" role="button">Go Back</span>
            </div>
             
            <!-- </nuxtLink> -->
            <!-- {{ currProduct }} -->
            <NuxtLink :to="'/edit/' + currProduct.id">
              <button type="button" class="btn btn-primary btn-blue py-2 px-4 fs-small fw-bold">
                <small>
                  Edit Feedback
                </small>
              </button>
            </NuxtLink>
          </div>
          <div class="bg-white px-2 py-4 pb-3 rounded">
            
            <div class="container py-2">
              <div class="row">
                <div class="col-md-1 d-none d-md-block">
                  <span class="badge bg-light text-dark px-2 pb-0 py-0 mx-0 mt-0 fw-bold fs-smaller" role="button">
                    <svg width="10" height="7" class="mb-2" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 6l4-4 4 4" stroke="#4661E6" stroke-width="2" fill="none" fill-rule="evenodd"/>
                    </svg>
                    <br>
                    <span class="text-dark fw-bolder" role="button">
                      {{ currProduct.upvotes }}
                    </span>
                  </span>
                </div>

                <div class="col-md-9">
                  <span class="fw-bold fs-6 d-block mb-2">{{ currProduct.title }}</span>
                  <span class="text-muted fs-small">
                    {{ currProduct.description }}
                  </span>
                  <br>
                  <span id="badge-no-click" class="badge bg-light badge-no-click text-dark ps-3 pe-3 ms-0 mt-3 me-2 fs-smaller fw-bold">
                    {{ capitalize(currProduct.category) }}  
                  </span> 
                </div>

                <div class="col-md-2 d-flex justify-content-end align-items-center">
                  <div class="d-md-none d-sm-block mt-2 w-100">
                    <div class="d-flex justify-content-between w-100"> 
                      <div class="d-inline">
                        <span class="badge bg-light text-dark px-3 py-0 mx-0 mt-0 fw-bold fs-smaller" role="button">
                          <img src="/shared/icon-arrow-up.svg" alt="arrow-up" class="me-2">
                          <span class="text-dark fw-bolder">{{ currProduct.upvotes }}</span>
                        </span>
                      </div>
                      <div class="d-inline">
                        <img src="/chat-bubble.svg" class="me-3" alt="">
                        <span v-if="!currProduct.comments">
                          0
                        </span>
                        <span v-else>
                          {{ currProduct.comments.length }}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="d-none d-md-inline-block">
                    <img src="/chat-bubble.svg" class="d-inline-block pe-3" alt="">
                    <!-- <span> -->
                      {{ currProduct.comments ? currProduct.comments.length : '0' }}
                    <!-- </span> -->
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>

      <div class="row mb-4">
        <div class="col-md-8 offset-md-2 col-sm-12">
          <div class="bg-white px-2 py-4 mb-0 rounded fs-small ">
            <span class="ps-4 fw-bold">{{ currProduct.comments ? currProduct.comments.length : '0'}} Comments</span> <br><br>

            <div v-for="(comment, index) in currProduct.comments" :key="index" class="container text-muted">
              <div class="row">
                <div class="col-md-1">
                  <img :src="comment.user.image" class="img-avatar-size" alt="" width="100%">
                </div>
                <div class="col-md-11">
                  <div class="d-flex justify-content-between">
                    <div>
                      {{ comment.user.name }} <br>
                      @{{ comment.user.username }} <br>
                    </div>
                    <div>
                      <span @click="showReply(index)" role="button">Reply</span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row">

                <div class="col-md-1 pt-3 text-center">
                  <div class="mx-auto" style="background-color: lightgrey; width: 1px; height: 100%;" v-if="comment.replies && comment.replies.length >= 1"></div>
                </div>

                <div class="col-md-11 mt-3 mb-2" :class="(comment.replies && comment.replies.length >= 1) ? 'mb-5' : ''">
                  {{ comment.content }} <br>

                  <div class="container px-0 pt-0 mb-2 mt-3"  v-if="commentReplies[index] && commentReplies[index].isActive">
                    <div class="row">
                      <div class="col-md-12">
                        <div class="d-flex">
                          <textarea rows="3" class="d-inline form-control mb-0 me-3 w-sm-50" style="width: 100%;"></textarea>
                          <div>
                            <button type="button" class="d-inline btn btn-primary fs-small fw-bold py-2 px-4">
                              <small class="text-nowrap">
                                Post Comment
                              </small>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Top level replies -->

                  <div class="position-relative">
                    <div class="position-absolute">
                    </div>
                  </div>
                  <div class="container ps-0" v-for="(reply, replyIndex) in comment.replies" :key="replyIndex" >
                    <div class="row mt-4 mb-0"  v-if="replyIndex !== comment.replies.length - 1">
                      <div class="col-md-1">
                        <div class="position-relative">
                          <div class="position-absolute translate-custom">
                            <img :src="reply.user.image" class="img-avatar-size" alt="" width="100%">
                          </div>
                        </div>
                      </div>
                      <div class="col-md-11 px-0 position-relative">
                        <div class="d-flex justify-content-between w-100 mb-3">
                          <div>
                            {{ comment.replies[replyIndex].user.name }} <br>
                            @{{ comment.replies[replyIndex].user.username }} <br> 
                          </div>
                          <div class="d-flex justify-content-end">
                            <span @click="toggleSubReply(index, replyIndex)" type="button">
                              Reply
                            </span>
                          </div>
                        </div>
                        
                        <span v-if="replyIndex !== comment.replies.length - 1">
                          @{{ reply.replyingTo }} 
                          {{ reply.content }}

                          <div class="d-flex mt-3" v-if="comment.replies[replyIndex].isActive">
                            <textarea rows="3" class="d-inline form-control mb-0 me-3 w-sm-50" style="width: 100%;"></textarea>
                            <div>
                              <button type="button" class="d-inline btn btn-primary fs-small fw-bold py-2 px-4">
                                <small class="text-nowrap">
                                  Post Comment
                                </small>
                              </button>
                            </div>
                          </div>

                        </span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
              
              <!-- Last level reply -->

              <div class="offset-md-1 ps-1 col-md-11" style="margin-top: -1.5em!important;" v-if="comment.replies && comment.replies.length >= 1">
                <div class="container ps-0 mb-3">
                  <div class="row mt-0">
                    <div class="col-md-1">
                      <div class="position-relative">
                        <div class="position-absolute translate-custom">
                          <img :src="comment.replies[comment.replies.length-1].user.image" class="img-avatar-size" alt="" width="100%">
                        </div>
                      </div>
                    </div>
                    <div class="col-md-11 px-0 position-relative">
                      <div class="d-flex justify-content-between w-100 mb-3">
                        <div>
                          {{ comment.replies[comment.replies.length-1].user.name }} <br>
                          @{{ comment.replies[comment.replies.length-1].user.username }}
                        </div>
                        <div class="d-flex justify-content-end">
                          <span @click="toggleSubReply(index, comment.replies.length-1)" type="button">
                            Reply
                          </span>
                        </div>
                      </div>

                      @{{ comment.replies[comment.replies.length-1].replyingTo }} 
                      {{ comment.replies[comment.replies.length-1].content }} 
                      
                      <div class="d-flex mt-3" v-if="comment.replies[comment.replies.length-1].isActive">
                        <textarea rows="3" class="d-inline form-control mb-0 me-3 w-sm-50" style="width: 100%;"></textarea>
                        <div>
                          <button type="button" class="d-inline btn btn-primary fs-small fw-bold py-2 px-4">
                            <small class="text-nowrap">
                              Post Comment
                            </small>
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>


              <div class="row mb-3" v-if="index !== currProduct.comments.length - 1">
                <div class="col-md-12">
                  <hr>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

      <div class="row mb-5">
        <div class="col-md-8 offset-md-2 col-sm-12">
          <div class="bg-white px-2 py-4 rounded fs-small ">
            <span class="ps-4 fw-bolder">Add Comment</span> <br><br>

            <div class="px-4">
              <textarea class="form-control" placeholder="Type your comment here" v-model="newComment" maxLength="250"></textarea>
            </div>

            <div class="d-flex justify-content-between px-4 mt-4">
              <div class="d-inline text-muted fs-small">{{ (250 - newComment.length) }} Characters left</div>
              <div class="d-inline">
                <button type="button" class="btn btn-primary fs-small fw-bold py-2 px-4">
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
import axios from "axios";

export default {
  components: {
  },
  data() {
    return {
      newComment: '',
      productRequests: [],
      commentReplies: [],
      currentUser: {},
      currProduct: {
        comments: []
      }
    }
  },
  methods: {
    capitalize: function (string) {
      if (string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
      } else {
        return ''
      }
    },
    showReply: function (index) {
      this.commentReplies[index].isActive = !this.commentReplies[index].isActive
    },
    toggleSubReply: function (commentIndex, replyIndex) {
      this.currProduct.comments[commentIndex].replies[replyIndex].isActive = !this.currProduct.comments[commentIndex].replies[replyIndex].isActive
    }
  },
  mounted () {
    window.scrollTo(0, 0)
  },
  computed: {
    descriptionLength: function () {
      if (currProduct.description) {
        return currProduct.description.length
      } else {
        return 0
      }
    }
  },
  async created() {
    try {
      let self = this
      const products = await axios.get(`http://localhost:3004/productRequests`);

      this.currProduct = products.data.find(x => {
        return this.$route.params.id == x.id 
      }) 

      this.currProduct.comments = this.currProduct.comments.map(x => {
        let item = {
          isActive: false,
          comment: '',
        }

        if (x.replies) {
          console.log(x.replies)
          x.replies = x.replies.map((y) => {
            y.isActive = false
            return y
          })
        }

        self.commentReplies.push(item)

        return x
      })

      if (!this.currProduct) {
        self.$router.push('/')
      }

    } catch (error) {
      console.log(error);
    }
  },
}
</script>

<style>
.translate-custom {
  transform: translate(-50%,0%)!important;
}

.img-avatar-size {
  width: 40px !important;
  border-radius: 100px;
}
</style>
