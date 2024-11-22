const subjects = [
    "HS 3810-01 Health Systems and Structures",
    "HS 3210-01 Human Diseases",
    "HS 3814-01 Community Health",
    "HS 4812-01 Bioethics"
];

const tasks = [
    "Written Assignment",
    "Self quiz",
    "Discussion forum",
    "Learning journal"
];

function selectSubject() {
    const weekNumber = document.getElementById('weekNumber').value;
    const subjectSelectionContainer = document.getElementById('subjectSelectionContainer');
    subjectSelectionContainer.innerHTML = '';

    const subjectSelect = document.createElement('select');
    subjectSelect.id = 'subjectSelect';
    subjectSelect.onchange = () => createTaskTable(weekNumber, subjectSelect.value);
    subjects.forEach((subject, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = subject;
        subjectSelect.appendChild(option);
    });

    subjectSelectionContainer.appendChild(subjectSelect);
    createTaskTable(weekNumber, subjectSelect.value);
}

function createTaskTable(weekNumber, subjectIndex) {
    const tasksContainer = document.getElementById('tasksContainer');
    tasksContainer.innerHTML = '';

    const table = document.createElement('table');
    const headerRow = document.createElement('tr');
    headerRow.innerHTML = `<th>Task</th><th>Done</th>`;
    table.appendChild(headerRow);

    tasks.forEach(task => {
        const key = `${subjects[subjectIndex]}_${task}_week${weekNumber}`;
        const isChecked = localStorage.getItem(key) === 'done' ? 'checked' : '';
        const taskRow = document.createElement('tr');
        taskRow.innerHTML = `
            <td>${task} (Week ${weekNumber})</td>
            <td><input type="radio" name="${key}" ${isChecked} onclick="storeTask('${key}')"></td>
        `;
        table.appendChild(taskRow);
    });

    tasksContainer.appendChild(table);
}

function storeTask(key) {
    localStorage.setItem(key, 'done');
}
