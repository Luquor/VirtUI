<template>
<body>
    <link rel="stylesheet" href="node_modules/@xterm/xterm/css/xterm.css" />
    <div id="terminal"></div>
</body>

</template>

<script>
    import { Terminal } from '@xterm/xterm';
    import WConsole from "../../api/WConsole.js";
    import {watch} from "vue";
    import {useRoute} from "vue-router";

    // TO DO : WATCH BUG FIX DOUBLE SOCKET
    export default {
        mounted() {

          const term = new Terminal({
            cursorBlink: true, // Optionally, if you want cursor blinking
            cursorStyle: 'underline' // Optionally, customize cursor style
          });

          const textEncoder = new TextEncoder();


          const route = useRoute()

          term.open(document.getElementById('terminal'));


          watch(() => route.params.name, (newName, oldName) => {

            const wConsole = new WConsole(newName)
            wConsole.close(oldName)
            wConsole.defineTerminal(term)

            term.onData(data => {
              wConsole.getWebSocket()?.send(textEncoder.encode(data));
            });
          })







        }
    }

</script>