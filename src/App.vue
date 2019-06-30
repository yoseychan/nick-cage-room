<template>
  <div id="app">
   <div class="nick" @click="scareMe" >
    <img src="./assets/nick.png" alt="Nick is watching you" id="nightmare">
   </div>
  </div>
</template>
<style lang="scss">
body {
  margin:0;
  padding: 0;
  background-color: #333333;
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    .nick {
      height: 100vh;
      background-image: url("");
      img {
        position: absolute;
        top: 0;
        left: 0;
      }
    }
  }
} 
  
</style>

<script>


export default {
  name: 'app',
  data() {
    return {
      x: "",
      y: "",
      socket: new WebSocket("ws://localhost:3000"),
      obj: {},
      recieved: []
    }
  },
  mounted() {
    this.socket.addEventListener("open", function() {
      console.log("Connected to WebSocket");
    })
    this.socket.addEventListener("close", function() {
      console.log("Disconnected from WebSocket");
    })
    this.socket.addEventListener("message", (resulted) => {
      console.log('Message from the server: ', resulted);
        
      var answer= resulted.data;
      var answerObj = JSON.parse(answer);
      var nick = document.getElementById('nightmare');
      nick.style.top = answerObj.y - 100 + "px";
      nick.style.left = answerObj.x - 100 + "px";  
    })  
    this.socket.addEventListener("error", function(error) {
      console.log(error);
    })
  },
  methods: {
    scareMe: function(event) {
      this.x = event.clientX;
      this.y = event.clientY;
      this.obj = {
        x: this.x,
        y: this.y
      }
      this.socket.send(JSON.stringify(this.obj));
      
     
    }
  }
}
</script>

