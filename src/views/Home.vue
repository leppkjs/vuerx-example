<template>
    <div class="home">
        <img alt="Vue logo" src="http://www.google.com/intl/en_ALL/images/srpr/logo1w1.png"
             @error="() => '../assets/logo.png'">
        <input v-focus>
        <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
    </div>
</template>

<script lang="ts">
    // @ is an alias to /src
    import HelloWorld from '@/components/HelloWorld.vue';
    import {Component, Vue} from 'vue-property-decorator';

    @Component({
        components: {
            HelloWorld,
        },
    })
    export default class Home extends Vue {
        constructor() {
            super();
        }
    }
</script>
