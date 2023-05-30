<script lang="ts">
  import Peer from "./lib/Peer.svelte";
  import Player from "./lib/Player.svelte";
  import { playerStore, type Player as PlayerType } from "./lib/players";

  let newPlayer: PlayerType = {
    name: "",
    count: 1,
    avatarSvg: null,
  };

  const addPlayer = () => {
    if (newPlayer.name === "") return;
    $playerStore = [...$playerStore, { ...newPlayer }];
    newPlayer.name = "";
  };
</script>

<main class="p-2">
  <div class="my-3">
    <Peer />
  </div>
  <div class="flex gap-1 mb-4 items-center">
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
      <Player bind:player />
    {/each}
  </div>

  <footer class="fixed bottom-1">
    <a href="https://www.flaticon.com/free-icons/sword" title="sword icons"
      >App Icon created by dDara - Flaticon</a
    >
  </footer>
</main>
