<template>
  <div class="box-login-wrapper">
    <div class="box-login-outer">
      <div class="box-login">
        <a href="javascript;" class="logo">
          <h3>Login</h3>
        </a>
        <b-form @submit.prevent="handleLogin">
          <b-form-group label="Email">
            <b-form-input
              v-model="user.username"
              type="email"
              placeholder="Email"
            />
          </b-form-group>

          <b-form-group label="Password">
            <b-form-input
              v-model="user.password"
              type="password"
              placeholder="Password"
            />
          </b-form-group>
          <b-button type="submit" block variant="success"> Login </b-button>
        </b-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
      loading: false,
      message: "",
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
    }
  },
  head: {
    meta: [{ charset: "utf-8" }, { name: "robots", content: "noindex" }],
  },
  methods: {
    resetData() {
      this.$v.$reset();
      this.form.email = "";
      this.form.password = "";
    },
    login() {
      this.$router.push({ name: "UserList" });
    },
    handleLogin() {
      if (this.user.username && this.user.password) {
        this.$store.dispatch("auth/login", this.user).then(
          () => {
            this.$router.push({ name: "UserList" });
          },
          (error) => {
            this.message =
              (error.response && error.response.data) ||
              error.message ||
              error.toString();
          }
        );
      }
    },
  },
};
</script>

<style>
.box-login-wrapper {
  background-color: rgba(243, 244, 246, 1);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.box-login-outer {
  max-width: 56rem;
}

.box-login {
  padding: 1.5rem;
  border-bottom: 0.5rem;
  box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 15%) !important;
  background: white;
  overflow: hidden !important;
  --tw-shadow: 0 0.5rem 1rem rgb(0 0 0 / 15%) !important;
  margin-top: 2rem;
}

.box-login form {
  width: 300px;
}

.box-login .logo {
  display: block;
  margin: 25px auto;
  text-align: center;
}
</style>
