<script>
import { WeaponTypes } from "../../models/weaponTypes";

const icons = [
  "sword",
  "breastplate",
  "broadsword",
  "fencingarmor",
  "garb",
  "tunic",
  "axe",
  "robe",
  "rod",
  "hammer",
  "bow",
  "rapier",
  "staff",
  "javelin",
  "armor",
  "spear",
  "frostmourne",
  "trident",
  "cassowar",
  "prime",
  "masamune",
  "pole",
  "scepter",
  "halberd",
];

export default {
  methods: {
    getDefaultEquipmentIcon: function(equipmentType) {
      switch (equipmentType) {
        case WeaponTypes.weapon:
          return "icon-sword";
        case WeaponTypes.armor:
          return "icon-armor";
        default:
          return "";
      }
    },
    getEquipmentIcon: function({ name, type }) {

      const index = icons.findIndex((x) =>
        name
          .split(" ")
          .join("")
          .toLowerCase()
          .includes(x.toLowerCase())
      );

      if (index >= 0) {
        return `icon-${icons[index]}`;
      }

      return this.getDefaultEquipmentIcon(type);
    },
  },
};
</script>
