  
<template>
  <div data-app> 
    <v-card>
      <v-container fluid>
        <v-row
          align="center"
        >
          <v-col cols="12">
            <v-autocomplete
              v-model="value"
              :items="items"
              dense
              filled
              label="영화 검색"
              @keypress.enter="tryThis"
            ></v-autocomplete>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
  export default {
    data: () => ({
      items: ['foo', 'bar', 'fizz', 'buzz'],
      values: ['foo', 'bar'],
      value: null,
    }),

    methods: {
      tryThis() {
        console.log(this.value)
      }
    }
  }
</script>