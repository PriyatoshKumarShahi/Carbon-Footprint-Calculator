// Function to draw the Pie Chart
function drawPieChart(transportFootprint, electricityFootprint, wasteFootprint) {
    const ctx = document.getElementById('footprintChart').getContext('2d');

    // Destroy any existing chart instance to avoid duplicates
    if (window.myChart) {
        window.myChart.destroy();
    }

    // Create the Pie Chart
    window.myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Transport', 'Electricity', 'Waste'],
            datasets: [{
                label: 'Carbon Footprint (kg CO₂)',
                data: [transportFootprint, electricityFootprint, wasteFootprint],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    labels: {
                        font: {
                            size: 18,  // Increase font size
                             // Set font weight to bold
                        },
                        color: 'white'  // You can also change the label color if desired
                    }
                }
            }
        }
        }
    );
}

// Function to get advisory message based on total footprint
function getAdvisoryMessage(totalFootprint) {
    if (totalFootprint < 50) {
        return "Great job! Your carbon footprint is low. Keep up the good work!";
    } else if (totalFootprint >= 50 && totalFootprint < 100) {
        return "You're doing well, but there's room for improvement. Consider reducing your transport and energy usage.";
    } else if (totalFootprint >= 100 && totalFootprint < 200) {
        return "Your carbon footprint is above average. Think about ways to reduce your emissions, like using public transport or energy-efficient appliances.";
    } else {
        return "Your carbon footprint is high. It's crucial to take action to reduce it. Consider adopting a more sustainable lifestyle.";
    }
}

// Function to get danger message if any category exceeds 5 kg
function getDangerMessage(transportFootprint, electricityFootprint, wasteFootprint) {
    let messages = [];
    if (transportFootprint > 5) {
        messages.push("⚠️ Danger! Your transport footprint is high. Consider using public transportation or carpooling.");
    }
    if (electricityFootprint > 5) {
        messages.push("⚠️ Danger! Your electricity usage contributes significantly to your carbon footprint. Consider energy-efficient appliances.");
    }
    if (wasteFootprint > 5) {
        messages.push("⚠️ Danger! Your waste footprint is high. Reduce waste by recycling and composting.");
    }
    return messages.length > 0 ? messages.join('<br>') : '';
}

// Function to calculate the carbon footprint
function calculateFootprint() {
    let transport = parseFloat(document.getElementById('transport').value) || 0;
    let electricity = parseFloat(document.getElementById('electricity').value) || 0;
    let waste = parseFloat(document.getElementById('waste').value) || 0;

    // Conversion factors (you can adjust these for accuracy)
    let transportFactor = 0.12; // kg CO₂ per km
    let electricityFactor = 0.233; // kg CO₂ per kWh
    let wasteFactor = 1.2; // kg CO₂ per kg of waste

    // Calculating carbon footprint for each category
    let transportFootprint = transport * transportFactor;
    let electricityFootprint = electricity * electricityFactor;
    let wasteFootprint = waste * wasteFactor;

    // Total carbon footprint
    let totalFootprint = transportFootprint + electricityFootprint + wasteFootprint;

    if (totalFootprint > 0) {
        // Get the advisory message based on total footprint
        let advisoryMessage = getAdvisoryMessage(totalFootprint);
        
        // Get the danger message if any section exceeds 5 kg
        let dangerMessage = getDangerMessage(transportFootprint, electricityFootprint, wasteFootprint);
        
        // Display the total carbon footprint and advisory in the result section
        document.getElementById('result').innerHTML = `
            <div class="result-left">
                <h3>Total Carbon Footprint: ${totalFootprint.toFixed(2)} kg CO₂</h3>
                <p>Electricity: ${electricityFootprint.toFixed(2)} kg CO₂</p>
                <p>Transport: ${transportFootprint.toFixed(2)} kg CO₂</p>
                <p>Waste: ${wasteFootprint.toFixed(2)} kg CO₂</p>
            </div>
            <div class="result-right">
                <p><strong>Advisory:</strong> ${advisoryMessage}</p>
                ${dangerMessage ? `<p>${dangerMessage}</p>` : ''}
            </div>
        `;

        // Display the chart section
        document.querySelector('.chart-section').style.display = 'block';

        // Draw the pie chart
        drawPieChart(transportFootprint, electricityFootprint, wasteFootprint);
    } else {
        alert("Please enter valid values for at least one category.");
    }
}

// Hide the chart section initially (until the user calculates)
document.addEventListener("DOMContentLoaded", function() {
    document.querySelector('.chart-section').style.display = 'none';
});

// Event listener for the Calculate button
document.getElementById('calculate-btn').addEventListener('click', calculateFootprint);
// JavaScript for toggling the FAQ answers
// JavaScript for toggling the FAQ answers
document.addEventListener('DOMContentLoaded', function () {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const icon = item.querySelector('.toggle-icon');

        icon.addEventListener('click', function () {
            // Toggle the active class to show/hide answer and rotate the icon
            item.classList.toggle('active');

            // Hide answers for other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
        });
    });
});

