<script>
import { routes } from "../../models/apiConfig";
import { LocalStorageKeys } from "../localStorage/localStorageKeys";

export default {
  methods: {
    signup: function(data) {
      return this.$http.post(routes.signup.url, data);
    },
    login: async function(data) {
      try {
        const response = await this.$http.post(routes.login.url, data);
        if (response.ok === true) {
          localStorage.setItem(
            LocalStorageKeys.accountId,
            response.body.accountId
          );
          return Promise.resolve(response);
        }
      } catch (error) {
        return Promise.resolve(error);
      }
    },
    logout: async function() {
      localStorage.removeItem(LocalStorageKeys.accountId);
      localStorage.removeItem(LocalStorageKeys.characterId);

      return Promise.resolve();
    },
    getCharacter: async function(id) {
      try {
        const response = await this.$http.get(routes.getCharacter(id).url);
        if (response.ok === true) {
          localStorage.setItem(LocalStorageKeys.characterId, response.body._id);
          return Promise.resolve(response);
        }
      } catch (error) {
        return Promise.resolve(error);
      }
    },
    isLoggedIn: function() {
      const accountId = localStorage.getItem(LocalStorageKeys.accountId);
      return !!accountId && accountId.length > 0;
    },
    getCurrentLoggedIn: function() {
      return localStorage.getItem(LocalStorageKeys.accountId);
    },
  },
};
</script>
