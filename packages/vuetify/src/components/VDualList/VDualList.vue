<template>
  <v-layout>
    <v-flex>
      <v-subheader>Header1</v-subheader>
      <v-list class="cardContainer">
        <v-list-tile
          v-for="(item, i) in leftListData"
          :key="i"
          @click="moveItem(rightListData, leftListData, item)"
        >
          <v-list-tile-title v-text="typeof item === 'object' ? item[textKey] : item"></v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-flex>
    <v-flex>
      <v-subheader>Header2</v-subheader>
      <v-list class="cardContainer">
        <v-list-tile
          v-for="(item, i) in rightListData"
          :key="i"
          @click="moveItem(leftListData, rightListData, item)"
        >
          <v-list-tile-title v-text="typeof item === 'object' ? item[textKey] : item"></v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    props:{
      leftListData: Array,
      rightListData: Array,
      sort: {
        type: String,
        default: null,
        validator: v =>  ['asc', 'desc'].indexOf(v) !== -1
      },
      sortKey: [String, Number],
      dataKey: [String, Number],
      textKey: [String, Number],
    },
    data: () => ({
      //
    }),
    methods: {
      moveItem(to, from, item) {
        const i = from.findIndex(m => m[this.dataKey] === item[this.dataKey]);
        to.push(from[i]);
        from.splice(i, 1);
        if (this.sort) {
          this.sortArrays();
        }
      },
      sortArrays() {
        const sortFunc = (a, b) => {
          const useKeyA = (typeof a === 'object') ? true : false ;
          const useKeyB = (typeof b === 'object') ? true : false ;
          const valA = (useKeyA) ? a[this.sortKey].toString().toUpperCase() : a.toUpperCase() ;
          const valB = (useKeyB) ? b[this.sortKey].toString().toUpperCase() : b.toUpperCase() ;
          if (valA < valB) {
            if (this.sort === 'asc'){ return -1; }
            if (this.sort === 'desc'){ return 1; }
          }
          if (valA > valB) {
            if (this.sort === 'asc'){ return 1; }
            if (this.sort === 'desc'){ return -1; }
          }
          return 0;
        };
        this.leftListData.sort((a, b) => (sortFunc(a, b)));
        this.rightListData.sort((a, b) => (sortFunc(a, b)));
      },
    },
    mounted() {
      if(this.sort){ this.sortArrays(); }
    }
  }
</script>
<style lang="css">
.cardContainer{
  margin: 0px 10px 0px 10px !important;
  overflow-y: auto !important;
  border: 1px solid #818181;
}
</style>
