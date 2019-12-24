<template>
  <div class="row">
    <div class="col-md-5 offset-md-1">
      <h2>Third-Party Licenses</h2>
      <p>
        You can check the license of the third-party libraries used on this site by the following link.
      </p>
      <a href="/app/licenses.txt" target="_blank">licenses.txt</a>
    </div>
  </div>
</template>

<script>
export default {
  head () {
    return {
      title: `Third-Party Licenses - ${this.$app.name}`
    }
  }
}
</script>
