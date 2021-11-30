<script lang="ts">
  import '$lib/style/global.css';
  import { menuService } from '$lib/machines/menu.machine.js';
  import Icon from '$lib/components/Icon.svelte';
  import Sidebar from '$lib/components/Sidebar.svelte';
  import Recipes from '$lib/pages/Recipes.svelte';
  import Ingredients from '$lib/pages/Ingredients.svelte';
  import Equipment from '$lib/pages/Equipment.svelte';
  import Shopping from '$lib/pages/Shopping.svelte';
  import Loading from '$lib/pages/Loading.svelte';
  import Settings from '$lib/pages/Settings.svelte';

  $: current = $menuService.context.currentMenu;
</script>

<header>
  <div id="brand"><Icon name="knife" />Knifework</div>

  <input type="text" placeholder="Search" />
</header>

<section id="content">
  <Sidebar />

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
