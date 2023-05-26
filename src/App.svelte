<script lang="ts">
  import Counter from "./lib/Counter.svelte";
  import { playerStore, type Player } from "./lib/players";

  let newPlayer: Player = {
    name: "",
    count: 0,
  };

  const addPlayer = () => {
    if (newPlayer.name === "") return;
    $playerStore = [...$playerStore, { ...newPlayer }];
    newPlayer.name = "";
  };
</script>

<main class="p-2">
  <div class="flex gap-1 mb-4">
    <p class="px-2">SpielerIn hinzufügen:</p>

    <form class="flex gap-1" on:submit|preventDefault={addPlayer}>
      <input
        placeholder="SpielerInname"
        type="text"
        bind:value={newPlayer.name}
      />
      <button>Add</button>
    </form>
  </div>

  <div class="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-2">
    {#each $playerStore as player, idx}
      <div class="flex flex-col items-center gap-3 border rounded p-4">
        <h1 class="text-center">{player.name}</h1>
        <Counter bind:count={player.count} />
        <button
          class="text"
          on:click={() =>
            ($playerStore = $playerStore.filter((x) => x != player))}
          >remove</button
        >
      </div>
    {/each}
  </div>

  <footer class="fixed bottom-1">
    <a href="https://www.flaticon.com/free-icons/sword" title="sword icons"
      >App Icon created by dDara - Flaticon</a
    >
  </footer>
</main>
