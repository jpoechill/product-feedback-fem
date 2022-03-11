<template>
  <div>
    <div class="container mt-md-5">
      <div class="row mb-4">
        <div class="col-lg-8 offset-lg-2 col-md-12">
          <div class="py-4 d-flex justify-content-between">
            <div>
              <button @click="$router.back()" class="btn" role="button">
                <img src="/shared/icon-arrow-left.svg" class="me-3" alt="Left Arrow">
                <span class="fs-smaller fw-bold text-muted" role="button">Go Back</span>
              </button> 
            </div>
             
            <NuxtLink :to="'/edit/' + currProduct.id" class="btn btn-primary btn-blue py-2 px-4 fs-small fw-bold">
              <small>
                Edit Feedback
              </small>
            </NuxtLink>
          </div>
          <div class="bg-white px-2 py-4 pb-3 rounded">
            
            <div class="container py-2">
              <div class="row">
                <div class="col-md-1 d-none d-md-block">
                  <button @click="toggleUpvote(currProduct.id)"  class="btn badge bg-light text-dark px-2 pb-0 py-0 mx-0 mt-0 mb-0 fw-bold fs-smaller" :class="currProduct.upvoters.includes(currentUser.username) ? 'bg-blue text-white' : ''" role="button">
                    <svg width="10" height="7" class="mb-2" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 6l4-4 4 4" :stroke="currProduct.upvoters.includes(currentUser.username) ? '#FFFFFF' : '#4661E6'" stroke-width="2" fill="none" fill-rule="evenodd"/>
                    </svg>
                    <br>
                    <span class="fw-bold" :class="currProduct.upvoters.includes(currentUser.username) ? 'text-white' : 'text-blue'">
                      {{ currProduct.upvotes }}
                    </span>
                  </button>
                </div>

                <div class="col-md-9">
                  <span class="fw-bold text-blue fs-6 d-block mb-1" style="font-size: 18px!important;">
                    {{ currProduct.title }}
                  </span>
                  <span class="text-muted" style="font-size: 16px;">
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
                        <button @click="toggleUpvote(currProduct.id)" class="btn badge bg-light text-dark px-3 py-0 mx-0 mt-0 fw-bold fs-smaller" :class="currProduct.upvoters.includes(currentUser.username) ? 'bg-blue text-white' : ''" role="button">
                          <svg width="10" height="7" class="me-2" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 6l4-4 4 4" :stroke="currProduct.upvoters.includes(currentUser.username) ? '#FFFFFF' : '#4661E6'" stroke-width="2" fill="none" fill-rule="evenodd"/>
                          </svg>
                          <span class="fw-bold" :class="currProduct.upvoters.includes(currentUser.username) ? 'text-white' : 'text-blue'">{{ currProduct.upvotes }}</span>
                        </button>
                      </div>
                      <div class="d-inline">
                        <img src="/chat-bubble.svg" class="me-3" alt="Chat Bubble">
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
                    <img src="/chat-bubble.svg" class="d-inline-block pe-3" alt="Chat Bubble">
                    {{ currProduct.comments ? currProduct.comments.length : '0' }}
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
      <div class="row mb-4">
        <div class="col-lg-8 offset-lg-2 col-md-12">
          <div class="bg-white px-2 py-4 mb-0 rounded fs-small ">
            <span class="ps-4 fw-bold">{{ currProduct.comments ? currProduct.comments.length : '0'}} Comments</span> <br><br>

            <div v-for="(comment, index) in currProduct.comments" :key="index" class="container text-muted">
              <div class="row">
                <div class="col-md-12">
                  <div class="d-flex justify-content-between align-items-top">
                    <div class="d-flex align-items-top">
                      <div class="d-inline-block">
                        <img :src="comment.user.image" class="img-avatar-size mt-1 d-inline-block" :alt="comment.user.username + ' Image'" width="100%">
                      </div> 
                      <div class="d-inline-block ps-3">
                        <span class="fw-bold text-blue" style="font-size: 14px;">
                        {{ comment.user.name }}
                      </span><br>
                      <span style="font-size: 14px;">
                        @{{ comment.user.username }} 
                      </span><br>
                      </div>
                    </div>
                    <div>
                      <a href="#" @click="showReply(index)" role="button" class="text-underline-hover font-light-blue fw-semibold" style="font-size: 13px;">
                        Reply
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <!-- First Reply -->

              <div class="row">
                <div class="col-md-1 pt-3 text-center">
                  <div class="mx-auto" style="background-color: lightgrey; width: 1px; height: 100%;" v-if="comment.replies && comment.replies.length >= 1"></div>
                </div>

                <div class="col-md-11 mt-3 mb-2 pe-0" :class="(comment.replies && comment.replies.length >= 1) ? 'mb-5' : ''">
                  {{ comment.content }} <br>

                  <div class="container px-0 pt-0 mb-2 mt-3"  v-if="commentReplies[index] && commentReplies[index].isActive">
                    <div class="row">
                      <div class="col-md-12">
                        <div class="d-flex">
                          <div class="w-100 pe-3">
                            <textarea v-model="comment.activeComment" rows="3" class="w-100 d-inline form-control mb-0 me-3 w-sm-50" style="width: 100%;"></textarea>
                            <br>
                            <span class="mt-2" style="font-size: 14px; color: red; font-weight: 300">
                              Can't be empty. 1
                            </span>
                          </div>
                          <div>
                            <button @click="addReply(index, comment.activeComment, comment.user.username); commentReplies[index].isActive = !commentReplies[index].isActive; comment.activeComment = ''" type="button" class="d-inline btn btn-primary fs-small fw-bold py-2 px-4">
                              <small class="text-nowrap">
                                Post Reply
                              </small>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

              <div class="pb-xs-5 pb-md-0" :class="[comment.replies && comment.replies.length > 1 ? 'border-responsive-padding' : '', comment.replies && comment.replies.length == 1 ? 'mt-5 mt-md-0' : '']">
                  
                  <!-- Top level replies -->

                  <div class="container ps-5 ps-md-0" v-for="(reply, replyIndex) in comment.replies" :key="replyIndex" >
                    <div class="row mt-4 mb-0"  v-if="replyIndex !== comment.replies.length - 1">
                      <div class="col-md-12 px-0">
                        
                        <div class="d-flex justify-content-between align-items-top mb-3">
                          <div class="d-flex align-items-top">
                            <div class="d-inline-block">
                              <img :src="comment.replies[replyIndex].user.image" class="img-avatar-size mt-1 d-inline-block" :alt="comment.replies[replyIndex].username + ' Image'" width="100%">
                            </div> 
                            <div class="d-inline-block ps-3">
                              <span class="fw-bold text-blue" style="font-size: 14px;">
                              {{ comment.replies[replyIndex].user.name }} 111
                            </span><br>
                            <span style="font-size: 14px;">
                              @{{ comment.replies[replyIndex].user.username }}
                            </span><br>
                            </div>
                          </div>
                          <div>
                            <a href="#" @click="toggleSubReply(index, replyIndex)" role="button" class="text-underline-hover font-light-blue fw-semibold" style="font-size: 13px;">
                              Reply
                            </a>
                          </div>
                        </div>
                        
                        <span v-if="replyIndex !== comment.replies.length - 1">
                          <span class="font-purple fw-bold"> @{{ reply.replyingTo }} </span>
                          {{ reply.content }}

                          <div class="d-flex mt-3" v-if="comment.replies[replyIndex].isActive">
                            <div class="w-100 pe-3">
                              <textarea v-model="comment.replies[replyIndex].activeReply" rows="3" class="d-inline form-control mb-0 me-3 w-sm-50" style="width: 100%;"></textarea>
                              <span class="d-block mt-2" style="font-size: 14px; color: red; font-weight: 300">
                                Can't be empty. 2
                              </span>
                            </div>
                            <div>
                              <button @click="addReply(index, comment.replies[replyIndex].activeReply, comment.replies[replyIndex].user.username, replyIndex); comment.replies[replyIndex].isActive = !comment.replies[replyIndex].isActive; comment.replies[replyIndex].activeReply = ''" type="button" class="d-inline btn btn-primary fs-small fw-bold py-2 px-4">
                                <small class="text-nowrap">
                                  Post Reply
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
              </div>
              
              <!-- Last level reply -->

              <div class="row">
                <div class="offset-md-1 col-md-11 margin-custom"  v-if="comment.replies && comment.replies.length >= 1" >
                  <div class="container ps-5 ps-md-0 pe-custom mb-3"  :class="comment.replies && comment.replies.length == 1 ? 'border-responsive-margin' : ''">
                    <div class="row mt-0">
                      <div class="col-md-12 px-0">
                        <div class="d-flex justify-content-between align-items-top">
                          <div class="d-flex align-items-top">
                            <div class="d-inline-block">
                              <img :src="comment.replies[comment.replies.length-1].user.image" class="img-avatar-size mt-1 d-inline-block" :alt="comment.replies[comment.replies.length-1].username + 'Image'" width="100%">
                            </div> 
                            <div class="d-inline-block ps-3">
                              <span class="fw-bold text-blue" style="font-size: 14px;">
                              {{ comment.replies[comment.replies.length-1].user.name }} 111
                            </span><br>
                            <span style="font-size: 14px;">
                              @{{ comment.replies[comment.replies.length-1].user.username }}
                            </span><br>
                            </div>
                          </div>
                          <div>
                            <a href="#" @click="toggleSubReply(index, comment.replies.length-1)" role="button" class="text-underline-hover font-light-blue fw-semibold" style="font-size: 13px;">
                              Reply
                            </a>
                          </div>
                        </div>

                      </div>
                      <div class="col-md-11 pt-3 px-0 pe-0 position-relative">
                        <span class="font-purple fw-bold"> @{{ comment.replies[comment.replies.length-1].replyingTo }}  </span>
                        {{ comment.replies[comment.replies.length-1].content }} 
                        
                        <div class="d-flex mt-3" v-if="comment.replies[comment.replies.length-1].isActive">
                          <div class="w-100 pe-3">
                            <textarea v-model="comment.replies[comment.replies.length-1].activeReply" rows="3" class="d-inline form-control mb-0 me-3 w-sm-50" style="width: 100%;"></textarea>
                            <span class="d-block mt-2" style="font-size: 14px; color: red; font-weight: 300">
                              Can't be empty. 3
                            </span>
                          </div>
                          <div>
                            <button @click="addReply(index, comment.replies[comment.replies.length-1].activeReply, comment.replies[comment.replies.length-1].user.username); comment.replies[comment.replies.length-2].isActive = !comment.replies[comment.replies.length-2].isActive; comment.replies[comment.replies.length-2].activeReply = ''"  type="button" class="d-inline btn btn-primary fs-small fw-bold py-2 px-4">
                              <small class="text-nowrap">
                                Post Reply
                              </small>
                            </button>
                          </div>
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

      <!-- New Comment -->

      <div class="row mb-5">
        <div class="col-lg-8 offset-lg-2 col-md-12">
          <div class="bg-white px-2 py-4 rounded fs-small ">
            <span @click="addComment()" class="ps-4 fw-bold text-blue">Add Comment</span> <br><br>

            <div class="px-4">
              <textarea v-model="newComment" class="form-control" :class="[hasErrorFeedback ? 'has-error' : '']" placeholder="Type your comment here" maxLength="250"></textarea>
              <span v-if="hasErrorFeedback" class="d-block mt-2" style="font-size: 14px; color: red; font-weight: 300">
                Can't be empty.
              </span>
            </div>

            <div class="d-flex justify-content-between px-4 mt-4">
              <div class="d-inline text-muted fs-small">{{ (250 - newComment.length) }} characters left</div>
              <div class="d-inline">
                <button @click="addComment()" type="button" class="btn btn-primary fs-small fw-bold py-2 px-4">
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
// import axios from "axios";
import { useStore } from '~~/stores/store'

export default {
  components: {
  },
  data() {
    return {
      store: useStore(),
      newComment: '',
      productRequests: useStore().productRequests,
      commentReplies: [],
      currentUser: useStore().currentUser,
      currProduct: {
        comments: [],
        id: 0
      },
      hasErrorFeedback: false
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
    toggleUpvote: function (commentID) {
      this.store.toggleUpvote(commentID, this.currentUser.username)
    },
    addComment: function () {
      if (this.newComment !== '') {
        let commentID = this.currProduct.comments.length ? this.currProduct.comments[this.currProduct.comments.length-1].id + 1 : 1

        const payload = {
          id: commentID,
          content: this.newComment,
          user: useStore().currentUser
        }

        console.log('middle')
        console.log(payload)
        console.log(this.currProduct.id, payload)

        this.newComment = ''

        useStore().addComment(this.currProduct.id, payload)
        this.reset()
        this.hasErrorFeedback = false
      } else {
        this.hasErrorFeedback = true
      }
    },
    addReply: function (commentIndex, commentContent, replyTo, replyIndex) {
      if (commentContent !== '') {
        const payload = {
          content: commentContent,
          replyingTo: replyTo,
          user: useStore().currentUser
        }

        useStore().addReply(this.currProduct.id, commentIndex, payload)
      } else {
        alert('has error')
      }      
    },
    toggleAllReplies: function(commentIndex, replyIndex) {
      // console.log(this.commentReplies)
      let self = this
      
      if (!replyIndex) {
        this.commentReplies.forEach((x, index) => {
          if (commentIndex !== index) {
            x.isActive = false
          }

          self.currProduct.comments.forEach((y) => {
            if (y.replies) {
              y.replies.forEach(z => {
                z.isActive = false
              })
            }
          })
        })
      } else {
        this.commentReplies.forEach((x, index) => {
          x.isActive = false

          self.currProduct.comments[commentIndex].replies.forEach((y, z) => {
            console.log(replyIndex)
            if (z !== replyIndex - 1) {
              y.isActive = false
            }
          })
        })
      }
    },
    showReply: function (index) {
      this.commentReplies[index].isActive = !this.commentReplies[index].isActive
      this.toggleAllReplies(index)
    },
    toggleSubReply: function (commentIndex, replyIndex) {
      this.currProduct.comments[commentIndex].replies[replyIndex].isActive = !this.currProduct.comments[commentIndex].replies[replyIndex].isActive
      this.toggleAllReplies(commentIndex, replyIndex + 1)
    },
    reset: function () {
      try {
        let self = this
        const products = this.productRequests


        let temp = products.find(x => {
          return this.$route.params.id == x.id 
        }) 

        if (temp) {
          this.currProduct = temp

          this.currProduct.comments = this.currProduct.comments.map(x => {
            let item = {
              isActive: false,
              comment: '',
            }

            if (x.replies) {
              x.replies = x.replies.map((y) => {
                y.activeReply = ''
                y.isActive = false
                return y
              })
            }

            x.activeComment = ''

            self.commentReplies.push(item)

            return x
          })
        }
      } catch (error) {
        console.log(error);
      }
    }
  },
  mounted () {
    // window.scrollTo(0, 0)
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
    this.reset()
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

.pe-custom {
  padding-right: 0.7rem!important;
}

.margin-custom {
  margin-top: -1.5em!important;
}

@media only screen and (max-width: 767px) {
  .border-responsive-padding {
    border-left: 1px solid lightgrey;
    padding-bottom: 3rem!important;
  }
}

@media only screen and (max-width: 767px) {
  .border-responsive-margin {
    border-left: 1px solid lightgrey;
    margin-bottom: 3rem!important;
  }
}

@media only screen and (max-width: 767px) {
  .margin-custom {
    margin-top: -4.5em!important;
  }
}
</style>
