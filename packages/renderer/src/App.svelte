<script lang="ts">
  import Icon from '$lib/components/Icon.svelte';
  import '$lib/style/global.css';

  let expanded = false;

  function toggleMenu() {
    expanded = !expanded;
    console.log('expanded: ' + expanded);
  }
</script>

<aside id="sidebar">
  <div id="sidebar-icons">
    <button class="icon-button" on:click={toggleMenu}>
      <Icon name="menu" />
    </button>
  </div>
  <div id="sidebar-menu" class={expanded ? 'expanded' : ''}>
    <details class="menu-item">
      <summary> Ingredients </summary>
    </details>
  </div>
</aside>
<main>
  <h2>The Spice</h2>
</main>

<style>
</style>
