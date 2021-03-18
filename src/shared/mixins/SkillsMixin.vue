<script>
import { SkillTypes } from "../../models/skillTypes";
import { routes } from "../../models/apiConfig";

export default {
  methods: {
    getSkillIcon: function(skillType) {
      switch (skillType) {
        case SkillTypes.magical.code:
          return `icon-${SkillTypes.magical.description.toLowerCase()}`;
        case SkillTypes.physical.code:
          return `icon-${SkillTypes.physical.description.toLowerCase()}`;
        default:
          return "";
      }
    },
    getAvailableSkills: async function(characterId) {
      return this.$http.get(routes.getAvailableSkills(characterId).url);
    },
  },
};
</script>
