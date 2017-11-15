<template>
    <div>
        <span class="count" v-text="count"></span>
        <button @click="count++" class="increment"></button>
        <button @click="count--" class="decrement" v-show="count > 0"></button>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                count: 0
            }
        }
    }
</script>
