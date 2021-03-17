<template>
  <div class="card w-50 pt-4 center-block">
    <h5 class="card-title text-center font-weight-bold">Create an account</h5>
    <div class="card-body">
      <form class="form" @submit.prevent="$emit('onSignup', form)">
        <text-input
          placeholder="Full name"
          id="fullName"
          @blur="$v.form.fullName.$touch()"
          labelText="Full name"
          v-model="form.fullName"
        >
          <template v-slot:error>
            <small
              v-if="$v.form.fullName.$dirty && !$v.form.fullName.required"
              class="form-text text-danger"
              >Full name is required.</small
            >
          </template>
        </text-input>

        <text-input
          placeholder="Email"
          id="email"
          type="email"
          @blur="$v.form.email.$touch()"
          labelText="Email"
          v-model="form.email"
        >
          <template v-slot:error>
            <small
              v-if="$v.form.email.$dirty && !$v.form.email.required"
              class="form-text text-danger"
              >Email is required.</small
            >
            <small
              v-if="$v.form.email.$dirty && !$v.form.email.email"
              class="form-text text-danger"
              >Email is not valid.</small
            >
          </template>
        </text-input>

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
                  (!$v.form.username.minLength || !$v.form.username.maxLength)
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
              >Password is required.
            </small>

            <small
              v-if="
                $v.form.password.$dirty &&
                  (!$v.form.password.minLength || !$v.form.password.maxLength)
              "
              class="form-text text-danger"
            >
              Password should be between
              {{ $v.form.password.$params.minLength.min }} to
              {{ $v.form.password.$params.maxLength.max }} characters.
            </small>
          </template>
        </text-input>

        <text-input
          placeholder="Character name"
          id="characterName"
          @blur="$v.form.characterName.$touch()"
          labelText="Character name"
          v-model="form.characterName"
        >
          <template v-slot:error>
            <small
              v-if="
                $v.form.characterName.$dirty && !$v.form.characterName.required
              "
              class="form-text text-danger"
              >Character name is required.</small
            >
            <small
              v-if="
                $v.form.characterName.$dirty &&
                  (!$v.form.characterName.minLength ||
                    !$v.form.characterName.maxLength)
              "
              class="form-text text-danger"
            >
              Character name should be between
              {{ $v.form.characterName.$params.minLength.min }} to
              {{ $v.form.characterName.$params.maxLength.max }} characters.
            </small>
          </template>
        </text-input>

        <dropdown
          labelText="Character class"
          v-model.number="form.classType"
          @change="$v.form.classType.$touch()"
        >
          <option disabled selected value>-- Select a class --</option>
          <option
            selected
            v-for="option in classTypes"
            :key="option.value"
            :value="option.value"
          >
            {{ option.name }}
          </option>

          <template v-slot:error>
            <small
              v-if="$v.form.classType.$dirty && !$v.form.classType.required"
              class="form-text text-danger"
              >Character class is required.</small
            >
          </template>
        </dropdown>

        <div>
          <button
            type="submit"
            :disabled="$v.form.$invalid"
            class="btn btn-primary d-block m-auto"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Account from "../models/account";
import {
  required,
  email,
  minLength,
  maxLength,
} from "vuelidate/lib/validators";
import TextInput from "./TextInput.vue";
import Dropdown from "./Dropdown.vue";
import { CharacterService } from "../services/characterService";

const characterService = new CharacterService();

export default {
  components: { TextInput, Dropdown },
  data() {
    return {
      form: new Account({
        fullName: "",
        email: "",
        username: "",
        password: "",
        characterName: "",
        classType: null,
      }),
      classTypes: characterService.getClassTypes(),
    };
  },
  validations: {
    form: {
      fullName: {
        required,
      },
      email: {
        required,
        email,
      },
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
      characterName: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(20),
      },
      classType: {
        required,
      },
    },
    components: {
      TextInput,
      Dropdown,
    },
  },
};
</script>
