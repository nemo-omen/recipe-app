<script>
  import { fade } from 'svelte/transition';
  import { quintInOut } from 'svelte/easing';
  import { onMount } from 'svelte';
  import { menuService } from '$lib/machines/menu.machine.js';
  import Icon from '$lib/components/Icon.svelte';

  let userSettings;
  $: loaded = false;
  $: settings = userSettings;

  window.electron.userSettingsResponse('userSettingsResponse', (event, data) => {
    userSettings = data;
    console.log('userSettings', userSettings);
  });

  function gotoPage(page) {
    menuService.send({ type: 'GO', key: page });
  }

  onMount(() => {
    userSettings = window.electron.getUserSettings();
    if (userSettings) {
      menuService.send({ type: 'GO', key: userSettings.lastPage });
    }
    setTimeout(() => {
      loaded = true;
    }, 200);
  });
</script>

{#if loaded}
  <div id="intro" class="center" in:fade>
    <div id="intro-icon" in:fade>
      <Icon name="knife" />
    </div>
    <h1 id="intro-heading">Knifework</h1>
    <div class="three-up">
      <button class="card card-welcome" on:click={() => gotoPage('recipes')}>
        <Icon name="book" />
        <h3>Recipes</h3>
      </button>
      <button class="card card-welcome" on:click={() => gotoPage('postrecipe')}>
        <Icon name="add" />
        <h3>New Recipe</h3>
      </button>
      <button class="card card-welcome" on:click={() => gotoPage('shopping')}>
        <Icon name="cart" />
        <h3>Shopping</h3>
      </button>
    </div>
  </div>
{/if}

<style>
  #intro {
    gap: 1rem;
    color: var(--accent);
  }

  #intro-icon {
    font-size: 10vw;
  }

  #intro-heading {
    font-size: 3rem;
    font-weight: 400;
  }

  .three-up {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 2rem;
    margin-top: 3rem;
  }

  .card {
    border: none;
    background: var(--dark-mid);
    color: var(--light-mid);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    padding: 2rem;
    border-radius: 1rem;
    transition: all 0.3s ease-out;
  }
  .card:hover {
    color: var(--light);
    background: var(--dark-light);
  }

  .card-welcome {
    font-size: 3rem;
  }

  .card-welcome h3 {
    font-size: 1.5rem;
  }

  .card-flat {
    background: var(--dark);
    box-shadow: none;
  }

  p,
  button {
    font-size: 1.5rem;
  }

  button {
    border: 2px solid var(--accent-secondary);
    color: var(--accent-secondary);
    background: transparent;
    padding: 0.5rem 1rem;
    /* border: none; */
    border-radius: 5rem;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.2s ease-out;
  }
  button:hover {
    transform: scale(1.05);
  }
</style>
