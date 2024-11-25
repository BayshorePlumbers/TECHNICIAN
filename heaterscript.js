document.addEventListener('DOMContentLoaded', function() {
    const inputFields = document.querySelectorAll('#biddingForm input, #biddingForm select');
    inputFields.forEach(function(input) {
        input.addEventListener('input', calculateFinalPrice);
        input.addEventListener('change', calculateFinalPrice);
    });

    calculateFinalPrice(); // Initial calculation on page load
});

function calculateFinalPrice() {
    const et = parseFloat(document.getElementById('et').value) || 0;
    const material = parseFloat(document.getElementById('material').value) || 0;
    const am = parseFloat(document.getElementById('am').value) || 0;
    const others = parseFloat(document.getElementById('others').value) || 0;
    const discount = document.getElementById('discount').value;
    const permits = document.getElementById('permits');
    const financingOption = document.getElementById('financing').value;
    const finalPriceSpan = document.getElementById('finalPrice');

    let finalPrice = 0;

    // Define and calculate individual cost variables
    let materialCost = material * 1.5;
    let manpowerCost = am * et * 75;
    let othersCost = others * 1.2;
    let permitsCost = permits.checked ? 350 : 0;
    let estimatedTimeCost = et * 453;

    // Calculate total final price
    finalPrice = materialCost + manpowerCost + othersCost + permitsCost + estimatedTimeCost;

    // Apply discounts
    if (discount === '5%') {
        finalPrice *= 0.95;
    } else if (discount === '10%') {
        finalPrice *= 0.9;
    }

    // Apply financing option adjustments
    if (financingOption === '2611') {
        finalPrice *= 1.05;
    } else if (financingOption === '9998') {
        finalPrice *= 1.055;
    }
    // Check if AFTER HOURS is enabled
    var afterHours = document.getElementById('afterHours').checked;

    // Final calculation logic
    if (afterHours) {
        finalPrice += finalPrice * 0.2; // Increase by 20%
    }

    // Display the final calculated price
    finalPriceSpan.textContent = '$' + finalPrice.toFixed(2);

    // Display the breakdown summary
    displayBreakdown(materialCost, manpowerCost, othersCost, permitsCost, estimatedTimeCost);
}

function displayBreakdown(materialCost, manpowerCost, othersCost, permitsCost, estimatedTimeCost) {
    let breakdown = `
        <strong>ESTIMATE SUMMARY:</strong><br>
        &nbsp;&nbsp;&nbsp;&nbsp;- Material Cost: $${materialCost.toFixed(2)}<br>
        &nbsp;&nbsp;&nbsp;&nbsp;- Additional Manpower Cost: $${manpowerCost.toFixed(2)}<br>
        &nbsp;&nbsp;&nbsp;&nbsp;- Other Expenses: $${othersCost.toFixed(2)}<br>
        &nbsp;&nbsp;&nbsp;&nbsp;- Permits Cost: $${permitsCost.toFixed(2)}<br>
        &nbsp;&nbsp;&nbsp;&nbsp;- Estimated Time Cost: $${estimatedTimeCost.toFixed(2)}
    `;
    document.getElementById('breakdown').innerHTML = breakdown;
}
