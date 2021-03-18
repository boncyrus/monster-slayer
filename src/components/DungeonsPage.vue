<template>
  <div class="d-flex flex-column">
    <h2 class="text-center text-white font-weight-bold p-0 m-0">
      Dungeons
    </h2>
    <div class="container content-container">
      <div class="row h-100 justify-content-center">
        <div class="col-md-4 col-12 p-1">
          <content-box class="h-100 p-3 dungeon-list-box">
            <content-loading
              :isLoading="isLoading"
              class="h-100"
              textClass="text-white"
              text="Getting dungeons"
            >
              <dungeons-list
                @onSelect="handleDungeonSelection"
                :dungeons="dungeons"
                :selected="selectedDungeon"
              ></dungeons-list>
            </content-loading>
          </content-box>
        </div>
        <div class="col-md-8 col-12 p-1">
          <content-box class="h-100 p-3">
            <content-loading
              :isLoading="isLoading"
              class="h-100"
              textClass="text-white"
              text="Getting dungeon information"
            >
              <dungeon-details :dungeon="selectedDungeon"></dungeon-details>
            </content-loading>
          </content-box>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ContentLoading from "./ContentLoading.vue";
import ContentBox from "./ContentBox.vue";
import CharacterMixin from "../shared/mixins/CharacterMixin.vue";
import { DungeonInfo } from "../models/dungeonInfo";
import DungeonsList from "./DungeonsList.vue";
import DungeonDetails from "./DungeonDetails.vue";

export default {
  created() {
    this.setupDungeons();
  },
  data() {
    return {
      dungeons: [],
      isLoading: false,
      selectedDungeon: new DungeonInfo(),
    };
  },
  components: {
    ContentLoading,
    ContentBox,
    DungeonsList,
    DungeonDetails,
  },
  methods: {
    setupDungeons: async function() {
      this.isLoading = true;
      const response = await this.getDungeons(this.getCurrentCharacterId());
      this.isLoading = false;
      if (response.ok === true) {
        this.dungeons = response.body.map((d) => new DungeonInfo(d));
      }

      if (this.dungeons.length > 0) {
        this.handleDungeonSelection(this.dungeons[0]);
      }
    },
    handleDungeonSelection(dungeon) {
      this.selectedDungeon = dungeon;
    },
  },
  mixins: [CharacterMixin],
};
</script>

<style scoped>
.content-container {
  flex: 1;
}

.dungeon-list-box {
  max-height: 541.778px;
  overflow-y: auto;
}

.dungeon-list-box::-webkit-scrollbar {
  width: 12px; /* width of the entire scrollbar */
}

.dungeon-list-box::-webkit-scrollbar-track {
  background: transparent; /* color of the tracking area */
}

.dungeon-list-box::-webkit-scrollbar-thumb {
  background-color: gray; /* color of the scroll thumb */
  border-radius: 20px; /* roundness of the scroll thumb */
}
</style>
