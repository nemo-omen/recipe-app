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
  <div id="sidebar-icons" class={expanded ? 'expanded' : ''}>
    <button class="icon-button" on:click={toggleMenu}>
      <Icon name="book" /> <span class="button-label">Recipes</span>
    </button>
    <button class="icon-button" on:click={toggleMenu}>
      <Icon name="measuring" /> <span class="button-label">Ingredients</span>
    </button>
    <!-- <button class="icon-button" on:click={toggleMenu}>
      <Icon name="pantry" /> <span class="button-label">Pantry</span>
    </button> -->
    <button class="icon-button" on:click={toggleMenu}>
      <Icon name="pot" /> <span class="button-label">Equipment</span>
    </button>
    <button class="icon-button" on:click={toggleMenu}>
      <Icon name="cart" /> <span class="button-label">Shopping List</span>
    </button>
  </div>
</aside>
<main>
  <h2>The Spice</h2>
</main>

<style>
</style>
