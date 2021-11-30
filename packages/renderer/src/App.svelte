<script lang="ts">
  import '$lib/style/global.css';
  import { menuService } from '$lib/machines/menu.machine.js';
  import Icon from '$lib/components/Icon.svelte';
  import Recipes from '$lib/pages/Recipes.svelte';
  import Ingredients from '$lib/pages/Ingredients.svelte';
  import Equipment from '$lib/pages/Equipment.svelte';
  import Shopping from '$lib/pages/Shopping.svelte';
  import Loading from '$lib/pages/Loading.svelte';
  import Settings from '$lib/pages/Settings.svelte';

  let expanded = false;
  $: current = $menuService.context.currentMenu;

  function toggleMenu(key) {
    menuService.send({ type: 'CLICK', key });
    // expanded = !expanded;
    // console.log('expanded: ' + expanded);
  }
</script>

<header>
  <div id="brand"><Icon name="knife" />Knifework</div>

  <input type="text" placeholder="Search" />
</header>

<section id="content">
  <aside id="sidebar">
    <div id="sidebar-icons" class={$menuService.matches('expanded') ? 'expanded' : 'collapsed'}>
      <button class="icon-button {current === 'recipes' ? 'current' : ''}" on:click={() => toggleMenu('recipes')}>
        <Icon name="book" /> <span class="button-label">Recipes</span>
      </button>
      <button
        class="icon-button {current === 'ingredients' ? 'current' : ''}"
        on:click={() => toggleMenu('ingredients')}
      >
        <Icon name="measuring" /> <span class="button-label">Ingredients</span>
      </button>
      <!-- <button class="icon-button" on:click={toggleMenu}>
        <Icon name="pantry" /> <span class="button-label">Pantry</span>
      </button> -->
      <button class="icon-button {current === 'equipment' ? 'current' : ''}" on:click={() => toggleMenu('equipment')}>
        <Icon name="pot" /> <span class="button-label">Equipment</span>
      </button>
      <button class="icon-button {current === 'shopping' ? 'current' : ''}" on:click={() => toggleMenu('shopping')}>
        <Icon name="cart" /> <span class="button-label">Shopping List</span>
      </button>
      <button class="icon-button {current === 'settings' ? 'current' : ''}" on:click={() => toggleMenu('settings')}>
        <Icon name="settings" /> <span class="button-label">Settings</span>
      </button>
    </div>
  </aside>
  <main>
    {#if $menuService.context.currentMenu === 'recipes'}
      <Recipes />
    {:else if $menuService.context.currentMenu === 'ingredients'}
      <Ingredients />
    {:else if $menuService.context.currentMenu === 'equipment'}
      <Equipment />
    {:else if $menuService.context.currentMenu === 'shopping'}
      <Shopping />
    {:else if $menuService.context.currentMenu === 'settings'}
      <Settings />
    {:else}
      <Loading />
    {/if}
  </main>
</section>

<style>
</style>
