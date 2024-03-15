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
                let indexCurseur = 0;


                switch (data)
                {
                    case '\t':
                        console.log('Tab');
                        term.write('\t');
                        for (let i = 0; i < 2; i++)
                        {
                            command.push(' ');
                            indexCurseur++;
                        }
                        break;
                    case '\r':
                        console.log('Enter');
                        break;
                    case '\b' :
                    case '\x7f':
                        console.log('Backspace');
                        term.write('\b \b');
                        if(command.length > 0 && indexCurseur < command.length){
                            command.splice(indexCurseur, 1);
                        } else if (indexCurseur == command.length) {
                            command.pop();
                        }
                        term.write(command);
                        break;
                    case '\u001b[D':
                        console.log('Left');
                        term.write('\u001b[D');
                        if(indexCurseur > -1){
                            indexCurseur--;
                        }
                        break;
                    case '\u001b[C':
                        console.log('Right');
                        term.write('\u001b[C');
                        if(indexCurseur < command.length){
                            indexCurseur++;
                        }
                        break;
                    case '\u001b[A':
                    case '\u001b[B':
                        break;
                    default:
                        indexCurseur++;
                        term.write(data);
                        command.push(data);
                    }
                    
                    
                console.log("Index Curseur :" + indexCurseur);
                console.log(command);
            });



        }
    }

</script>