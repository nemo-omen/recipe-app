<script lang="ts">
  import './lib/style/global.css';

  let expanded = false;

  function toggleMenu() {
    expanded = !expanded;
    console.log('expanded: ' + expanded);
  }
</script>

<aside id="sidebar">
  <div id="sidebar-icons">
    <button class="icon-button" on:click={toggleMenu}>—<br />—<br />—</button>
  </div>
  <div id="sidebar-menu" class={expanded ? 'expanded' : ''}>
    <details class="menu-item">
      <summary> Ingredients </summary>
    </details>
  </div>
</aside>
<main>
  <h2>Main</h2>
</main>

<style>
</style>
