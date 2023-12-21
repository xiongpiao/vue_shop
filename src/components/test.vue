<template>
    <div>
        <button @click="user">
           111
        </button>
    </div>
</template>

<script>
import axios from 'axios';
import qs from 'qs';
import requests from '../api/ajax'
import { reqUsernames } from '../api/index'
export default {
    // mounted() {
    //     this.getUsernames();
    // },
    data() {
        return {
            Usernames: [{
                a: 1,
                b: 1
            }]
        }
    },
    methods: {
        // async getUsernames() {
        //     let res = await reqUsernames();
        //     this.Usernames = res;
        // },
        user() {
            console.log(this.Usernames[0].a)
            console.log(this.Usernames.a)
        }
    },
}
</script>

<style lang="less" scoped>



</style>