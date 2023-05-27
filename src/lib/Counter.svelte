<script lang="ts">
  export let count: number = 1;
  const increment = () => {
    if (count < 10) count += 1;
  };
  const decrement = () => {
    if (count > 1) count -= 1;
  };
</script>

<div class="flex gap-4 items-center">
  <button on:click={decrement}> - </button>
  <p class="w-3 text-center">{count}</p>
  <button on:click={increment}> + </button>
</div>
