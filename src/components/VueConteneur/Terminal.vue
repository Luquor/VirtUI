<template>
<body>
    <div id="terminal"></div>
</body>

</template>

<script>
    import { Terminal } from '@xterm/xterm';

    export default {
        mounted() {
            var term = new Terminal();
            term.open(document.getElementById('terminal'));
        }
    }

</script>