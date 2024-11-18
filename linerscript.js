// Add event listeners to all inputs and dropdowns for automatic calculation
document.querySelectorAll('input, select').forEach((element) => {
    element.addEventListener('input', calculateTotal);
});

function calculateTotal() {
    let length = parseInt(document.getElementById('length').value) || 0;

    if (length <= 0) {
        alert('Length must be a positive number.');
        return;
    }

    let houseCleanOut = getCheckboxValue('houseCleanOut', 1500);
    let propertyLineCleanOut = getCheckboxValue('propertyLineCleanOut', 2500);
    let landscape = parseInt(document.getElementById('landscape').value) || 0;
    let reInstate = parseInt(document.getElementById('reInstate').value) || 0;
    let buildingPermit = getCheckboxValue('buildingPermit', 350);
    let otherExpenses = parseFloat(document.getElementById('otherExpenses').value) || 0;

    // Calculate the base price based on length
    let basePrice = calculateBasePrice(length);

    // Calculate the total price
    let total = basePrice + houseCleanOut + propertyLineCleanOut + landscape +
                (reInstate * 1500) + buildingPermit + otherExpenses;

    // Check if AFTER HOURS is enabled
    var afterHours = document.getElementById('afterHours').checked;

    // Final calculation logic
        if (afterHours) {
            total += total * 0.2; // Increase by 20%
        }

    // Format total as currency
    let formattedTotal = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(total);

    // Update the total price in the UI
    document.getElementById('totalPrice').innerText = formattedTotal;

    // Display breakdown summary
    displayBreakdown(basePrice, houseCleanOut, propertyLineCleanOut, landscape, reInstate, buildingPermit, otherExpenses);
}

function calculateBasePrice(length) {
    if (length <= 5) return 4000;
    if (length === 6) return 4000 + 385;
    if (length === 7) return 4000 + 385 * 2;
    if (length === 8) return 4000 + 385 * 3;
    if (length === 9) return 4000 + 385 * 4;
    if (length === 10) return 5000;
    if (length === 11) return 5000 + 385;
    if (length === 12) return 5000 + 385 * 2;
    if (length === 13) return 5000 + 385 * 3;
    if (length >= 14) return 385 * length;

    let extraCleanOuts = Math.floor((length - 1) / 100);
    return 5000 + (length - 10) * 385 + extraCleanOuts * 1500;
}

function getCheckboxValue(id, cost) {
    return document.getElementById(id).checked ? cost : 0;
}

function displayBreakdown(basePrice, houseCleanOut, propertyLineCleanOut, landscape, reInstate, buildingPermit, otherExpenses) {
    let breakdown = `
        <strong>ESTIMATE SUMMARY:</strong><br> 
        &nbsp;&nbsp;&nbsp;&nbsp;- Base Price: $${basePrice.toFixed(2)}<br>
        &nbsp;&nbsp;&nbsp;&nbsp;- House Clean Out: $${houseCleanOut}<br>
        &nbsp;&nbsp;&nbsp;&nbsp;- Property Line Clean Out: $${propertyLineCleanOut}<br>
        &nbsp;&nbsp;&nbsp;&nbsp;- Landscape: $${landscape}<br>
        &nbsp;&nbsp;&nbsp;&nbsp;- Re-Instate (${reInstate}): $${(reInstate * 1500).toFixed(2)}<br>
        &nbsp;&nbsp;&nbsp;&nbsp;- Building Permit: $${buildingPermit}<br>
        &nbsp;&nbsp;&nbsp;&nbsp;- Other Expenses: $${otherExpenses.toFixed(2)}
    `;
    document.getElementById('breakdown').innerHTML = breakdown;
}
