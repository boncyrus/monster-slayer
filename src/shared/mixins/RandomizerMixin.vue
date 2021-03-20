<script>
export default {
  methods: {
    randomize: function (min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    probability: function (precentage) {
      let count = 0;
      const rounded = Math.round(precentage);
      const arr = [];
      for (let i = 0; i < 100; i++) {
        if (count <= rounded) {
          arr.push(1);
        } else {
          arr.push(0);
        }

        count++;
      }

      const value = arr[this.randomize(0, arr.length - 1)];
      return value === 1 ? true : false;
    },
  },
};
</script>
