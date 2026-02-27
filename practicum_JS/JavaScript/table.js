const createBodyRows = (data) => {
  const tbody = document.createElement('tbody');

  data.forEach(item => {
    const row = document.createElement('tr');
    Object.values(item).forEach(value => {
      const td = document.createElement('td');
      td.innerHTML = value;

      row.append(td);
    });

    tbody.append(row);
  });

  return tbody;
}

const DEFAULT_HEADER = ['Название', 'Тип', 'Страна', 'Город', 'Год', 'Высота']

const createTable = (data, idTable) => {
  const table = document.getElementById(idTable);
  console.log('in create table', table);
  const header = data.length ? Object.keys(data[0]) : DEFAULT_HEADER
  console.log('header', header)
 
  /* создание шапки таблицы */
  const headerRow = createHeaderRow(header);
  table.append(headerRow);

  /* создание тела таблицы */
  const bodyRows = createBodyRows(data);
  table.append(bodyRows);
};

const createHeaderRow = (headers) => {
  const tr = document.createElement('tr');
  headers.forEach(header => {
      const th = document.createElement('th');
      th.innerHTML = header;
      tr.append(th);
  });
  return tr;
};

const clearTable = (idTable) => {
  const table = document.getElementById(idTable);

  // clearing header
  const header = table.querySelector('tr');
  while (header.querySelector('th')) {
    const th = header.querySelector('th');
    th.remove();
  }
  header.remove();
  
  // clearing body 
  const tbody = table.querySelector('tbody');

  while (tbody.querySelector('tr')) {
    tbody.querySelectorAll('td').forEach(td => td.remove());
    const tr = tbody.querySelector('tr');
    tr.remove();
  }
  tbody.remove();
}
