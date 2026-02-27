document.addEventListener("DOMContentLoaded", function() {
  createTable(buildings, 'list');
});

const form = document.getElementById('filter');

document.getElementById('find-filtered-items-button').addEventListener('click', function () {
  filterTable(buildings, 'list', form)
});

document.getElementById('clear-filter-button').addEventListener('click', function () {
  clearFilter(form, 'list');
})