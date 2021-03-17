<script>
import { WeaponTypes } from "../../models/weaponTypes";

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
  },
};
</script>
