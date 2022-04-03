<template>
    <div class="home">
        <h1>{{ msg }}</h1>
        <p>Welcome to your new single-page application, built with <a href="https://vuejs.org" target="_blank">Vue.js</a>.</p>
        My Web Component:
        <auto-complete-wc :options="options" @onTextChanged="onTextChangedHandler" @onFocusOut="onFocusOutHandler"></auto-complete-wc>
    </div>
</template>

<script>
import axios from "axios";

    export default {
        name: 'Home',
        props: {
            msg: String
        },

        data() {
            return {
                options: '[]'
            }
        },

        methods: {
            onTextChangedHandler(event) {
                if (event.detail) {
                    axios
                        .get("https://localhost:7220/Cities/Lookup?searchTerm=" + event.detail)
                        .then(response => this.updateOptions(response.data))
                }
            },

            onFocusOutHandler(event) {
                console.log(event.detail);
            },

            updateOptions(options) {
                this.options = JSON.stringify(options);
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

