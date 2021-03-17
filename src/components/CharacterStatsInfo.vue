<template>
  <div class="root">
    <div class="row no-gutters">
      <section-header class="col-12 text-white text-center bg-dark" style="">
        Stats
      </section-header>

      <div class="col-12">
        <table class="table table-dark table-sm">
          <thead>
            <tr>
              <th>Attrib</th>
              <th>Base</th>
              <th>Bonus</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">HEALTH</th>
              <td>{{ info.stats.health }}</td>
              <td>{{ healthInfo.bonus }}</td>
              <td>{{ healthInfo.total }}</td>
            </tr>
            <tr>
              <th scope="row">MANA</th>
              <td>{{ info.stats.mana }}</td>
              <td>{{ manaInfo.bonus }}</td>
              <td>{{ manaInfo.total }}</td>
            </tr>
            <tr>
              <th scope="row">OFF</th>
              <td>{{ info.stats.off }}</td>
              <td>{{ offInfo.bonus }}</td>
              <td>{{ offInfo.total }}</td>
            </tr>
            <tr>
              <th scope="row">DEF</th>
              <td>{{ info.stats.def }}</td>
              <td>{{ defInfo.bonus }}</td>
              <td>{{ defInfo.total }}</td>
            </tr>
            <tr>
              <th scope="row">AGI</th>
              <td>{{ info.stats.agi }}</td>
              <td>{{ agiInfo.bonus }}</td>
              <td>{{ agiInfo.total }}</td>
            </tr>
            <tr>
              <th scope="row">INT</th>
              <td>{{ info.stats.int }}</td>
              <td>{{ intInfo.bonus }}</td>
              <td>{{ intInfo.total }}</td>
            </tr>
            <tr>
              <th scope="row">LUK</th>
              <td>{{ info.stats.luk }}</td>
              <td>{{ lukInfo.bonus }}</td>
              <td>{{ lukInfo.total }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="row no-gutters">
      <div class="col-6">
        <section-header>Equipments</section-header>
        <equipment-info
          :weapon="info.equipment.weapon.name"
          :armor="info.equipment.armor.name"
        ></equipment-info>
      </div>
      <div class="col-6">
        <section-header>Skills</section-header>
        <skills-info :skills="info.skills"></skills-info>
      </div>
    </div>

    <div class="d-flex justify-content-end">
      <div class="btn-group">
        <router-link to="/character/inventory" class="btn btn-secondary"
          >Inventory</router-link
        >
        <router-link to="/character/skills" class="btn btn-secondary"
          >Skills</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import { CharacterStatsInfo } from "../models/characterStatsInfo";
import SectionHeader from "./SectionHeader.vue";
import EquipmentInfo from "./EquipmentInfo.vue";
import SkillsInfo from "./SkillsInfo.vue";
import StatsMixin from "../shared/mixins/StatsMixin.vue";

export default {
  props: {
    info: {
      type: CharacterStatsInfo,
      required: true,
      default: new CharacterStatsInfo(),
    },
  },
  components: {
    SectionHeader,
    EquipmentInfo,
    SkillsInfo,
  },
  mixins: [StatsMixin],
};
</script>

<style scoped>
.root {
  color: white;
}

.avatar-container {
  margin: auto;
}

.info-label {
  font-weight: bold;
}
</style>
