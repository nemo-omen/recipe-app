<script>
  import { menuService } from '$lib/machines/menu.machine.js';
  import Icon from '$lib/components/Icon.svelte';

  $: current = $menuService.context.currentMenu;

  function toggleMenu(key) {
    menuService.send({ type: 'CLICK', key });
  }

  function initRecipeModal() {}
</script>

<aside id="sidebar" class={$menuService.matches('expanded') ? 'expanded' : 'collapsed'}>
  <button
    class="icon-button sub-header {current === 'postrecipe' ? 'current' : ''}"
    on:click={() => toggleMenu('postrecipe')}
  >
    <Icon name="add" /> <span class="button-label">New Recipe</span>
  </button>

  <button class="icon-button {current === 'recipes' ? 'current' : ''}" on:click={() => toggleMenu('recipes')}>
    <Icon name="book" /> <span class="button-label">Recipes</span>
  </button>
  <!-- <button class="icon-button {current === 'ingredients' ? 'current' : ''}" on:click={() => toggleMenu('ingredients')}>
    <Icon name="measuring" /> <span class="button-label">Ingredients</span>
  </button>
  <button class="icon-button {current === 'equipment' ? 'current' : ''}" on:click={() => toggleMenu('equipment')}>
    <Icon name="pot" /> <span class="button-label">Equipment</span>
  </button> -->
  <button class="icon-button {current === 'shopping' ? 'current' : ''}" on:click={() => toggleMenu('shopping')}>
    <Icon name="cart" /> <span class="button-label">Shopping List</span>
  </button>
  <button class="icon-button {current === 'settings' ? 'current' : ''}" on:click={() => toggleMenu('settings')}>
    <Icon name="settings" /> <span class="button-label">Settings</span>
  </button>
</aside>
