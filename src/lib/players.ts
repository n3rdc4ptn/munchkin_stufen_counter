import { writable, type Writable } from "svelte/store";

export type Player = {
  name: string;
  count: number;
  avatarSvg: string | null;
};

let playersLocalStorage = JSON.parse(localStorage.getItem("players"));

let initPlayers = playersLocalStorage ? playersLocalStorage : [];
let _playerStore = writable<Player[]>(initPlayers);

export let playerStore: Writable<Player[]> = {
  ..._playerStore,
  set(value) {
    console.log("Set");
    _playerStore.set(value);
    localStorage.setItem("players", JSON.stringify(value));
  },
};
