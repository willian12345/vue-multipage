<script>
  import Vue from 'vue'
  export default {
    name: 'DuduLink',
    props: {
      href: {
        type: String,
        required: true
      },
      openBroswer: {
        type: Boolean,
        default: false
      }
    },
    render(h){
      return h('div', {
        on: { 
          click: () => { 
            console.log(this.href)
            window.location.href = this.href
          }
        }
      }, this.$slots.default)
    }
  }
</script>