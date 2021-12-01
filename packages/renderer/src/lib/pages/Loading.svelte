<script>
  import { fade } from 'svelte/transition';
  import { quintInOut } from 'svelte/easing';
  import { onMount } from 'svelte';
  import { menuService } from '$lib/machines/menu.machine.js';
  import Icon from '$lib/components/Icon.svelte';

  let userSettings;
  $: settings = userSettings;

  window.electron.userSettingsResponse('userSettingsResponse', (event, data) => {
    userSettings = data;
    console.log(userSettings);
  });

  function gotoSettings() {
    menuService.send({ type: 'GO', key: 'settings' });
  }

  onMount(() => {
    userSettings = window.electron.getUserSettings();
    if (userSettings) {
      menuService.send({ type: 'GO', key: userSettings.lastPage });
    }
  });
</script>

<div id="intro" class="center">
  <div id="intro-icon" in:fade>
    <Icon name="knife" />
  </div>
  <h1 id="intro-heading">Knifework</h1>
  <p>Knifework needs to set some things up</p>
  <button class="callout-button" on:click={gotoSettings}>Let's Get Started!</button>
</div>

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
