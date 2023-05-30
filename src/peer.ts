import { Peer } from "peerjs";
import { playerStore } from "./lib/players";

export async function initNewPeer() {
  return new Promise<Peer>((resolve, reject) => {
    const peer = new Peer();

    peer.on("open", (id) => {
      peer.on("connection", (conn) => {
        console.log("connection", conn);
        conn.on("data", (data: any) => {
          console.log("received", data);
          playerStore.set(data);
        });

        playerStore.subscribe((players) => {
          console.log("sending", players);
          conn.send(players);
        });
      });

      resolve(peer);
    });
  });
}
