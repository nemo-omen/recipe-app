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

  function gotoSettings() {
    menuService.send({ type: 'GO', key: 'settings' });
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
      <div class="card">
        <h3>Recipes</h3>
      </div>
      <div class="card card-flat">
        <h3>New Recipe</h3>
      </div>
      <div class="card">
        <h3>Shopping</h3>
      </div>
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
    background: vae(--accent-secondary-dark);
  }

  .card {
    /* border: 1px solid var(--accent-secondary-mid); */
    /* background: var(--dark-hover); */
    color: var(--accent-secondary-mid);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    padding: 1rem;
    border-radius: 1rem;
    transition: color 0.3s ease-out;
  }
  .card:hover {
    border-color: var(--accent-secondary);
    color: var(--accent-secondary);
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
