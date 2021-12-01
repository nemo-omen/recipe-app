<script>
  import '$lib/style/global.css';
  import { menuService } from '$lib/machines/menu.machine.js';
  import { onMount } from 'svelte';
  import Icon from '$lib/components/Icon.svelte';
  import Sidebar from '$lib/components/Sidebar.svelte';
  import Recipes from '$lib/pages/Recipes.svelte';
  import Ingredients from '$lib/pages/Ingredients.svelte';
  import Equipment from '$lib/pages/Equipment.svelte';
  import Shopping from '$lib/pages/Shopping.svelte';
  import Loading from '$lib/pages/Loading.svelte';
  import Settings from '$lib/pages/Settings.svelte';
  import PostRecipe from '$lib/pages/PostRecipe.svelte';

  $: current = $menuService.context.currentMenu;

  function sendToMain() {
    // window.electron.getData({ id: 456 });
  }

  // window.electron.fromMain('something', (event, data) => {
  //   console.log('From server: ' + data);
  // });

  // window.electron.dataResponse('response', (event, data) => {
  //   console.log(data);
  // });

  let userSettings;

  window.electron.userSettingsResponse('userSettingsResponse', (event, data) => {
    userSettings = data;
    console.log(userSettings);
  });

  onMount(() => {
    userSettings = window.electron.getUserSettings();
  });
</script>

<header>
  <div id="brand" on:click={sendToMain}><Icon name="knife" />Knifework</div>

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
    {:else if $menuService.context.currentMenu === 'postrecipe'}
      <PostRecipe />
    {:else}
      <Loading />
    {/if}
  </main>
</section>

<style>
</style>
