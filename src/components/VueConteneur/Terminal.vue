<template>
<body>
    <link rel="stylesheet" href="node_modules/@xterm/xterm/css/xterm.css" />
    <div id="terminal"></div>
</body>

</template>

<script>
    import { Terminal } from '@xterm/xterm';

    export default {
        mounted() {
            const term = new Terminal({
                cursorBlink: true, // Optionally, if you want cursor blinking
                cursorStyle: 'underline' // Optionally, customize cursor style
            });
            
            let command = [];

            term.open(document.getElementById('terminal'));
            term.onData(data => {
                console.log('Data received:', data);
                // Handle the data, e.g., send it to a server or process it

                if(data === '\r') {
                    term.write('\r\n');
                    return;
                }

                command += data;
                if (data.charCodeAt(0) === 127) {
                    term.write('\b \b');
                    
                    return;
                }

                console.log(command);
                term.write(data);
            });



        }
    }

</script>