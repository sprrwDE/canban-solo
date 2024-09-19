/**
 * Filters Database
 */
function setFilters() {
    urgent = database.filter(v => v.data.status === 'urgent');
    medium = database.filter(v => v.data.status === 'medium');
    low = database.filter(v => v.data.status === 'low');
    console.log('Urgent:', urgent);
    console.log('Medium:', medium);
    console.log('Low:', low);
    renderFilteredDatabaseObjects(urgent, medium, low);
}

/**
 * Renders Filtered Database in DOM
 */
function renderFilteredDatabaseObjects(urgent, medium, low) {
    renderUrgent(urgent);
    renderMedium(medium);
    renderLow(low);
}

function renderUrgent(urgent) {
    for (let index = 0; index < urgent.length; index++) {
        urgentRef.innerHTML += urgentCardTemplate(index);
    }
}

function renderMedium(medium) {
    for (let index = 0; index < medium.length; index++) {
        mediumRef.innerHTML += mediumCardTemplate(index);
    }
}

function renderLow(low) {
    for (let index = 0; index < low.length; index++) {
        lowRef.innerHTML += lowCardTemplate(index);
    }
}