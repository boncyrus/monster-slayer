<template>
  <div class="d-flex flex-column">
    <h2 class="text-center text-white font-weight-bold p-0 m-0">
      Inventory
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
            <section-header class="text-white"
              >Current Equipment</section-header
            >
            <inventory-item-stats
              emptyMessage="Please select an item"
              :info="currentEquipment"
            ></inventory-item-stats>
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
import AccountsMixin from "../shared/mixins/AccountsMixin";
import { mapState, mapActions, mapMutations } from "vuex";
import SectionHeader from "./SectionHeader.vue";
import InventoryItemStats from "./InventoryItemStats.vue";
import { WeaponTypes } from "../models/weaponTypes";

export default {
  data() {
    return {
      inventory: [],
      isLoading: false,
      selectedItem: new InventoryDetails(),
      currentEquipment: new InventoryDetails(),
      newEquipments: [],
      isSaving: false,
    };
  },
  watch: {
    selectedItem: function(value) {
      if (value.item._id === "") {
        return;
      }

      if (value.item.type === WeaponTypes.armor) {
        this.currentEquipment = this.inventory.find(
          (x) => x.item._id === this.character.equipment.armor._id
        );
      } else {
        this.currentEquipment = this.inventory.find(
          (x) => x.item._id === this.character.equipment.weapon._id
        );
      }
    },
  },
  computed: {
    ...mapState({
      character: (state) => state.character.current,
    }),
    isEquipDisabled: function() {
      if (this.selectedItem._id === "") {
        return true;
      } else if (
        this.character.classType !== this.selectedItem.item.classId &&
        this.character.weapon._id === this.selectedItem.item._id
      ) {
        return true;
      } else if (this.newEquipments.length > 0) {
        return this.newEquipments.some(
          (x) => x.item.type === this.selectedItem.item.type
        );
      }

      return true;
    },
    isSaveDisabled: function() {
      return this.newEquipments.length <= 1;
    },
  },
  created() {
    this.setupInventory();
  },
  methods: {
    ...mapMutations("app", ["setLoading"]),
    ...mapActions("character", ["fetchCharacter", "updateEquipment"]),
    handleSave: async function() {
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

      this.setLoading(false);
    },
    handleEquip: function(inventory) {
      this.newEquipments.push(inventory);
    },
    async setupInventory() {
      await this.fetchCharacter({
        accountId: this.getCurrentLoggedIn(),
      });

      this.isLoading = true;
      const response = await this.getCurrentInventory();
      if (response.ok === true) {
        this.inventory = response.body.map((i) => new InventoryDetails(i));
      }

      this.isLoading = false;
    },
    handleItemSelect(inventory) {
      if (this.selectedItem === inventory) {
        this.selectedItem = new InventoryDetails();
      } else {
        this.selectedItem = inventory;
      }
    },
  },
  components: {
    ContentLoading,
    ContentBox,
    InventoryList,
    SectionHeader,
    InventoryItemStats,
  },
  mixins: [CharacterMixin, AccountsMixin],
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
