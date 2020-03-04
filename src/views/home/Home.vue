<template>
    <div>
        Home
    </div>
</template>

<script>
  import TestApi from "../../network/test_api";
    export default {
        name: "Home",
        created() {
            TestApi.sec().then(res => {
                console.log(res);
            });
            TestApi.noen().then(res => {
                console.log(res);
            })
        }
    }
</script>

<style scoped>

</style>
