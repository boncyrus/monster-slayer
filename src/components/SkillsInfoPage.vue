<template>
  <div class="d-flex flex-column">
    <v-snackbar
      color="primary"
      centered
      content-class="text-center"
      :timeout="1500"
      v-model="saveSuccess"
    >
      <span class="text-white">Skills saved!</span>
    </v-snackbar>
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
              text="Getting available skills"
            >
              <skills-list
                @onItemSelect="handleSkillSelect"
                :skills="skills"
              ></skills-list>
            </content-loading>
          </content-box>
        </div>
        <div class="col-12 col-md-4 p-1 d-flex flex-column">
          <content-box class="p-3 content-container mb-2">
            <section-header class="text-white">Selected Skill</section-header>
            <skill-detail
              emptyMessage="Please select a skill"
              :skill="selectedSkill"
            ></skill-detail>
          </content-box>
          <content-box class="p-3 content-container mb-2">
            <div class="d-flex align-items-center">
              <section-header class="text-white mb-0"
                >Current Skills</section-header
              >
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <i class="icon-info text-white ml-2" v-on="on" />
                </template>
                <span>You can equip up to 4 skills.</span>
              </v-tooltip>
            </div>
            <character-skills-list
              @onDelete="handleDeleteSkill"
              :skills="modifiedSkills"
            ></character-skills-list>
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
import SkillsList from "./SkillsList.vue";
import ContentLoading from "./ContentLoading.vue";
import ContentBox from "./ContentBox.vue";
import AccountsMixin from "../shared/mixins/AccountsMixin.vue";
import SkillsMixin from "../shared/mixins/SkillsMixin.vue";
import SkillDetail from "./SkillDetail.vue";
import { mapState, mapActions, mapMutations } from "vuex";
import { SkillInfo } from "../models/skillInfo";
import CharacterSkillsList from "./CharacterSkillsList.vue";

export default {
  data() {
    return {
      saveSuccess: false,
      isLoading: false,
      skills: [],
      modifiedSkills: [],
      selectedSkill: new SkillInfo(),
    };
  },
  created() {
    this.setupSkills();
  },
  computed: {
    ...mapState({
      character: (state) => state.character.current,
    }),
    isEquipDisabled: function() {
      return (
        this.modifiedSkills.some((x) => x._id === this.selectedSkill._id) || // It's already in the skills list
        this.selectedSkill._id === "" || // No selected skill yet
        this.modifiedSkills.length === 4 // can only equip 4 items
      );
    },
    isSaveDisabled: function() {
      if (this.modifiedSkills.length != this.character.skills.length) {
        return false;
      }

      const matched = this.modifiedSkills.reduce((accumulator, value) => {
        if (!this.character.skills.find((x) => x._id === value._id)) {
          return accumulator;
        } else {
          return accumulator + 1;
        }
      }, 0);

      if (matched === this.character.skills.length) {
        return true;
      }

      return false;
    },
  },
  methods: {
    ...mapActions("character", ["fetchCharacter", "updateSkills"]),
    ...mapMutations("app", ["setLoading"]),
    handleSkillSelect: function(skill) {
      this.selectedSkill = skill;
    },
    handleDeleteSkill: function(skill) {
      this.modifiedSkills = this.modifiedSkills.filter(
        (x) => x._id !== skill._id
      );
    },
    handleSave: async function() {
      this.saveSuccess = false;

      this.setLoading({
        isLoading: true,
        loadingText: "Saving...",
      });
      await this.updateSkills(this.modifiedSkills.map((x) => x._id));

      this.saveSuccess = true;
      this.setLoading(false);
    },
    handleEquip: function() {
      this.modifiedSkills.push(this.selectedSkill);
    },
    setupSkills: async function() {
      this.isLoading = true;

      await this.fetchCharacter({
        accountId: this.getCurrentLoggedIn(),
      });

      this.modifiedSkills = [
        ...this.character.skills.map((i) => new SkillInfo(i)),
      ];
      const response = await this.getAvailableSkills(this.character._id);
      if (response.ok === true) {
        this.skills = response.body
          .map((i) => new SkillInfo(i))
          .filter((x) => x.classId === this.character.classType); // Filtered skills
      }

      this.isLoading = false;
    },
  },
  components: {
    ContentLoading,
    ContentBox,
    SectionHeader,
    SkillsList,
    SkillDetail,
    CharacterSkillsList,
  },
  mixins: [AccountsMixin, SkillsMixin],
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
