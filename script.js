
// Use Thirdweb's UMD build (already included via <script> tag in HTML)
const client = new thirdweb.ThirdwebClient({
  clientId: "689e2ac97c20befd3e1ab5c236b48184", // Replace with actual Client ID from Thirdweb
});

const contract = new thirdweb.Contract({
  client,
  chain: thirdwebChains.defineChain(11155111), // Sepolia testnet
  address: "0x5c5d34599745be9719e816bb40E86d9705Ae636b", // Your deployed contract address
});

let connectedWallet = null;

document.getElementById("connectWallet").addEventListener("click", async () => {
  try {
    connectedWallet = await thirdweb.connectWallet("metamask", { client });
    alert("Wallet connected: " + connectedWallet.address);
  } catch (err) {
    console.error("Wallet connection failed:", err);
    alert("Failed to connect wallet.");
  }
});

const buyButtons = document.querySelectorAll(".buy-button");
buyButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    if (!connectedWallet) {
      alert("Please connect your wallet first.");
      return;
    }

    try {
      const tx = await contract.erc20.claim(1);
      alert("Token purchased! TX: " + tx.receipt.transactionHash);
    } catch (err) {
      console.error("Token purchase failed:", err);
      alert("Purchase failed. See console for details.");
    }
  });
});
