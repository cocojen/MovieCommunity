<template>
  <v-container fluid>
    <v-row align="center">
      <v-col
        class="d-flex"
        cols="12"
        sm="6"
      >
        <v-select
          :items="items"
          label="정렬하기"
        ></v-select>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'DropDown',
  data: () => ({
    items: ['내 별점 높은 순으로', '내 별점 낮은 순으로',],
  }),
}
</script>

<style>

</style>