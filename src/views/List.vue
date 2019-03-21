<template>
    <div>
        <section class="about" id="element1">
            <h1>This is an about page1</h1>
        </section>
        <section class="about" id="element2">
            <h1>This is an about page2</h1>
        </section>
        <section class="about" id="element3">
            <h1>This is an about page3</h1>
        </section>
        <section class="about" id="element4">
            <h1>This is an about page4</h1>
        </section>
        <section class="about" id="element5">
            <h1>This is an about page5</h1>
        </section>

        <article class="fixed">
            <ul>
                <li><a href="#" v-scroll-to="{el: '#element1'}">to #element1</a></li>
                <li><a href="#" v-scroll-to="{el: '#element2'}">to #element2</a></li>
                <li><a href="#" v-scroll-to="{el: '#element3'}">to #element3</a></li>
                <li><a href="#" v-scroll-to="{el: '#element4'}">to #element4</a></li>
                <li><a href="#" v-scroll-to="{el: '#element5'}">to #element5</a></li>
            </ul>
        </article>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    @Component
    export default class List extends Vue {
        constructor() {
            super();
        }

    }
</script>

<style>
    #app {
        height:10000px;
        background: linear-gradient(#E4A972, #9941D8);
    }
</style>
<style scoped>


    .fixed {
        position: fixed;
        top: 30em;
        right: 1em;
        width: 200px;
        background-color: white;
    }

    .about {
        height: 500px;
    }
    .about:nth-child(even) {
        background-color: blue;
    }
    .about:nth-child(odd) {
        background-color: greenyellow;
    }
</style>
