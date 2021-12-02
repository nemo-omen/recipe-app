<script>
  import Icon from '$lib/components/Icon.svelte';
  import { onMount } from 'svelte';

  let storageSettings;

  let sqlUser = '';
  let sqlPassword = '';

  $: mode = 'easy';
  $: notAdvanced = mode !== 'advanced';

  function select(selectedMode) {
    mode = selectedMode;
    window.electron.setUserSettings('dbMode', selectedMode);
  }

  let dbModeSetting;

  window.electron.dbModeResponse('dbModeResponse', (response, data) => {
    if (data.dbMode) {
      mode = data.dbMode;
    } else {
      mode = '';
    }
  });

  onMount(() => {
    window.electron.getDBMode();
  });
</script>

<section class="page">
  <div id="content-header" class="sub-header content-sub">
    <div class="page-heading">
      <Icon name="settings" />
      <h2>Settings</h2>
    </div>
  </div>

  <div class="center">
    <div class="block-select {mode === 'easy' ? 'selected' : 'deselected'}" on:click={() => select('easy')}>
      <h2>Easy</h2>
      <p>Uses lightweight data storage backed by SQLite.</p>
      <p>No setup required!</p>
    </div>
    <div class="block-select {mode === 'advanced' ? 'selected' : 'deselected'}" on:click={() => select('advanced')}>
      <h2>Advanced</h2>
      <p>Uses your local MySQL server</p>
      <label for="user">User</label>
      <input disabled={notAdvanced} type="text" name="user" id="user" bind:value={sqlUser} />
      <label for="password">Password</label>
      <input disabled={notAdvanced} type="text" name="password" id="password" bind:value={sqlPassword} />
      <button disabled={notAdvanced}>Save</button>
    </div>
  </div>
</section>

<style>
  p {
    text-align: center;
    line-height: 1.5;
    margin: 0;
  }

  button {
    background: transparent;
    border: 2px solid var(--accent-secondary-mid);
    color: var(--accent-secondary-mid);
    padding: 0.5rem 1rem;
    font-size: 1.5rem;
    border-radius: 1rem;
    transition: all 0.3s ease-out;
  }

  button:hover {
    border-color: var(--accent-secondary);
    color: var(--accent-secondary);
  }
  .center {
    gap: 3rem;
    margin-bottom: 10rem;
  }
  .block-select {
    width: 40ch;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 3rem;
    border-radius: 5rem;
    cursor: pointer;
    gap: 1.5rem;
  }

  .selected {
    border: 2px solid var(--accent-secondary);
    color: var(--accent-secondary);
  }

  .deselected {
    border: 2px solid var(--accent-secondary-mid);
    color: var(--accent-secondary-mid);
  }
</style>
