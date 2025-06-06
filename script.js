// Load ETH price and update USD estimates
async function getETHPrice() {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
    const data = await response.json();
    return data.ethereum.usd;
  } catch (error) {
    console.error('Error fetching ETH price:', error);
    return null;
  }
}

async function updateUSDPrices() {
  const ethPrice = await getETHPrice();
  if (!ethPrice) return;

  const marketplacePrices = document.querySelectorAll('.listing .usd-price');
  marketplacePrices.forEach(priceElement => {
    const ethAmount = parseFloat(priceElement.previousElementSibling.textContent);
    const usdAmount = ethAmount * ethPrice;
    priceElement.textContent = `≈ $${usdAmount.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })} USD`;
  });

  const detailPrices = document.querySelectorAll('.listing-detail-price .usd-price');
  detailPrices.forEach(priceElement => {
    const ethAmount = parseFloat(priceElement.previousElementSibling.textContent);
    const usdAmount = ethAmount * ethPrice;
    priceElement.textContent = `≈ $${usdAmount.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })} USD`;
  });
}

document.addEventListener('DOMContentLoaded', updateUSDPrices);
setInterval(updateUSDPrices, 5 * 60 * 1000);

// ✅ Connect wallet using Ethers.js
window.connectWallet = async function () {
  if (typeof window.ethereum === 'undefined') {
    alert("MetaMask is not installed.");
    return;
  }

  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const address = await signer.getAddress();

    alert("Wallet connected: " + address);
    console.log("Connected wallet:", address);
  } catch (error) {
    console.error("Wallet connection failed:", error);
    alert("Wallet connection failed.");
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector("button.connect-wallet");
  if (btn) {
    btn.addEventListener("click", connectWallet);
  }
});
