import * as React from "react";

import { LOCAL_WALLET, useWalletState } from "providers/wallet";

export function WalletPage() {
  const walletState = useWalletState();
  const selectWallet = walletState.selectWallet;

  return (
    <>
      <div className={`modal z-auto fade show`}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-card card mb-0">
              <div className="card-header">
                <div className="flex-shrink-0 flex-basis-auto">
                  Select App Wallet
                </div>
              </div>

              <div className="card-body">
                <ul className="list-group list-group-flush list my-n4">

                  <li className="list-group-item">
                    <div className="row align-items-center">
                      <div className="col">
                        <h4 className="mb-1">Local wallet</h4>
                        <p className="small mb-0 text-muted">
                          Saved to browser storage
                        </p>
                      </div>
                      <div className="col-auto">
                        <span
                          className="btn btn-white"
                          onClick={() => {
                            walletState.selectWallet(LOCAL_WALLET);
                          }}
                        >
                          Select
                        </span>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Overlay({ show }: { show: boolean }) {
  if (show) return <div className="modal-backdrop fade show"></div>;
  return <div className="fade"></div>;
}
