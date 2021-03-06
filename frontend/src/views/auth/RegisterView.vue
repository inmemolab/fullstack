<template>
  <div class="col-md-12">
    <div class="card card-container">
      <img
        id="profile-img"
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        class="profile-img-card"
      />
      <Form :validation-schema="schema" @submit="handleRegister">
        <div v-if="!successful">
          <div class="form-group">
            <label for="username">Username</label>
            <Field name="username" type="text" class="form-control" />
            <ErrorMessage name="username" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <Field name="email" type="email" class="form-control" />
            <ErrorMessage name="email" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <Field name="password" type="password" class="form-control" />
            <ErrorMessage name="password" class="error-feedback" />
          </div>

          <div class="form-group">
            <button class="btn btn-primary btn-block" :disabled="loading">
              <span v-show="loading" class="spinner-border spinner-border-sm"></span>
              Sign Up
            </button>
          </div>
        </div>
      </Form>

      <div v-if="message" class="alert" :class="successful ? 'alert-success' : 'alert-danger'">
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed, ref } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import { useStoreAuth } from "@/store/StoreAuth";
  import { useHead } from "@vueuse/head";
  import { Form, Field, ErrorMessage } from "vee-validate";
  import * as yup from "yup";

  export default defineComponent({
    name: "RegisterView",
    components: {
      Form,
      Field,
      ErrorMessage
    },
    setup() {
      // ini use
      const router = useRouter();
      const route = useRoute();
      const storeAuth = useStoreAuth();
      // const form
      const successful = ref(false);
      const loading = ref(false);
      const message = ref("");
      // computes user is login
      const loggedIn = computed(() => storeAuth.status.loggedIn);
      // if user log in
      if (loggedIn.value === true) {
        router.push("/");
      }
      // set use head
      const title = computed(() => route.meta.title as string);
      const description = computed(() => route.meta.description as string);
      const keywords = computed(() => route.meta.keywords as string);
      const author = computed(() => route.meta.author as string);
      useHead({
        title: title,
        meta: [
          {
            name: "description",
            content: description
          },
          {
            name: "keywords",
            content: keywords
          },
          {
            name: "author",
            content: author
          }
        ]
      });
      // chemas yup form
      const schema = yup.object().shape({
        username: yup
          .string()
          .required("Username is required!")
          .min(3, "Must be at least 3 characters!")
          .max(20, "Must be maximum 20 characters!"),
        email: yup
          .string()
          .required("Email is required!")
          .email("Email is invalid!")
          .max(50, "Must be maximum 50 characters!"),
        password: yup
          .string()
          .required("Password is required!")
          .min(6, "Must be at least 6 characters!")
          .max(40, "Must be maximum 40 characters!")
      });
      // form action
      const handleRegister = (user: any) => {
        message.value = "";
        successful.value = false;
        loading.value = true;
        storeAuth.register(user).then(
          (data) => {
            console.log(data);
            message.value = data.message;
            router.push("/login");
            successful.value = true;
            loading.value = false;
          },
          (error) => {
            message.value =
              (error.response && error.response.data && error.response.data.message) ||
              error.message ||
              error.toString();
            successful.value = false;
            loading.value = false;
          }
        );
      };
      // return
      return { router, loggedIn, schema, successful, loading, message, handleRegister };
    }
  });
</script>

<style scoped>
  label {
    display: block;
    margin-top: 10px;
  }

  .card-container.card {
    max-width: 350px !important;
    padding: 40px 40px;
  }

  .card {
    background-color: #f7f7f7;
    padding: 20px 25px 30px;
    margin: 0 auto 25px;
    margin-top: 50px;
    -moz-border-radius: 2px;
    -webkit-border-radius: 2px;
    border-radius: 2px;
    -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  }

  .profile-img-card {
    width: 96px;
    height: 96px;
    margin: 0 auto 10px;
    display: block;
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
    border-radius: 50%;
  }

  .error-feedback {
    color: red;
  }
</style>
