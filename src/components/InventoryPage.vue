<template>
  <div class="d-flex flex-column">
    <v-snackbar
      color="primary"
      centered
      content-class="text-center"
      :timeout="1500"
      v-model="saveSuccess"
    >
      <span class="text-white">Inventory saved!</span>
    </v-snackbar>
    <h2 class="text-center text-white font-weight-bold p-0 m-0">Inventory</h2>
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
              <inventory-list
                @onItemSelect="handleItemSelect"
                :inventory="inventory"
              ></inventory-list>
            </content-loading>
          </content-box>
        </div>
        <div class="col-12 col-md-4 p-1 d-flex flex-column">
          <content-box class="p-3 content-container mb-2">
            <section-header class="text-white">Selected Item</section-header>
            <inventory-item-stats
              emptyMessage="Please select an item"
              :info="selectedItem"
            ></inventory-item-stats>
          </content-box>
          <content-box class="p-3 content-container mb-2">
            <div class="d-flex align-items-center mb-2">
              <section-header class="text-white mb-0"
                >Current Equipment</section-header
              >
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <i class="icon-info text-white ml-2" v-on="on" />
                </template>
                <span>You can equip 1 weapon and armor.</span>
              </v-tooltip>
            </div>
            <content-loading
              :isLoading="isLoading"
              textClass="text-white"
              text="Getting equipped items"
            >
              <div class="row no-gutters">
                <div
                  class="col-12"
                  v-for="eq in newEquipments"
                  :key="eq.item._id"
                >
                  <icon-text
                    class="text-white"
                    :iconClass="getEquipmentIcon(eq.item)"
                    >{{ eq.item.name }}</icon-text
                  >
                </div>
              </div>
            </content-loading>
          </content-box>
          <div class="btn-group w-100 inventory-actions-container">
            <button
              @click.prevent="handleEquip(selectedItem)"
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
import CharacterMixin from "../shared/mixins/CharacterMixin.vue";
import { InventoryDetails } from "../models/inventoryDetails";
import ContentLoading from "./ContentLoading.vue";
import ContentBox from "./ContentBox.vue";
import InventoryList from "./InventoryList.vue";
import AccountsMixin from "../shared/mixins/AccountsMixin.vue";
import EquipmentMixin from "../shared/mixins/EquipmentMixin.vue";
import { mapState, mapActions, mapMutations } from "vuex";
import SectionHeader from "./SectionHeader.vue";
import InventoryItemStats from "./InventoryItemStats.vue";
import { WeaponTypes } from "../models/weaponTypes";
import IconText from "./IconText.vue";

export default {
  data() {
    return {
      inventory: [],
      isLoading: false,
      selectedItem: new InventoryDetails(),
      currentEquipment: new InventoryDetails(),
      newEquipments: [],
      isSaving: false,
      saveSuccess: false,
    };
  },
  watch: {
    selectedItem: function (value) {
      if (value.item._id === "") {
        return;
      }

      let id = "";
      if (value.item.type === WeaponTypes.armor) {
        id = this.character.equipment.armor._id;
      } else {
        id = this.character.equipment.weapon._id;
      }

      this.currentEquipment = this.newEquipments.find((x) => x.item._id === id);
    },
  },
  computed: {
    ...mapState({
      character: (state) => state.character.current,
    }),
    isEquipDisabled: function () {
      if (this.selectedItem.item._id === "") {
        return true;
      } else if (
        this.newEquipments.some(
          (x) => this.selectedItem.item._id === x.item._id
        )
      ) {
        return true;
      }

      return false;
    },
    isSaveDisabled: function () {
      if (this.selectedItem.item._id === "") {
        return true;
      }

      const matched = this.newEquipments.reduce((accumulator, value) => {
        if (
          this.character.equipment.weapon._id !== value.item._id &&
          this.character.equipment.armor._id !== value.item._id
        ) {
          return accumulator;
        } else {
          return accumulator + 1;
        }
      }, 0);

      return matched === 2;
    },
  },
  created() {
    this.setupInventory();
  },
  methods: {
    ...mapMutations("app", ["setLoading"]),
    ...mapActions("character", ["fetchCharacter", "updateEquipment"]),
    handleSave: async function () {
      this.saveSuccess = false;

      this.setLoading({
        isLoading: true,
        loadingText: "Saving...",
      });

      let armorId;
      let weaponId;

      this.newEquipments.forEach((e) => {
        let equipment = e.item;
        if (equipment.type === WeaponTypes.armor) {
          armorId = equipment._id;
        } else {
          weaponId = equipment._id;
        }
      });

      await this.updateEquipment({
        weaponId,
        armorId,
      });

      this.saveSuccess = true;

      this.setLoading(false);
    },
    handleEquip: function (inventory) {
      if (inventory.item.type === WeaponTypes.weapon) {
        this.$set(
          this.newEquipments,
          0,
          new InventoryDetails({ ...inventory })
        );
      } else {
        this.$set(
          this.newEquipments,
          1,
          new InventoryDetails({ ...inventory })
        );
      }
    },
    async setupInventory() {
      await this.fetchCharacter({
        accountId: this.getCurrentLoggedIn(),
      });

      this.isLoading = true;
      const response = await this.getCurrentInventory();
      if (response.ok === true) {
        // Filtered equipments
        this.inventory = response.body
          .map((i) => new InventoryDetails(i))
          .filter((x) => x.item.classId === this.character.classType);

        this.newEquipments = [
          new InventoryDetails({
            item: this.character.equipment.weapon,
          }),
          new InventoryDetails({
            item: this.character.equipment.armor,
          }),
        ];
      }

      this.isLoading = false;
    },
    handleItemSelect(inventory) {
      if (this.selectedItem === inventory) {
        this.selectedItem = new InventoryDetails();
      } else {
        this.selectedItem = new InventoryDetails({ ...inventory });
      }
    },
  },
  components: {
    ContentLoading,
    ContentBox,
    InventoryList,
    SectionHeader,
    InventoryItemStats,
    IconText,
  },
  mixins: [CharacterMixin, AccountsMixin, EquipmentMixin],
};
</script>

<style scoped>
.content-container {
  flex: 1;
}

.inventory-actions-container {
  margin: 0 auto;
}
</style>
