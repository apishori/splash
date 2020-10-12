<template lang="html">
    <div :class='{"tabs__light": mode === "light", "tabs__dark": mode === "dark"}'>
        <ul class='tabs__header'>
            <li v-for='(tab, index) in tabs'
                :key='tab.title'
                @click='selectTab(index)'
                :class='{"tabs__selected": (index == selectedIndex)}'>
                {{ tab.title }}
            </li>
        </ul>
        <slot></slot>
    </div>
    
</template>

<script>
    export default {
        props:{
          mode :{
              type: String,
              default: 'light'
          }
        },
        data () {
            return {
                selectedIndex: 0, //index of the selected tab
                tabs: [],         //all of the tabs
            }
        },
        created() {
            this.tabs = this.$children
        },
        mounted() {
            this.selectTab(0)
        },
        methods:{
            selectTab(i) {
                this.selectedIndex = i;

                //loop over all the tabs
                this.tabs.forEach((tab, index) =>{
                    tab.isActive = (index == i)
                })
            }
        }

    }
</script>

<style lang="css">
    ul.tabs__header {
        display: block;
        list-style: none;
        margin: 0 0 0 20px;
        padding: 0;
        border-radius: 30px;
    }

    ul.tabs__header > li {
        padding: 15px 30px;
        border-radius: 0;
        margin: 0 20px;
        display: inline-block;
        cursor: pointer;
    }

    ul.tabs__header > li.tab__selected {
        font-weight: bold;
        border-radius: 10px 10px 0 0;
        border-bottom: 8px solid transparent;
    }

    .tab {
        display: inline-block;
        color: #def3f6;
        padding: 20px;
        min-width: 85vw;
        min-height: 1000px;
        border-color: #def3f6;
        border-style: solid;
        font-family: Avenir;
    }

    .tabs__light .tab{
        background-color: #064273;

    }

    .tabs__light li {
        background-color: #def3f6;
        font-family: Avenir, sans-serif;
        color: black;
    }

    .tabs__light li.tab__selected {
        background-color: #fff;
        color: #83FFB3;
    }

    .tabs__dark .tab{
        background-color: #555;
        color: #eee;
    }

    .tabs__dark li {
        background-color: #ddd;
        color: #aaa;
    }

    .tabs__dark li.tab__selected {
        background-color: #555;
        color: white;
    }

</style>