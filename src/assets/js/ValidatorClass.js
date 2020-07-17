class ValidatorClass {
  constructor(vArr){
      return  vArr.map(( v ) => {
          if(v.required){
              v.validator = this.empty
          }else if(v.max || v.min){
              v.validator = this.minmax
          }else if(v.reg){
              v.validator = this.reg
          }
          return v
      })
  }
  empty(rule, value, callback) {
      if (value === '') {
          callback(new Error(rule.message));
      }else{
          callback()
      }
  }
  minmax (rule, value, callback) {
      let {min, max} = rule
      let vl
      if(min || max){
          vl = value.replace(/[\u4e00-\u9fa5]/g, 'aa').length
      }
      if(max){
          max *= 2
      }
      if(min){
          min *= 2
      }
      
      if(vl > max || vl < min){
          callback(new Error(rule.message))
      }else{
          callback()
      }
  }
  reg(rule, value, callback){
      let reg = rule.reg
      if(!reg.test(value)){
          callback(new Error(rule.message))
      }else{
          callback()
      }
  }
}

export default ValidatorClass