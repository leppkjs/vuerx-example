<template>
    <div class="home">
        <button type="button" @click="callSubject">subject call</button>
        <button type="button" @click="registerSubject">register new subject</button>
        <button type="button" @click="subObservable">subObservable</button>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {Observable, of, Subject} from 'rxjs';

@Component
export default class SubjectExample extends Vue {
    private subject: Subject<number> = new Subject<number>();

    private seqNum: Observable<number>;

    private count: number = 0;

    constructor() {
        super();
    }

    private created() {
        console.info('created...');
    }

    private mounted() {
        console.info('mounted...');

        this.subject.subscribe((v: number) => {
            console.log(`subject A : ${v}`);
        });

        this.seqNum = of(1, 2, 3, 4);
    }

    private registerSubject() {
        this.subject.subscribe((v: number) => {
            console.log(`subject B : ${v}`);
        });
    }

    private callSubject() {
        this.subject.next(++this.count);
    }

    private subObservable() {
        this.seqNum.subscribe((v: number) => {
            console.log('Observable ::', v);
            console.log('eventbus :: Observable to Subject');
            this.subject.next(v);
        });
    }

}
</script>
