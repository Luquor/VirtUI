<template>
<body>
    <link rel="stylesheet" href="node_modules/@xterm/xterm/css/xterm.css" />
    <div id="terminal"></div>
</body>

</template>

<script>
    import { Terminal } from '@xterm/xterm';
    import ansiEscapes from 'ansi-escapes';

    export default {
        mounted() {
            const term = new Terminal({
                cursorBlink: true, // Optionally, if you want cursor blinking
                cursorStyle: 'underline' // Optionally, customize cursor style
            });
            
            let command = [];
            let indexCurseur = 0;

            term.open(document.getElementById('terminal'));
            term.onData(data => {
                console.log('Data received:', data);
                // Handle the data, e.g., send it to a server or process it
                
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
                        term.write('\r\n');
                        //SEND
                        break;
                    case '\b' :
                    case '\x7f':
                        console.log('Backspace');
                        if(command.length > 0 && indexCurseur < command.length){
                            command.splice(indexCurseur, 1);
                            term.reset();
                            for (let i = 0; i < command.length; i++)
                            {
                                term.write(command[i]);
                            }
                        } else if (indexCurseur == command.length) {
                            command.pop();
                            term.write('\b \b');
                        }
                        if(indexCurseur > 0){
                            indexCurseur--;
                        }
                        break;
                    case '\u001b[D':
                        term.write('\u001b[D');
                        if(indexCurseur > 0){
                            indexCurseur--;
                        }
                        break;
                    case '\u001b[C':
                        if(indexCurseur < command.length){
                            indexCurseur++;
                            term.write('\u001b[C');
                        }
                        break;
                    case '\u001b[A':
                    case '\u001b[B':
                        break;
                    default:
                        term.write(data);
                        command.push(data);
                        indexCurseur++;
                        break;
                    }
                console.log("Command size: " + command.length);
                console.log("Index Curseur :" + indexCurseur);
                console.log(command);
            });



        }
    }

</script>