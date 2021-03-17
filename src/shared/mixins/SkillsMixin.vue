<script>
import { SkillTypes } from "../../models/skillTypes";

export default {
  methods: {
    getSkillIcon: function(skillType) {
      switch (skillType) {
        case SkillTypes.magical.code:
          return `icon-${SkillTypes.magical.description}`;
        case SkillTypes.physical.code:
          return `icon-${SkillTypes.physical.description}`;
        default:
          return "";
      }
    },
  },
};
</script>
