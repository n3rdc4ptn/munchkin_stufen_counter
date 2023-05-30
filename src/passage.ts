import { Passage, type PassageUserInfo } from "@passageidentity/passage-js";
import Peer from "peerjs";
import { writable, type Readable, type Writable, readable } from "svelte/store";
import { initNewPeer } from "./peer";

export const PASSAGE_APP_ID = "Ag38moyLLuBea1HoS5XdHdqG";

export const passage = new Passage(PASSAGE_APP_ID);

export let passageLoading = writable(true);
export let webauthnsupport = writable(false);

passage
  .getCredentialAvailable()
  .then((credentials) => {
    webauthnsupport.set(credentials.isAvailable);
  })
  .finally(() => {
    passageLoading.set(false);
  });

// User Management
export let currentUser = writable<PassageUserInfo | "loading" | null>(
  "loading"
);
async function refreshUser() {
  const user = passage.getCurrentUser();
  try {
    const userInfo = await user.userInfo();
    currentUser.set(userInfo);
  } catch {
    currentUser.set(null);
  }
}

refreshUser();

export async function login(email: string) {
  const authResult = await passage.login(email);
  refreshUser();

  return authResult;
}

export async function register(email: string) {
  const authResult = await passage.register(email);
  refreshUser();

  return authResult;
}
