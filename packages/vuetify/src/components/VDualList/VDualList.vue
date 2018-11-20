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
          <v-list-tile-title v-text="item[textKey]"></v-list-tile-title>
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
          <v-list-tile-title v-text="item[textKey]"></v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    props:[
      'leftListData',
      'rightListData',
      'sort',
      'sortKey',
      'dataKey',
      'textKey',
    ],
    data: () => ({
      //
    }),
    methods: {
      moveItem(to, from, item) {
        const i = from.findIndex(m => m[this.dataKey] === item[this.dataKey]);
        to.push(from[i]);
        from.splice(i, 1);
        this.sortArrays();
      },
      sortArrays() {
        const sortFunc = (a, b) => {
          if (a[this.sortKey].toString().toUpperCase() < b[this.sortKey].toString().toUpperCase()) {
            if (this.sort === 'asc'){
              return -1;
            }
            if(this.sort === 'desc'){
              return 1;
            }
          }
          if (a[this.sortKey].toString().toUpperCase() > b[this.sortKey].toString().toUpperCase()) {
            if (this.sort === 'asc'){
              return 1;
            }
            if(this.sort === 'desc'){
              return -1;
            }
          }
          return 0;
        };
        this.leftListData.sort((a, b) => (sortFunc(a, b)));
        this.rightListData.sort((a, b) => (sortFunc(a, b)));
      },
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
