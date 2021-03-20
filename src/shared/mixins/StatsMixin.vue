<script>
export default {
  computed: {
    healthInfo: function() {
      const base = this.info.stats.health;
      const bonus =
        this.info.equipment.weapon.bonus.health +
        this.info.equipment.armor.bonus.health;
      const total = base + bonus;

      return {
        base,
        bonus,
        total,
      };
    },
    manaInfo: function() {
      const base = this.info.stats.mana;
      const bonus =
        this.info.equipment.weapon.bonus.mana +
        this.info.equipment.armor.bonus.mana;
      const total = base + bonus;

      return {
        base,
        bonus,
        total,
      };
    },
    offInfo: function() {
      const base = this.info.stats.off;
      const bonus =
        this.info.equipment.weapon.bonus.off +
        this.info.equipment.armor.bonus.off;
      const total = base + bonus;

      return {
        base,
        bonus,
        total,
      };
    },
    defInfo: function() {
      const base = this.info.stats.def;
      const bonus =
        this.info.equipment.weapon.bonus.def +
        this.info.equipment.armor.bonus.def;
      const total = base + bonus;

      return {
        base,
        bonus,
        total,
      };
    },
    agiInfo: function() {
      const base = this.info.stats.agi;
      const bonus =
        this.info.equipment.weapon.bonus.agi +
        this.info.equipment.armor.bonus.agi;
      const total = base + bonus;

      return {
        base,
        bonus,
        total,
      };
    },
    intInfo: function() {
      const base = this.info.stats.int;
      const bonus =
        this.info.equipment.weapon.bonus.int +
        this.info.equipment.armor.bonus.int;
      const total = base + bonus;

      return {
        base,
        bonus,
        total,
      };
    },
    lukInfo: function() {
      const base = this.info.stats.luk;
      const bonus =
        this.info.equipment.weapon.bonus.luk +
        this.info.equipment.armor.bonus.luk;
      const total = base + bonus;

      return {
        base,
        bonus,
        total,
      };
    },
  },
  methods: {
    computeTotalStats: function(character, statName) {
      const base = character.stats[statName];
      const bonus =
        character.equipment.weapon.bonus[statName] +
        character.equipment.armor.bonus[statName];
      return base + bonus;
    },
  },
};
</script>
