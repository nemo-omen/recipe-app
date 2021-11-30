<script>
  import PathsByName from './icon-paths.js';
  export let name;
  $: paths = PathsByName[name] || [];
</script>

<svg class="c" viewBox="0 0 24 24" fill-rule="evenodd" clip-rule="evenodd">
  {#each paths as path}
    <path d={path} />
  {/each}
</svg>

<style>
  .c {
    width: 1em;
    height: 1em;
    fill: currentColor;
    /* transition: all 0.3s ease-out; */
    overflow: visible;
  }
</style>
