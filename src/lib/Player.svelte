<script lang="ts">
  import { createAvatar } from "@dicebear/core";
  import { adventurer } from "@dicebear/collection";
  import Counter from "./Counter.svelte";
  import type { Player } from "./players";
  import { playerStore } from "./players";
  import { onMount } from "svelte";

  export let player: Player;

  function newAvatar() {
    player.avatarSvg = createAvatar(adventurer, {
      seed: player.name + Date.now(),
      size: 128,
    }).toString();
  }

  onMount(() => {
    if (!player.avatarSvg) newAvatar();
  });
</script>

<div
  class="flex flex-col items-center gap-3 border rounded p-4 font-bold bg-range"
  data-value={player.count}
>
  <button class="text cursor-pointer" on:click={newAvatar}>
    {@html player.avatarSvg}
  </button>
  <h1 class="text-center text-2xl player-title">{player.name}</h1>
  <Counter bind:count={player.count} />
  <button
    class="text"
    on:click={() => ($playerStore = $playerStore.filter((x) => x != player))}
    >remove</button
  >
</div>
