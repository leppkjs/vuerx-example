<template>
    <div id="carousel" class="view">
        <ul class="container">
            <li class="panel" style="background-color: lightgreen"></li>
            <li class="panel" style="background-color: royalblue"></li>
            <li class="panel" style="background-color: lightpink"></li>
            <li class="panel" style="background-color: darkred"></li>
        </ul>
    </div>
</template>

<script lang="ts">
    import {fromEvent, merge, Observable} from 'rxjs';
    import {first, map, share, startWith, switchMap, takeUntil, withLatestFrom} from 'rxjs/operators';
    import {Component, Vue} from 'vue-property-decorator';

    @Component
    export default class Carousel extends Vue {
        private $view: HTMLElement = null;

        private $container: HTMLElement = null;

        private PANEL_COUNT: number = 0;

        private SUPPORT_TOUCH: any = null;

        private EVENTS: { start: string, move: string, end: string } = null;

        private mounted() {
            this.$view = document.getElementById('carousel');
            this.$container = document.querySelector('.container');
            this.PANEL_COUNT = this.$container.querySelectorAll('.panel').length;
            this.SUPPORT_TOUCH = 'ontouchstart' in window;

            this.EVENTS = {
                start: this.SUPPORT_TOUCH ? 'touchstart' : 'mousedown',
                move: this.SUPPORT_TOUCH ? 'touchmove' : 'mousemove',
                end: this.SUPPORT_TOUCH ? 'touchend' : 'mouseup',
            };

            const start$ = fromEvent(this.$view, this.EVENTS.start).pipe(this.toPos);
            const move$ = fromEvent(this.$view, this.EVENTS.move).pipe(this.toPos);
            const end$ = fromEvent(this.$view, this.EVENTS.end).pipe(this.toPos);

            const size$ = fromEvent(window, 'resize').pipe(
                startWith(0),
                map((dumy: number | Event) => this.$view.clientWidth),
            );

            // size$.subscribe((width: number) => console.log('view의 넓이', width));

            const drag$ = start$.pipe(
                switchMap((start: number) => {
                    return move$.pipe(
                        map((move: number) => move - start),
                        takeUntil(end$),
                    );
                }),
                share(),
            );

            // drag$.subscribe((distance: number) => console.log('start$의 move$의 차이값', distance));

            const drop$ = drag$.pipe(
                switchMap((drag) => {
                    return end$.pipe(
                        map((event) => drag),
                        first(),
                    );
                }),
                withLatestFrom(size$),
            );

            const carousel$ = merge(drag$, drop$);

            carousel$.subscribe((v: number | number[]) => console.log('캐러셀 데이터', v));
        }

        private toPos(obs$: Observable<any>) {
            return obs$.pipe(
                map((v: any) => this.SUPPORT_TOUCH ? v.changedTouches[0].pageX : v.pageX),
            );
        }

    }
</script>

<style scoped>
    .view {
        overflow: hidden;
    }

    .view .container {
        white-space: nowrap;
        padding: 0px;
        list-style: none;
        font-size: 0;
    }

    .view .panel {
        width: 100%;
        min-height: 200px;
        display: inline-block;
    }
</style>