// устанавливаем соответствие между полями формы и столбцами таблицы
const correspond = {
  "Название": "structure",
  "Тип": "category",
  "Страна": "country",
  "Город": "city",
  "Год": ["yearFrom", "yearTo"],
  "Высота": ["heightFrom", "heightTo"]
}

const dataFilter = (dataForm) => {
    
  let dictFilter = {};

  // перебираем все элементы формы с фильтрами
  for (const item of dataForm.elements) {
      // получаем значение элемента
      let valInput = item.value;

      // если поле типа text - приводим его значение к нижнему регистру
      if (item.type === "text") {
          valInput = valInput.toLowerCase();
      } 

      if (item.type === "number" && valInput) {
        valInput = Number.parseFloat(valInput);
      }

      if (!valInput && item.id.includes('From')) {
        valInput = Number.NEGATIVE_INFINITY;
      }

      if (!valInput && item.id.includes('To')) {
        valInput = Number.POSITIVE_INFINITY;
      }

       // формируем очередной элемент ассоциативного массива
      dictFilter[item.id] = valInput;
  }       

  return dictFilter;
}


// фильтрация таблицы
const filterTable = (data, idTable, dataForm) =>{
  // получаем данные из полей формы
  const datafilter = dataFilter(dataForm);

  // if (Object.values(datafilter).every(value => Math.abs(value) === Infinity || value === '')) {

  // }
  
  // выбираем данные соответствующие фильтру и формируем таблицу из них
  let tableFilter = data.filter(item => {

      /* в этой переменной будут "накапливаться" результаты сравнения данных
         с параметрами фильтра */
      let result = true;
      
      // строка соответствует фильтру, если сравнение всех значения из input 
      // со значением ячейки очередной строки - истина
       Object.entries(item).map(([key, val]) => {
          
          // текстовые поля проверяем на вхождение
          if (typeof val == 'string') {
              result &&= val.toLowerCase().includes(datafilter[correspond[key]]) 
          }
    
          // САМОСТОЯТЕЛЬНО проверить числовые поля на принадлежность интервалу

          if (typeof val === 'number') {
            const [minValKey, maxValKey] = correspond[key];
            const minVal = datafilter[minValKey];
            const maxVal = datafilter[maxValKey];

            result &&= val >= minVal && val <= maxVal;
          }
       });

       return result;
  });

  console.log('tableFilter', tableFilter)

  // САМОСТОЯТЕЛЬНО вызвать функцию, которая удаляет все строки таблицы с id=idTable
  clearTable(idTable);

  // показать на странице таблицу с отфильтрованными строками
  createTable(tableFilter, idTable);  
}

const clearFilter = (dataForm, idTable) => {
  for (const item of dataForm.elements) {
    if (item.type === 'text'){
      item.value = '';
    }

    if (item.type === 'number') {
      item.value = null;
    }
  }

  clearTable(idTable);
  createTable(buildings, idTable)
}