<template>
    <div class="wrapper" ref="wrapper">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import BetterScroll from 'better-scroll';
    export default {
        name: "Scroll",
        props : {
            bounce: {
                type: Boolean,
                default() {
                    return true;
                }
            }
        },
        data() {
            return {
                scroll: null,
            }
        },
        mounted() {
            this.scroll = new BetterScroll(this.$refs.wrapper, {
                click: true,
                probeType: 3,
                mouseWheel: true,
                bounce: this.bounce
            });

            this.scroll.on("scroll", (position) => {
                this.$emit("scroll", position);
            });


        },
        methods: {

        },
        computed: {

        }
    }
</script>

<style scoped>

</style>
