<template>
  <div class="d-flex flex-column">
    <h2 class="text-center text-white font-weight-bold p-0 m-0">
      Skills
    </h2>
    <div class="container content-container">
      <div class="row h-100 justify-content-center">
        <div class="col-md-8 col-12 p-1">
          <content-box class="h-100 p-3">
            <content-loading
              :isLoading="isLoading"
              class="h-100"
              textClass="text-white"
              text="Getting inventory"
            >
            </content-loading>
          </content-box>
        </div>
        <div class="col-12 col-md-4 p-1 d-flex flex-column">
          <content-box class="p-3 content-container mb-2">
            <section-header class="text-white">Selected Skill</section-header>
          </content-box>
          <content-box class="p-3 content-container mb-2">
            <section-header class="text-white">Current Skills</section-header>
          </content-box>
          <div class="btn-group w-100 actions-container">
            <button
              @click.prevent="handleEquip()"
              :disabled="isEquipDisabled"
              class="btn btn-secondary"
            >
              Equip
            </button>
            <button
              :disabled="isSaveDisabled"
              @click.prevent="handleSave()"
              class="btn btn-secondary"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SectionHeader from "./SectionHeader.vue";
import ContentLoading from "./ContentLoading.vue";
import ContentBox from "./ContentBox.vue";
import { mapState } from "vuex";

export default {
  data() {
    return {
      isLoading: false,
    };
  },
  computed: {
    ...mapState({
      character: (state) => state.character.current,
    }),
    isEquipDisabled: function() {
      return false;
    },
    isSaveDisabled: function() {
      return false;
    },
  },
  methods: {
    handleSave: async function() {},
    handleEquip: function() {},
  },
  components: {
    ContentLoading,
    ContentBox,
    SectionHeader,
  },
};
</script>

<style scoped>
.content-container {
  flex: 1;
}

.actions-container {
  margin: 0 auto;
}
</style>
