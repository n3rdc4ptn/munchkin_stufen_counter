<script lang="ts">
  import { onMount } from "svelte";
  import { Peer } from "peerjs";
  import { initNewPeer } from "../peer";
  import { writable } from "svelte/store";
  import { playerStore } from "./players";

  const currentPeer = writable<Peer | null>(null);

  onMount(async () => {
    const peer = await initNewPeer();

    $currentPeer = peer;
  });

  function copyPeerId() {
    navigator.clipboard.writeText($currentPeer.id);
  }

  let connectToPeerID: string = "";
  let successFullConnection = false;

  function connect() {
    if (connectToPeerID === "") return;
    const conn = $currentPeer?.connect(connectToPeerID);
    if (!conn) return;
    conn.on("open", () => {
      console.log("connected");
      successFullConnection = true;
    });

    conn.on("data", (data: any) => {
      console.log("received", data);
      playerStore.set(data);
    });
  }
</script>

{#if successFullConnection}
  <span class="text-green-500"
    >Connected to {connectToPeerID}. Only reading</span
  >
{:else}
  <div class="grid grid-cols-2">
    <div class="flex items-center gap-2">
      Peer ID: <span class="font-mono bg-gray-100 p-1"
        >{$currentPeer ? $currentPeer.id : ""}</span
      >
      <button type="button" on:click={copyPeerId} class="text">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
          />
        </svg>
      </button>
    </div>
    <div class="flex items-center gap-2">
      Join:
      <form
        on:submit|preventDefault={connect}
        class="flex items-center gap-2 flex-1"
      >
        <input
          class="font-mono flex-1"
          placeholder="Put in the peer ID"
          type="text"
          bind:value={connectToPeerID}
        />
        <button>Connect</button>
      </form>
    </div>
  </div>
{/if}
