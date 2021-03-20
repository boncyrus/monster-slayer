<template>
  <div
    class="d-flex flex-column justify-content-center content-container w-100"
  >
    <template v-if="isLoading">
      <content-loading
        :isLoading="isLoading"
        class="text-white"
        text="Preparing battlefield"
      >
      </content-loading>
    </template>
    <template v-else>
      <div class="d-flex character-container justify-content-center">
        <character
          class="w-50"
          :health="playerStats.healthPercentage"
          :mana="playerStats.manaPercentage"
          :classType="player.classType"
          :name="player.name"
        >
        </character>
        <character
          class="w-50"
          :health="enemyStats.healthPercentage"
          :mana="enemyStats.manaPercentage"
          :imageSrc="`images/enemies/${enemy.image}.png`"
          :name="enemy.name"
        >
        </character>
      </div>
      <div class="d-flex">
        <div class="px-1 w-50">
          <player-controls
            :skills="player.skills"
            :beforeActionExecute="beforeActionExecute"
            :beforeSkillExecute="beforeSkillExecute"
            :onActionExecute="onActionExecute"
            :onSkillExecute="onSkillExecute"
            :actions="actions.player"
            :mana="player.stats.mana"
          ></player-controls>
        </div>

        <div class="px-1 w-50">
          <battle-logs :logs="battleLogs"></battle-logs>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import BattleLogs from "./BattleLogs.vue";
import Character from "./Character.vue";
import PlayerControls from "./PlayerControls.vue";
import AccountsMixin from "../shared/mixins/AccountsMixin.vue";
import CharacterAction from "../models/characterAction";
import CharacterMixin from "../shared/mixins/CharacterMixin.vue";
import StatsMixin from "../shared/mixins/StatsMixin.vue";
import BattleLog from "../models/battleLog";
import RandomizerMixin from "../shared/mixins/RandomizerMixin.vue";
import { CharacterModel } from "../models/characterModel";
import { TargetTypes } from "../models/targetTypes";
import { mapActions, mapMutations } from "vuex";
import { EnterDungeonRequest } from "../models/enterDungeonRequest";
import ContentLoading from "./ContentLoading.vue";
import { DungeonPreview } from "../models/dungeonPreview";
import { FinishBattleRequest } from "../models/finishBattleRequest";
import { DungeonInfo } from "../models/dungeonInfo";
import { SkillTypes } from "../models/skillTypes";

export default {
  beforeRouteLeave(to, from, next) {
    this.setBg();
    next();
  },
  created: function() {
    this.reset();
  },
  watch: {
    "player.stats.health": function(value) {
      this.ensureHealth(value, this.player, this.playerStats);

      this.playerStats.healthPercentage = this.computePoints(
        value,
        this.playerStats.maxHealth
      );
    },
    "player.stats.mana": function(value) {
      this.ensureMana(value, this.player, this.playerStats);

      this.playerStats.manaPercentage = this.computePoints(
        value,
        this.playerStats.maxMana
      );
    },
    "enemy.stats.health": function(value) {
      this.ensureHealth(value, this.enemy, this.enemyStats);

      this.enemyStats.healthPercentage = this.computePoints(
        value,
        this.enemyStats.maxHealth
      );
    },
    "enemy.stats.mana": function(value) {
      this.ensureMana(value, this.enemy, this.enemyStats);

      this.enemyStats.manaPercentage = this.computePoints(
        value,
        this.enemyStats.maxMana
      );
    },
    isBattleDone: async function(value) {
      if (value === true) {
        await this.finishBattle(
          new FinishBattleRequest({
            characterId: this.player._id,
            dungeonId: this.dungeonInfo._id,
            enemyId: this.enemy._id,
          })
        );

        this.reset();
        // setTimeout(() => {
        //   let name =
        //     this.player.stats.health <= 0 ? this.enemy.name : this.player.name;
        //   alert(`${name} won!`);
        //   this.reset();
        // }, 800);
      }
    },
  },
  methods: {
    ...mapActions("character", ["fetchCharacter", "finishBattle"]),
    ...mapMutations("app", ["setLoading", "setBg"]),
    ensureHealth: function(value, character, stats) {
      if (value <= 0) {
        character.stats.health = 0;
        this.isBattleDone = true;
      } else if (value > stats.maxHealth) {
        character.stats.health = stats.maxHealth;
      }
    },
    ensureMana: function(value, character, stats) {
      if (value <= 0) {
        character.stats.mana = 0;
      } else if (value > stats.maxMana) {
        character.stats.mana = stats.maxMana;
      }
    },
    reset: async function() {
      this.isLoading = true;
      this.battleLogs = [];
      this.isBattleDone = false;
      const playerData = await this.fetchCharacter({
        accountId: this.getCurrentLoggedIn(),
        invalidate: true,
      });

      this.player = new CharacterModel(playerData);
      this.playerStats.maxHealth = this.player.stats.health;
      this.playerStats.maxMana = this.player.stats.mana;

      const dungeonId = this.$route.params.id;
      const enterDungeonResponse = await this.enterDungeon(
        new EnterDungeonRequest({
          characterId: this.player._id,
          dungeonId,
        })
      );

      if (enterDungeonResponse.ok === true) {
        this.setBg(
          `/images/dungeons/${enterDungeonResponse.body.dungeon.image}.jpg`
        );
        this.enemy = new CharacterModel(enterDungeonResponse.body.enemy);
        this.dungeonInfo = new DungeonInfo(enterDungeonResponse.body.dungeon);

        this.enemyStats.maxHealth = this.enemy.stats.health;
        this.enemyStats.maxMana = this.enemy.stats.mana;
      }

      this.isLoading = false;
    },
    computePoints: function(value, max) {
      return (value / max) * 100;
    },
    addBattleLog: function(log) {
      this.battleLogs.push(log);
    },
    beforeActionExecute: function(action) {
      console.log(action);
      return true;
    },
    computeDamage: function(stat, damage) {
      return stat * (damage / 100);
    },
    computeDefense: function(stat, damage) {
      const threshold = 50;
      return ((threshold - stat) / threshold) * damage;
    },
    getDamageInfo: function(player, enemy, move) {
      let initialDamage = 0;
      let reduction = 0;
      let damage = 0;
      let isCrit = false;
      let isMissed = false;

      if (move instanceof CharacterAction) {
        initialDamage = this.computeTotalStats(player, "off");
        reduction = this.computeDefense(
          this.computeTotalStats(enemy, "def"),
          initialDamage
        );

        damage = initialDamage - reduction;
      } else {
        const statName = move.type === SkillTypes.magical.code ? "int" : "off";
        initialDamage = this.computeDamage(
          this.computeTotalStats(player, statName),
          move.damage
        );

        reduction = this.computeDefense(
          this.computeTotalStats(enemy, "def"),
          initialDamage
        );

        damage = initialDamage - reduction;
      }

      return {
        value: damage,
        name: move.name,
        isCrit,
        isMissed,
        target: move.target,
      };
      // const initialDamage = this.getDamageMultiplier(this.computeTotalStats(), damage);
      // const reduction = this.computeDefense(enemyStat.def, damage);

      // return initialDamage - reduction;
    },
    onActionExecute: function(action) {
      this.battleLogs = [];
      let damageInfo;

      if (action.target === TargetTypes.enemy.code) {
        damageInfo = this.getDamageInfo(this.player, this.enemy, action);
        this.enemy.stats.health -= damageInfo.value;
      } else {
        this.player.stats.mana += action.value;
      }

      this.addBattleLog(this.createActionLog(this.player.name, damageInfo));
      this.performEnemyMove();
    },
    beforeSkillExecute: function(skill) {
      return skill.cost <= this.player.stats.mana;
    },
    onSkillExecute: function(skill) {
      this.battleLogs = [];
      let damageInfo;

      if (skill.target === TargetTypes.enemy.code) {
        damageInfo = this.getDamageInfo(this.player, this.enemy, skill);
        this.enemy.stats.health -= damageInfo.value;
      } else {
        if (skill.damage < 0) {
          this.player.stats.health += Math.abs(skill.damage);
        }
      }

      this.player.stats.mana -= Math.abs(skill.cost);

      this.addBattleLog(this.createSkillLog(this.player.name, skill));
      this.performEnemyMove();
    },
    beforeEnemyActionExecute: function(action) {
      console.log(action);
      return true;
    },
    onEnemyActionExecute: function(action) {
      if (action.target === TargetTypes.enemy.code) {
        this.player.stats.health -= Math.abs(action.value);
      } else {
        this.enemy.stats.mana += Math.abs(action.value);
      }

      this.addBattleLog(this.createActionLog(this.enemy.name, action));
    },
    beforeEnemySkillExecute: function(skill) {
      return skill.cost <= this.enemy.stats.mana;
    },
    onEnemySkillExecute: function(skill) {
      if (skill.target === TargetTypes.enemy.code) {
        this.player.stats.health -= Math.abs(skill.damage);
      } else {
        if (skill.damge < 0) {
          this.enemy.stats.health += Math.abs(skill.damage);
        }
      }

      this.enemy.stats.mana -= Math.abs(skill.cost);
      this.addBattleLog(this.createSkillLog(this.enemy.name, skill));
    },
    createActionLog: function(name, action) {
      if (action.target === TargetTypes.enemy.code) {
        return new BattleLog(
          `${name} performed ${action.name}! Dealt ${action.value} damage!`
        );
      } else if (action.target === TargetTypes.self.code) {
        if (action.name === "Focus") {
          return new BattleLog(
            `${name} performed ${action.name}! ${action.value} mp restored!`
          );
        }
      }
    },
    createSkillLog: function(name, skill) {
      const damage = Math.abs(skill.damage);
      if (skill.target === TargetTypes.enemy.code) {
        return new BattleLog(
          `${name} used ${skill.name}! Dealt ${damage} damage!`
        );
      } else {
        if (skill.damage < 0) {
          return new BattleLog(
            `${name} used ${skill.name}! ${damage} hp restored!`
          );
        }
      }
    },
    performEnemyMove: function() {
      const move = this.randomize(0, 1);

      if (move === 0) {
        const action = this.actions.enemy[
          this.randomize(0, this.actions.enemy.length - 1)
        ];
        const canExecute = this.beforeEnemyActionExecute(action);

        if (canExecute === true) {
          this.onEnemyActionExecute(action);
        }
      } else {
        const skill = this.enemy.skills[
          this.randomize(0, this.enemy.skills.length - 1)
        ];
        const canExecute = this.beforeEnemySkillExecute(skill);

        if (canExecute === true) {
          this.onEnemySkillExecute(skill);
        }
      }
    },
  },
  data() {
    return {
      dungeonInfo: new DungeonPreview(),
      player: new CharacterModel(),
      enemy: new CharacterModel(),
      isLoading: false,
      battleLogs: [],
      isBattleDone: false,
      playerStats: {
        healthPercentage: 100,
        manaPercentage: 100,
        maxHealth: 100,
        maxMana: 100,
      },
      enemyStats: {
        healthPercentage: 100,
        manaPercentage: 100,
        maxHealth: 100,
        maxMana: 100,
      },
      actions: {
        player: [
          new CharacterAction({
            name: "Attack",
            value: 10,
            target: TargetTypes.enemy.code,
          }),
          new CharacterAction({
            name: "Focus",
            value: 20,
            target: TargetTypes.self.code,
          }),
        ],
        enemy: [
          new CharacterAction({
            name: "Attack",
            value: 10,
            target: TargetTypes.enemy.code,
          }),
          new CharacterAction({
            name: "Focus",
            value: 20,
            target: TargetTypes.self.code,
          }),
        ],
      },
    };
  },
  components: {
    Character,
    PlayerControls,
    BattleLogs,
    ContentLoading,
  },
  mixins: [AccountsMixin, CharacterMixin, RandomizerMixin, StatsMixin],
};
</script>

<style scoped>
.character-container {
  flex: 1;
}

.loading {
  margin: 0 auto;
}
</style>
