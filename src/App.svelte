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

<main>
  <div class="flex gap-3 p-3">
    <p class="px-4 py-2">SpielerIn hinzufügen:</p>
    <input
      placeholder="SpielerInname"
      type="text"
      bind:value={newPlayer.name}
    />
    <button on:click={addPlayer}>Add</button>
  </div>

  <div class="grid grid-cols-4 gap-4 px-4">
    {#each $playerStore as player, idx}
      <div class="flex flex-col items-center gap-3 border p-4">
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

  <footer>
    <a href="https://www.flaticon.com/free-icons/sword" title="sword icons"
      >App Icon created by dDara - Flaticon</a
    >
  </footer>
</main>
