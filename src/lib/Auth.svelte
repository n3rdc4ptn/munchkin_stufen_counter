<script lang="ts">
  import { currentUser, login, passage, register } from "../passage";

  let email = "";

  async function submit() {
    // Check if user already exists
    const userInfo = await passage.identifierExists(email);
    if (userInfo) {
      await login(email);
    } else {
      await register(email);
    }
  }

  async function logout() {
    passage.getCurrentSession().signOut();
    $currentUser = null;
  }
</script>

{#if $currentUser == "loading"}
  <div>Loading</div>
{:else if $currentUser == null}
  <form on:submit|preventDefault={submit} class="flex gap-2">
    <input type="email" placeholder="email" bind:value={email} />
    <button>Check</button>
  </form>
{:else}
  <div class="flex items-center gap-4">
    <p>Logged in as {$currentUser.email}</p>
    <button on:click={logout} class="text">Logout</button>
  </div>
{/if}
