async function getHistory() {
    const dateInput = document.getElementById('dateInput').value;
    const historyDisplay = document.getElementById('historyDisplay');
    
    // Clear previous content
    historyDisplay.innerHTML = '';

    if (!dateInput) {
        historyDisplay.innerHTML = 'Please select a date.';
        return;
    }

    const [year, month, day] = dateInput.split('-');
    const apiUrl = `https://history.muffinlabs.com/date/${month}/${day}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Could not fetch data.");
        
        const data = await response.json();
        const events = data.data.Events;

        if (events.length === 0) {
            historyDisplay.innerHTML = 'No historical events found for this date.';
            return;
        }

        // Add event data to the page dynamically
        let eventsHtml = `<h2>Events on ${month}-${day}</h2><ul>`;
        events.forEach(event => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<strong>${event.year}:</strong> ${event.text}`;
            historyDisplay.appendChild(listItem);
        });
        historyDisplay.innerHTML += '</ul>';

        // Trigger page reflow to update scroll
        historyDisplay.scrollTop = historyDisplay.scrollHeight;

    } catch (error) {
        historyDisplay.innerHTML = 'Error fetching historical data.';
        console.error(error);
    }
}
