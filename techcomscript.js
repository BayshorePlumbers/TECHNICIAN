document.addEventListener('DOMContentLoaded', function() {
    const managerialButton = document.getElementById('managerialAssistanceBtn');
    const oeField = document.getElementById('oe');
    const printButton = document.getElementById('printButton');
    let managerialAssistanceUsed = false;

    // Show confirmation modal on print button click
    printButton.addEventListener('click', function() {
        const userConfirmed = confirm("I HAVE HEREBY REVIEWED ALL THE CONTENTS OF THIS DOCUMENT AND TAKE FULL RESPONSIBILITY FOR THE DOCUMENT.");
        if (userConfirmed) {
            printContent();
        }
    });

    // Print Functionality
    function printContent() {
        const technicianName = document.getElementById('tn').value;
        const notes = document.getElementById('notes').value;
        const jobAddress = document.getElementById('ja').value;
        const totalPrice = document.getElementById('tp').value;
        const materialExpenses = document.getElementById('material').value;
        const oe = document.getElementById('oe').value;
        const projectHours = document.getElementById('pd').value;
        const day1 = document.getElementById('day1').value;
        const day2 = document.getElementById('day2').value;
        const day3 = document.getElementById('day3').value;
        const day4 = document.getElementById('day4').value;
        const day5 = document.getElementById('day5').value;
        const additionalHours = document.getElementById('ah').value;
        const overtimeHours = document.getElementById('toh').value;
        const totalHours = document.getElementById('totalHours').value;
        const sw = document.getElementById('sw').value;
        const wh = document.getElementById('wh').value;
        const rd = document.getElementById('rd').value;
        const totalCommission = document.getElementById('totalCommission').textContent;
        const invoiceNumber = document.getElementById('in').value;
        const bpp = document.getElementById('bpp').value; // Updated BP% field with emoji
        const baseCommission = document.getElementById('baseCommission').textContent;
        const kicker = document.getElementById('kicker').textContent;
        const date = document.getElementById('date').value;
        const salesCommission = document.getElementById('salesCommission').textContent;
        const saleType = managerialButton.innerText;

        const printWindow = window.open('', '', 'width=800,height=600');
        printWindow.document.write(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="stylesheet" href="print.css" type="text/css" media="print">
                <title>TECHNICIAN POTENTIAL COMMISSION</title>
            </head>
            <body>
                <div class="container">
                    <div class="logo-container">
                        <img src="BP.png" alt="BP logo" style="width: 50px; height: auto; max-width: 50px;">
                    </div>
                    <h2>TECHNICIAN COMMISSION CALCULATOR</h2>
                    <div class="details-section">
                    <div class="sale-type-section">
                        <button class="large-button">${saleType}</button>
                    </div>
                        <h3>DETAILS:</h3>
                        <table>
                            <tr><th>Technician's Name:</th><td>${technicianName}</td></tr>
                            <tr><th>Invoice Number:</th><td>${invoiceNumber}</td></tr>
                            <tr><th>Job Address:</th><td>${jobAddress}</td></tr>
                            <tr><th>Date:</th><td>${date}</td></tr>
                            <tr><th>Project Hours:</th><td>${projectHours}</td></tr>
                            <tr><th>Material Expenses:</th><td>${materialExpenses}</td></tr>
                            <tr><th>Other Expenses:</th><td>${oe}</td></tr>
                            <tr><th>Total Price:</th><td>${totalPrice}</td></tr>
                            <tr><th>Notes:</th><td>${notes}</td></tr>
                        </table>
                    </div>
                    <h3>LABOR DETAILS:</h3>
                    <table>
                        <tr><th>Day 1</th><th>Day 2</th><th>Day 3</th><th>Day 4</th></tr>
                        <tr><td>${day1}</td><td>${day2}</td><td>${day3}</td><td>${day4}</td></tr>
                    </table>
                    <table>
                        <tr><th>Day 5</th><th>Additional Hours</th><th>Total Overtime Hours</th><th>Total Hours</th></tr>
                        <tr><td>${day5}</td><td>${additionalHours}</td><td>${overtimeHours}</td><td>${totalHours}</td></tr>
                    </table>
                    <h3>FOR OFFICE USE ONLY:</h3>
                    <table>
                        <tr><th>SW21/RP21</th><th>WH32</th><th>RD15/UL15</th><th>BPP%</th></tr>
                        <tr><td>${sw}</td><td>${wh}</td><td>${rd}</td><td>${bpp}</td></tr>
                    </table>
                    <div class="commission-details-section">
                        <h3>COMMISSION DETAILS:</h3>
                        <table>
                            <tr><th>Technician Base Commission:</th><td>${baseCommission}</td></tr>
                            <tr><th>Kicker:</th><td>${kicker}</td></tr>
                            <tr><th>Technician Total Commission:</th><td>${totalCommission}</td></tr>
                            <tr><th>Sales Commission:</th><td>${salesCommission}</td></tr>
                        </table>
                    </div>
                </div>
            </body>
            </html>
        `);

        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        printWindow.close();
    }
    
    // Add event listener for button click to toggle managerial assistance
    managerialButton.addEventListener('click', function(event) {
        event.preventDefault();

        if (managerialButton.classList.contains('non-assisted')) {
            managerialButton.classList.remove('non-assisted');
            managerialButton.classList.add('assisted');
            managerialButton.innerText = 'ASSISTED SALE';
            managerialAssistanceUsed = true;
            document.getElementById('salesCommissionLabel').style.display = 'block';
        } else {
            managerialButton.classList.remove('assisted');
            managerialButton.classList.add('non-assisted');
            managerialButton.innerText = 'NON-ASSISTED SALE';
            managerialAssistanceUsed = false;
            document.getElementById('salesCommissionLabel').style.display = 'none';
        }

        calculateCommission();
    });

    // Prevent negative values in the Other Expenses field
    oeField.addEventListener('input', function() {
        if (parseFloat(oeField.value) < 0) {
            alert("Other Expenses cannot be negative.");
            oeField.value = 0;
        }
    });

    // Define the calculateCommission function
    function calculateCommission() {
        let kicker = 0;
        let baseCommission = 0;
    
        const tp = parseFloat(document.getElementById('tp').value) || 0;
        const material = parseFloat(document.getElementById('material').value) || 0;
        const oe = parseFloat(document.getElementById('oe').value) || 0;
        const day1 = parseFloat(document.getElementById('day1').value) || 0;
        const day2 = parseFloat(document.getElementById('day2').value) || 0;
        const day3 = parseFloat(document.getElementById('day3').value) || 0;
        const day4 = parseFloat(document.getElementById('day4').value) || 0;
        const day5 = parseFloat(document.getElementById('day5').value) || 0;
        const ah = parseFloat(document.getElementById('ah').value) || 0;
        const toh = parseFloat(document.getElementById('toh').value) || 0;
        const pd = parseFloat(document.getElementById('pd').value) || 0;
    
        const totalHours = day1 + day2 + day3 + day4 + day5 + ah + (1.5 * toh);
        document.getElementById('totalHours').value = totalHours;

        let managerCommission = 0;
        if (managerialAssistanceUsed) {
            managerCommission = 0.02 * tp;
            document.getElementById('salesCommission').textContent = managerCommission.toFixed(2);
        }
    
        const grossAmount = tp - (material * 1.2) - (totalHours * 75) - oe - managerCommission;
        baseCommission = 0.21191 * grossAmount;
    
        const grossProfit = grossAmount - baseCommission;
        const overheads = pd * 246;
        const initialProfit = grossProfit - overheads;
        let profper = tp !== 0 ? parseFloat(((initialProfit / tp) * 100).toFixed(2)) : 0;
    
        if (profper > 30 && profper <= 40) {
            kicker = 0.015 * tp;
        } else if (profper > 40 && profper <= 50) {
            kicker = 0.020 * tp;
        } else if (profper > 50 && profper <= 60) {
            kicker = 0.025 * tp;
        } else if (profper > 60) {
            kicker = 0.030 * tp;
        }
    
        const finalProfit = initialProfit - kicker;
        const finalProfitPercentage = tp !== 0 ? parseFloat(((finalProfit / tp) * 100).toFixed(2)) : 0;

        // Update BP% with emojis based on finalProfitPercentage
        let bppValue = `${finalProfitPercentage.toFixed(2)}% `;
        if (finalProfitPercentage < 10) {
            bppValue += ": 👎 JOB BUST";
        } else if (finalProfitPercentage >= 10 && finalProfitPercentage <= 19.99) {
            bppValue += ": 😬 MARGINAL";
        } else if (finalProfitPercentage >= 20 && finalProfitPercentage <= 29.99) {
            bppValue += ": 👍 GOOD";
        } else if (finalProfitPercentage >= 30 && finalProfitPercentage <= 39.99) {
            bppValue += ": 😀 NICE";
        } else if (finalProfitPercentage >= 40 && finalProfitPercentage <= 59.99) {
            bppValue = ": ⭐ GREAT";
        } else {
            bppValue = ": 🌟 EXCELLENT";
        }
        document.getElementById('bpp').value = bppValue;

        const totalCommission = baseCommission + kicker;
        const sw = ((material * 1.2) / tp) * 100 || 0;
        document.getElementById('sw').value = sw.toFixed(2);
        document.getElementById('wh').value = sw.toFixed(2);
        document.getElementById('rd').value = sw.toFixed(2);
    
        document.getElementById('baseCommission').textContent = '$' + baseCommission.toFixed(2);
        document.getElementById('kicker').textContent = '$' + kicker.toFixed(2);
        document.getElementById('totalCommission').textContent = '$' + totalCommission.toFixed(2);
    }       

    document.getElementById('calculateBtn').addEventListener('click', calculateCommission);
    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', calculateCommission);
    });

    document.getElementById("pd").addEventListener("input", function() {
        let duration = parseFloat(this.value);
        
        if (duration < 1) {
            alert("Project Duration cannot be less than 1 hour.");
            this.value = "";
        } else {
            if (duration >= 1.1 && duration <= 1.49) {
                this.value = 1.5;
            } else if (duration >= 1.51 && duration <= 1.99) {
                this.value = 2;
            } else if (duration >= 2.1 && duration <= 2.49) {
                this.value = 2.5;
            } else if (duration >= 2.51 && duration <= 2.99) {
                this.value = 3;
            }
            for (let i = 3; i <= 100; i++) {
                if (duration >= i + 0.1 && duration <= i + 0.49) {
                    this.value = (i + 0.5).toFixed(1);
                } else if (duration >= i + 0.51 && duration <= i + 0.99) {
                    this.value = (i + 1).toFixed(1);
                }
            }
        }
    });
});
