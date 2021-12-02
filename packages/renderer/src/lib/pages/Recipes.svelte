<script>
  import Icon from '$lib/components/Icon.svelte';

  let layout = 'grid';

  function setLayout(layoutKey) {
    layout = layoutKey;
  }
</script>

<section class="page">
  <div id="content-header" class="content-sub">
    <div class="page-heading">
      <Icon name="book" />
      <h2>Recipes</h2>
    </div>
    <div class="page-layout-control">
      <button class="icon-control-button" on:click={() => setLayout('list')}>
        <Icon name="list" />
      </button>
      <button class="icon-control-button" on:click={() => setLayout('grid')}>
        <Icon name="grid" />
      </button>
    </div>
  </div>

  <div class="page-content">
    {#if layout === 'grid'}
      <h2>Grid</h2>
    {:else if layout === 'list'}
      <h2>List</h2>
    {/if}
  </div>
</section>
