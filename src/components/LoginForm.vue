<template>
  <div class="row h-100 align-items-center justify-content-center">
    <div class="col-md-6 col-10">
      <div class="card pt-4 center-block">
        <h5 class="card-title text-center font-weight-bold">Login</h5>
        <div class="card-body">
          <form @submit.prevent="$emit('onLogin', form)">
            <text-input
              placeholder="Username"
              id="username"
              @blur="$v.form.username.$touch()"
              labelText="Username"
              v-model="form.username"
            >
              <template v-slot:error>
                <small
                  v-if="$v.form.username.$dirty && !$v.form.username.required"
                  class="form-text text-danger"
                  >Username is required.</small
                >

                <small
                  v-if="
                    $v.form.username.$dirty &&
                      (!$v.form.username.minLength ||
                        !$v.form.username.maxLength)
                  "
                  class="form-text text-danger"
                >
                  Username should be between
                  {{ $v.form.username.$params.minLength.min }} to
                  {{ $v.form.username.$params.maxLength.max }} characters.
                </small>
              </template>
            </text-input>
            <text-input
              placeholder="Password"
              id="password"
              type="password"
              @blur="$v.form.password.$touch()"
              labelText="Password"
              v-model="form.password"
            >
              <template v-slot:error>
                <small
                  v-if="$v.form.password.$dirty && !$v.form.password.required"
                  class="form-text text-danger"
                  >Password is required.</small
                >

                <small
                  v-if="
                    $v.form.password.$dirty &&
                      (!$v.form.password.minLength ||
                        !$v.form.password.maxLength)
                  "
                  class="form-text text-danger"
                >
                  Password should be between
                  {{ $v.form.password.$params.minLength.min }} to
                  {{ $v.form.password.$params.maxLength.max }} characters.
                </small>
              </template>
            </text-input>

            <div class="d-flex justify-content-center">
              <div class="px-1">
                <button
                  type="submit"
                  :disabled="$v.form.$invalid"
                  class="btn btn-primary"
                >
                  Login
                </button>
              </div>

              <div class="px-1">
                <button type="button" class="btn btn-info">
                  <router-link to="/accounts/create">Signup</router-link>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TextInput from "./TextInput.vue";
import { required, minLength, maxLength } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
    };
  },
  props: {
    onLogin: Function,
  },
  components: {
    TextInput,
  },
  validations: {
    form: {
      username: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(20),
      },
      password: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(20),
      },
    },
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: inherit;
}
</style>
