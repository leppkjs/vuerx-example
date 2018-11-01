<template>
    <div>
        <p>사용자 검색</p>
        <div class="autocomplete">
            <input id="search" type="text" placeholder="검색하고 싶은 사용자 아이디를 입력해주세요.">
            <ul id="suggestLayer">
                <li class="user" v-for="user in users">
                    <img v-bind:src="{{user.avatar_url}}" width="54px" height="50px" />
                    <p><a v-bind:href="{{user.html_url}}" target="_blank">{{user.login}}</a></p>
                </li>
            </ul>
            <div id="loading">
                <i class="fas fa-spinner fa-pulse"></i>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {fromEvent, Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, finalize, map, partition, pluck, retry, switchMap, tap} from 'rxjs/operators';
import {ajax} from 'rxjs/ajax';

@Component
export default class AutoComplete extends Vue {
    private $layer = document.getElementById('suggestLayer');

    private $loading = document.getElementById('loading');

    private keyup$: Observable<any> = null;

    public users: Array<object> = [];

    constructor() {
        super();
    }

    private created() {
        console.info('created...');
    }

    private mounted() {
        console.info('mounted...');
        this.$layer = document.getElementById('suggestLayer');

        this.$loading = document.getElementById('loading');

        this.keyup$ = fromEvent(document.getElementById('search'), 'keyup')
            .pipe(
                debounceTime(300),
                map((event: any): string => event.target.value as string),
                distinctUntilChanged(),
            );


        let [user$, reset$]: Observable<any> = partition((query: any) => query.trim().length > 0)(this.keyup$);

        user$ = user$
            .pipe(
                tap(this.showLoading),
                switchMap((query: any) => ajax.getJSON(`https://api.github.com/search/users?q=${query}`)),
                pluck('items'),
                tap(this.hideLoading),
                tap((v: Array<object>)=> console.log('user$...')),
                retry(2),
                finalize(this.hideLoading)
            );

        user$.subscribe(
            (v: any) => this.users = v,
            (e: any) => {
                console.error(e);
                alert(e);
            }
        );

        reset$.pipe(
            tap((v: any) => console.log('reset$')),
            tap((v: any) => this.$layer.innerHTML = '')
        ).subscribe();

    }

    private showLoading() {
        this.$loading.style.display = 'block';
    }

    private hideLoading() {
        this.$loading.style.display = 'none';
    }


}
</script>

<style scoped>
    .autocomplete {
        position: relative;
        width: 300px;
    }

    #search {
        width: 100%;
    }

    #suggestLayer {
        position: absolute;
        top: 20px;
        color: #666;
        padding: 0px;
        margin: 0px;
        width: 100%;
    }

    #suggestLayer li {
        border: 1px solid #bec8d8;
        list-style: none;
    }

    .user img {
        pisition: relative;
        float: left;
        margin-right: 10px;
    }

    .user p {
        line-height: 50px;
        margin: 0px;
        padding: 0px;
    }

    #loading {
        position: absolute;
        z-index: 2;
        top: 2px;
        right: 0px;
        display: none;
    }
</style>