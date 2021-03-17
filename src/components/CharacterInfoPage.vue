<template>
  <div class="d-flex flex-column">
    <h2 class="text-center text-white font-weight-bold p-0 m-0">
      Character Info
    </h2>
    <div class="container content-container">
      <div class="row h-100">
        <div class="col-md-4 col-12 p-1">
          <content-box class="character-main-info-container h-100 p-3">
            <content-loading
              :isLoading="$store.state.character.isLoading"
              class="h-100"
              textClass="text-white"
              text="Getting character info"
            >
              <character-main-info :info="mainInfo"></character-main-info>
            </content-loading>
          </content-box>
        </div>

        <div class="col-md-8 col-12 p-1">
          <content-box class="character-main-info-container h-100 p-3">
            <content-loading
              :isLoading="$store.state.character.isLoading"
              class="h-100"
              textClass="text-white"
              text="Getting character stats"
            >
              <character-stats-info :info="statsInfo"></character-stats-info>
            </content-loading>
          </content-box>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CharacterMainInfo from "./CharacterMainInfo.vue";
import CharacterStatsInfo from "./CharacterStatsInfo.vue";
import ContentBox from "./ContentBox";
import ContentLoading from "./ContentLoading.vue";
import AccountsMixin from "../shared/mixins/AccountsMixin";
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  components: {
    CharacterMainInfo,
    CharacterStatsInfo,
    ContentBox,
    ContentLoading,
  },
  computed: {
    ...mapGetters("character", {
      mainInfo: "mainInfo",
      statsInfo: "statsInfo",
    }),
    ...mapState({
      character: (state) => state.character.current,
    }),
  },
  created: async function() {
    this.$store.dispatch("character/fetchCharacter", {
      accountId: this.getCurrentLoggedIn(),
      invalidate: true,
    });
  },
  methods: {
    ...mapActions("character", ["fetchCharacter"]),
  },
  mixins: [AccountsMixin],
};
</script>

<style scoped>
.content-container {
  flex: 1;
}
</style>
