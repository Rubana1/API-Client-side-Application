document.getElementById('holidayForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const country = document.getElementById('country').value;
    const year = document.getElementById('year').value;

    fetch(`https://api.api-ninjas.com/v1/holidays?country=${country}&year=${year}`, {
        method: 'GET',
        headers: {
            'X-Api-Key': 'A36eyw/kg09619Qtt0EEOQ==cjNgwywudIzJ0cIy'  // Replace with your API key
        }
    })
    .then(response => response.json())
    .then(data => {
        const tableBody = document.querySelector('#holidayTable tbody');
        tableBody.innerHTML = '';  // Clear any previous results

        data.forEach(holiday => {
            const row = document.createElement('tr');

            const dateCell = document.createElement('td');
            dateCell.textContent = holiday.date;
            row.appendChild(dateCell);

            const dayCell = document.createElement('td');
            dayCell.textContent = new Date(holiday.date).toLocaleString('en-US', { weekday: 'long' });
            row.appendChild(dayCell);

            const nameCell = document.createElement('td');
            nameCell.textContent = holiday.name;
            row.appendChild(nameCell);

            const typeCell = document.createElement('td');
            typeCell.textContent = holiday.type.replace(/_/g, ' ');
            row.appendChild(typeCell);

            tableBody.appendChild(row);
        });
         // Reset the form fields to empty
         document.getElementById('holidayForm').reset();
    })
    .catch(error => console.error('Error fetching holidays:', error));
});
