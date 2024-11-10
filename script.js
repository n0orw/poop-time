document.addEventListener('DOMContentLoaded', () => {
    switchProfile('Noor'); // Default profile on load
});

let currentProfile = 'Noor';
const poopLogs = {
    'Noor': [],
    'Manal': []
};

function switchProfile(profile) {
    currentProfile = profile;
    document.getElementById('profile-name').textContent = `${profile}'s Profile`;
    updateMonthlySummary();
    document.getElementById('status-message').textContent = `Switched to ${profile}'s profile.`;
}

function logPoopEntry() {
    const note = document.getElementById('poop-note').value.trim();
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const fullDate = `${day}/${month}/${year}`;

    if (note) {
        poopLogs[currentProfile].push({
            date: fullDate,
            note: note
        });

        updateMonthlySummary();
        document.getElementById('status-message').textContent = `Logged 1 poop for ${currentProfile} on ${fullDate}`;
        document.getElementById('poop-note').value = ''; // Clear note input
    } else {
        document.getElementById('status-message').textContent = 'Please add a note before logging.';
    }
}

function updateMonthlySummary() {
    const summaryList = document.getElementById('summary-list');
    summaryList.innerHTML = ''; // Clear previous entries

    let totalPoops = 0;
    poopLogs[currentProfile].forEach((entry, index) => {
        totalPoops++;

        const listItem = document.createElement('li');
        listItem.textContent = `Log ${index + 1} - Date: ${entry.date}, Note: ${entry.note}`;
        summaryList.appendChild(listItem);
    });

    const totalItem = document.createElement('li');
    totalItem.style.fontWeight = 'bold';
    totalItem.textContent = `Total Poops This Month: ${totalPoops}`;
    summaryList.appendChild(totalItem);
}
