<template>
  <div>
    <virtual-list style="height: 360px; overflow-y: auto;"
      :data-key="'uid'"
      :data-sources="items"
      :data-component="itemComponent"
    />
  </div>
</template>
<script>
  import Item from './Item'
  import VirtualList from 'vue-virtual-scroll-list'

  export default {
    name: 'root',
    data () {
      return {
        itemComponent: Item,
        items: []
      }
    },
    created () {
      for(let i=0;i<1000;i++){
        this.items.push({uid: 'unique_'+i, text: 'abc'+Math.random()})
      }
    },
    components: { 'virtual-list': VirtualList }
  }
</script>
