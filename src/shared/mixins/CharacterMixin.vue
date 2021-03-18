<script>
import { routes } from "../../models/apiConfig";
import { CharacterService } from "../../services/characterService";
import { LocalStorageKeys } from "../localStorage/localStorageKeys";

const characterService = new CharacterService();

export default {
  methods: {
    getCharacterInfo: function(id) {
      return this.$http.get(routes.getCharacterInfo(id));
    },
    getAvatar: function(classType) {
      if (classType > 0) {
        return characterService.getClassType(this.classType).avatar;
      }

      return "";
    },
    getInventory: function(characterId) {
      return this.$http.get(routes.getCharacterInventory(characterId).url);
    },
    getCurrentInventory: function() {
      return this.getInventory(this.getCurrentCharacterId());
    },
    getCurrentCharacterId: function() {
      return localStorage.getItem(LocalStorageKeys.characterId);
    },
    updateCharacterEquipment: function(characterId, updateRequest) {
      return this.$http.put(
        routes.updateCharacterEquipment(characterId).url,
        updateRequest
      );
    },
    getDungeons: function(characterId) {
      return this.$http.get(routes.getDungeons(characterId).url);
    },
    enterDungeon: function(enterDungeonRequest) {
      return this.$http.post(routes.enterDungeon.url, enterDungeonRequest);
    },
  },
};
</script>
