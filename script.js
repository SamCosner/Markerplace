// Function to fetch current ETH price in USD
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

// Function to update USD prices
async function updateUSDPrices() {
  const ethPrice = await getETHPrice();
  if (!ethPrice) return;

  // Update marketplace listing prices
  const marketplacePrices = document.querySelectorAll('.listing .usd-price');
  marketplacePrices.forEach(priceElement => {
    const ethAmount = parseFloat(priceElement.previousElementSibling.textContent);
    const usdAmount = ethAmount * ethPrice;
    priceElement.textContent = `≈ $${usdAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD`;
  });

  // Update listing detail page prices
  const detailPrices = document.querySelectorAll('.listing-detail-price .usd-price');
  detailPrices.forEach(priceElement => {
    const ethAmount = parseFloat(priceElement.previousElementSibling.textContent);
    const usdAmount = ethAmount * ethPrice;
    priceElement.textContent = `≈ $${usdAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD`;
  });
}

// Update prices when page loads
document.addEventListener('DOMContentLoaded', updateUSDPrices);

// Update prices every 5 minutes
setInterval(updateUSDPrices, 5 * 60 * 1000);
