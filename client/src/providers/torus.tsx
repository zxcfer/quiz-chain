import * as React from "react";
import Torus from "@toruslabs/torus.js";
import NodeDetailsManager from "@toruslabs/fetch-node-details";
import { Keypair } from "@solana/web3.js";
import { reportError } from "utils";

const origin = window.location.origin;
const USE_TORUS_TESTNET = origin === "http://localhost:3000";

// Torus is only enabled for authorized domains
const ENABLE_TORUS =
  USE_TORUS_TESTNET ||
  origin === "https://break.solana.com" ||
  origin === "https://staging.break.solana.com";

type NodeDetails = {
  torusNodeEndpoints: any;
  torusIndexes: any;
  torusNodePub: any;
};

const CLIENT_ID =
  "785716588020-b5a4fheugq38c23do3p2l73iumfrklnr.apps.googleusercontent.com";
const TEST_CLIENT_ID =
  "785716588020-p8kdid1dltqsafcl23g82fb9funikaj7.apps.googleusercontent.com";
const VERIFIER = "breaksolana-google";

const NODE_DETAILS = USE_TORUS_TESTNET
  ? new NodeDetailsManager({
      network: "ropsten",
      proxyAddress: "0x4023d2a0D330bF11426B12C6144Cfb96B7fa6183",
    })
  : (new (NodeDetailsManager as any)() as NodeDetailsManager);

type ConnectionMode = "cached" | "fresh";
type FetchStatus = "fetching" | "reloading" | "success" | "failure";

type State = {
  enabled: boolean;
  error?: string;
  loaded: boolean;
  loadingWallet: boolean;
  email?: string;
  wallet?: Keypair;
  connect: (mode: ConnectionMode) => void;
  disconnect: () => void;
};

const StateContext = React.createContext<State | undefined>(undefined);

type Props = { children: React.ReactNode };
export function TorusProvider({ children }: Props) {
  const [fetchStatus, setFetchStatus] = React.useState<FetchStatus>();
  const [nodeDetails, setNodeDetails] = React.useState<NodeDetails>();
  const [wallet, setWallet] = React.useState<Keypair>();
  const [error, setError] = React.useState<string>();

  React.useEffect(() => {
    if (!ENABLE_TORUS) return;

    let unmounted = false;
    NODE_DETAILS.getNodeDetails({ skip: true, verifier: "", verifierId: "" })
      .then((details) => {
        !unmounted && setNodeDetails(details);
      })
      .catch((err) => {
        reportError(err, "Fetching torus node details");
      });

    return () => {
      unmounted = true;
    };
  }, []);

  // Detects when a user has signed in and fetches the user's Torus private key
  React.useEffect(() => {

    let connectionMode: ConnectionMode;
    if (fetchStatus === "reloading") {
      connectionMode = "cached";
    } else if (fetchStatus === "fetching") {
      connectionMode = "fresh";
    } else {
      return;
    }

    let unmounted = false;
    (async () => {
      const torus = new Torus({});
    })();

    return () => {
      unmounted = true;
    };
  }, [nodeDetails, fetchStatus]);

}

export function useTorusState(): State {
  const state = React.useContext(StateContext);
  if (state === undefined) {
    throw new Error(`useTorusState must be used within a TorusProvider`);
  }
  return state;
}
