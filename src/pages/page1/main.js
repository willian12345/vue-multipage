import Vue from 'vue'
import '@/assets/js/main'
import '@assets/style/main.scss'
import './page1.scss'

new Vue({
  el: '#app',
  data() {
    return {
      text: 'hellworld',
      num: 0
    }
  },
  
  methods: {
    handleClick(num) {
      alert(num)
    },
    add(){
      this.num++
    }
  },
  render (h) {
    const numbers = [1, 2, 3, 4, 5]
    const listItems = numbers.map((number) =>
      <li onClick={this.handleClick.bind(this, number)}>可点击: {number}</li>
    )

    const countNumber = (
      <button onClick={this.add.bind(this)}>点击计数: {this.num}</button>
    )
    
    return (
      <div class="page">
        <h1>jsx 语法支持页</h1>
        <h4>{this.text}</h4>
        {countNumber}
        <ul class="data-list">
          {listItems}
        </ul>
      </div>
    )
  }
})