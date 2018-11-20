<template>
  <v-container>
    <v-layout row>
      <v-spacer />
      <v-flex xs4>
        <v-dual-list
          :leftListData="leftListData"
          :rightListData="rightListData"
          sort="asc"
          sortKey="id"
          dataKey="id"
          textKey="text"
        ></v-dual-list>
      </v-flex>
      <v-spacer />
    </v-layout>
  </v-container>
</template>

<script>
  import VDualList from './VDualList';
  export default {
    components: {
      VDualList,
    },
    data: () => ({
      leftListData: [
        {id: 1, text: 'Pawn', meta: 'item1' },
        {id: 2, text: 'Knight', meta: 'item2' },
        {id: 3, text: 'Rook', meta: 'item3' },
        {id: 4, text: 'Bishop', meta: 'item4' },
        {id: 5, text: 'Queen', meta: 'item5' },
        {id: 6, text: 'King', meta: 'item6' },
        'text1',
        'text2',
      ],
      rightListData: [],
    })
  }
</script>
