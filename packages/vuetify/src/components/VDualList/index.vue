<template>
  <v-container>
    <v-layout row>
      <v-spacer />
      <v-flex xs4>
        <!-- 
          Bare minimum config
            Accepts array of strings, objects, or both
            Sortable asc/desc and by custom key
            Click to move
          Optional Props
            headers -> Object: {right: String, left: String}
            sort="asc" -> String: ['asc', 'desc']
            sortKey -> String: if data is array of objects, object prop to sort by
              default: id
            dataKey -> String: if data is array of objects, object prop to use as key
              default: id
            textKey -> String: if data is array of objects, object prop containting list item text
                If string, data is array of strings, string value is displayed
                default: text;
        -->
        <v-dual-list
          :leftListData="leftListData"
          :rightListData="rightListData"
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
      headers: {left: 'Header 11', right: 'Header 22'},
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
