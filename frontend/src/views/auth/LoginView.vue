<template>
  <div class="col-md-12">
    <div class="card card-container">
      <img
        id="profile-img"
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        class="profile-img-card"
      />
      <Form :validation-schema="schema" @submit="handleLogin">
        <div class="form-group">
          <label for="username">Username</label>
          <Field name="username" type="text" class="form-control" />
          <ErrorMessage name="username" class="error-feedback" />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <Field name="password" type="password" class="form-control" />
          <ErrorMessage name="password" class="error-feedback" />
        </div>

        <div class="form-group">
          <button class="btn btn-primary btn-block" :disabled="loading">
            <span v-show="loading" class="spinner-border spinner-border-sm"></span>
            <span>Login</span>
          </button>
        </div>

        <RouterLink to="/forgot">forgot</RouterLink>

        <div class="form-group">
          <div v-if="message" class="alert alert-danger" role="alert">
            {{ message }}
          </div>
        </div>
      </Form>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import { useHead } from "@vueuse/head";
  import { useStoreAuth } from "@/store/StoreAuth";

  import { Form, Field, ErrorMessage } from "vee-validate";
  import * as yup from "yup";

  // name: "LoginView",

  const router = useRouter();
  const route = useRoute();
  const storeAuth = useStoreAuth();

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

  const loggedIn = computed(() => storeAuth.status.loggedIn);
  const schema = yup.object().shape({
    username: yup.string().required("Username is required!"),
    password: yup.string().required("Password is required!")
  });
  const loading = ref(false);
  const message = ref("");

  if (loggedIn.value) {
    router.push("/profile");
  }

  const handleLogin = (user: any) => {
    loading.value = true;
    storeAuth.login(user).then(
      () => {
        router.push("/profile");
      },
      (error) => {
        loading.value = false;
        message.value =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  };
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
