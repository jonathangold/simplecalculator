// Initialize app
var myApp = new Framework7();


// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
  calcModule.init()
});

// Now we need to run the code that will be executed only for About page.

// Option 1. Using page callback for page (for "about" page in this case) (recommended way):
myApp.onPageInit('about', function (page) {
    // Do something here for "about" page

})

let calcModule = {
  buffer: '0',
  result: 0,
  newln: true ,
  oper: '+',

  init: function(){
    this.bindEvents()
  },

  bindEvents: function(){
    $$('.number').on('click', function(event){
        let value = $$(event.target).text()
        calcModule.numInput(value)
    })
    $$('.oper').on('click', function(event){
        let value = $$(event.target).text()
        calcModule.opInput(value)
    })
    $$('.decimal').on('click', function(event){
        let value = $$(event.target).text()
        calcModule.decInput()
    })
    $$('.clear').on('click', function(event){
        let value = $$(event.target).text()
        calcModule.clear(value)
    })

  },

  numInput: function(value){
    if (this.newln){
      $$('.card').text(value)
      this.newln = false
    }
    else {
    $$('.card').append(value)
    }
  },

  opInput: function(value){
    if (!this.newln){
      let buff = $$('.card').text()
      this.putBuffer(buff + value)
      this.newln = true
      this.getResult()
    }
  },

  decInput: function() {
    if (!$$('.card').text().includes('.')) {
      $$('.card').text($$('.card').text() + '.')
      this.newln = false
    }
  },

  putBuffer: function(e){
    if (this.oper == '='){
      this.result = 0
      this.oper = '+'
    }
    this.buffer = this.result + this.oper + e
    this.oper = e.slice(-1)
  },

  getResult: function(){
    this.result = eval(this.buffer.slice(0, -1))
    $$('.card').text(this.result)
  },

  clear: function(value){
    $$('.card').text('0')
    this.newln = true
    if (value == 'CE'){
      this.result = 0
      this.oper = '+'
    }
  }
}
