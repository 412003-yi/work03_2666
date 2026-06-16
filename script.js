const tabCard = document.getElementById('tab-card');
const tabManage = document.getElementById('tab-manage');
const pageCard = document.getElementById('card-section');
const pageManage = document.getElementById('manage-section');
const flashCard = document.getElementById('flash-card');
const displaySymbol = document.getElementById('display-symbol');
const displayName = document.getElementById('display-name');
const detailAtomicNumber = document.getElementById('detail-atomic-number');
const detailPeriod = document.getElementById('detail-period');
const detailGroup = document.getElementById('detail-group');
const detailCategory = document.getElementById('detail-category');
const detailProperty = document.getElementById('detail-property');
const prevButton = document.getElementById('prev-element');
const nextButton = document.getElementById('next-element');
const toast = document.getElementById('toast');
const elementListEl = document.getElementById('element-list');
const elementForm = document.getElementById('element-form');
const inputSymbol = document.getElementById('input-symbol');
const inputName = document.getElementById('input-name');
const inputAtomicNumber = document.getElementById('input-atomic-number');
const inputPeriod = document.getElementById('input-period');
const inputGroup = document.getElementById('input-group');
const inputCategory = document.getElementById('input-category');
const inputProperty = document.getElementById('input-property');
const autoFillBtn = document.getElementById('auto-fill');

let elements = [];
let currentIndex = 0;
let toastTimer = null;

const chineseNameToSymbol = {
  氫: 'H',
  氦: 'He',
  鋰: 'Li',
  鈹: 'Be',
  硼: 'B',
  碳: 'C',
  氮: 'N',
  氧: 'O',
  氟: 'F',
  霉: 'Ne',
  鈉: 'Na',
  镁: 'Mg',
  鋁: 'Al',
  矽: 'Si',
  磷: 'P',
  硫: 'S',
  氯: 'Cl',
  氬: 'Ar',
  鉀: 'K',
  鈣: 'Ca',
  鈧: 'Sc',
  釩: 'V',
  鉻: 'Cr',
  錳: 'Mn',
  鐵: 'Fe',
  鈷: 'Co',
  鎳: 'Ni',
  銅: 'Cu',
  鋅: 'Zn',
};

const defaultElements = [
  {
    symbol: 'H',
    chineseName: '氫',
    atomicNumber: 1,
    period: 1,
    group: '1',
    category: '非金屬、氣體',
    property: '最輕的元素',
  },
  {
    symbol: 'He',
    chineseName: '氦',
    atomicNumber: 2,
    period: 1,
    group: '18',
    category: '稀有氣體',
    property: '常溫常壓下為氣體',
  },
  {
    symbol: 'C',
    chineseName: '碳',
    atomicNumber: 6,
    period: 2,
    group: '14',
    category: '非金屬',
    property: '生命有機物核心元素',
  },
];

function showToast(message) {
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.remove('hidden');
  toastTimer = setTimeout(() => toast.classList.add('hidden'), 2600);
}

function switchPage(page) {
  pageCard.classList.toggle('active', page === 'card');
  pageManage.classList.toggle('active', page === 'manage');
  tabCard.classList.toggle('active', page === 'card');
  tabManage.classList.toggle('active', page === 'manage');
}

function loadElements() {
  const stored = localStorage.getItem('periodic-elements');
  elements = stored ? JSON.parse(stored) : defaultElements;
  currentIndex = 0;
  renderElementList();
  renderCard();
}

function saveElements() {
  localStorage.setItem('periodic-elements', JSON.stringify(elements));
}

function renderCard() {
  if (!elements.length) {
    displaySymbol.textContent = '-';
    displayName.textContent = '尚無元素';
    detailAtomicNumber.textContent = '-';
    detailPeriod.textContent = '-';
    detailGroup.textContent = '-';
    detailCategory.textContent = '-';
    detailProperty.textContent = '-';
    return;
  }

  const current = elements[currentIndex];
  displaySymbol.textContent = current.symbol || '-';
  displayName.textContent = current.chineseName || '-';
  detailAtomicNumber.textContent = current.atomicNumber || '-';
  detailPeriod.textContent = current.period || '-';
  detailGroup.textContent = current.group || '-';
  detailCategory.textContent = current.category || '-';
  detailProperty.textContent = current.property || '-';
}

function renderElementList() {
  elementListEl.innerHTML = '';
  elements.forEach((element, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <div class="element-item">
        <strong>${element.symbol} ${element.chineseName}</strong>
        <span class="element-meta">${element.atomicNumber || '-'} / 週期 ${element.period || '-'} / 族 ${element.group || '-'}</span>
      </div>
      <div>
        <button type="button" class="select-btn" data-index="${index}">選擇</button>
        <button type="button" class="remove-btn" data-index="${index}">刪除</button>
      </div>
    `;

    const selectBtn = li.querySelector('.select-btn');
    const removeBtn = li.querySelector('.remove-btn');

    selectBtn.addEventListener('click', () => {
      currentIndex = index;
      renderCard();
      switchPage('card');
    });

    removeBtn.addEventListener('click', () => removeElement(index));
    elementListEl.appendChild(li);
  });
}

function removeElement(index) {
  elements.splice(index, 1);
  if (currentIndex >= elements.length) {
    currentIndex = Math.max(0, elements.length - 1);
  }
  saveElements();
  renderElementList();
  renderCard();
  showToast('已移除元素');
}

function prevElement() {
  if (!elements.length) return;
  currentIndex = (currentIndex - 1 + elements.length) % elements.length;
  renderCard();
}

function nextElement() {
  if (!elements.length) return;
  currentIndex = (currentIndex + 1) % elements.length;
  renderCard();
}

function getSymbolByChineseName(name) {
  const trimmed = name.trim();
  if (!trimmed) return null;
  return chineseNameToSymbol[trimmed] || null;
}

async function autoFill() {
  const symbol = inputSymbol.value.trim();
  const name = inputName.value.trim();

  if (!symbol && !name) {
    showToast('請先輸入元素符號或中文名稱');
    return;
  }

  let lookupSymbol = symbol;
  if (!lookupSymbol && name) {
    lookupSymbol = getSymbolByChineseName(name);
    if (!lookupSymbol) {
      showToast('無法根據中文名稱自動找到元素符號，請先輸入符號');
      return;
    }
    inputSymbol.value = lookupSymbol;
  }

  autoFillBtn.disabled = true;
  autoFillBtn.textContent = '載入中…';

  try {
    const apiUrl = `https://neelpatel05.pythonanywhere.com/element/symbol?symbol=${encodeURIComponent(lookupSymbol)}`;
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error('API 回傳錯誤');

    const data = await response.json();
    if (!data || !data.symbol) throw new Error('查無元素資料');

    inputSymbol.value = data.symbol || lookupSymbol;
    inputName.value = data.name || inputName.value;
    inputAtomicNumber.value = data.atomicNumber || inputAtomicNumber.value;
    inputPeriod.value = data.period || inputPeriod.value;
    inputGroup.value = data.group || data.groupBlock || inputGroup.value;
    inputCategory.value = data.category || data.groupBlock || data.standardState || inputCategory.value;
    inputProperty.value = data.standardState
      ? `狀態：${data.standardState}`
      : data.bondingType
      ? `鍵結：${data.bondingType}`
      : inputProperty.value;

    showToast('自動填入完成');
  } catch (error) {
    console.error(error);
    showToast('自動填入失敗，請確認元素符號或中文名稱');
  } finally {
    autoFillBtn.disabled = false;
    autoFillBtn.textContent = '自動填入';
  }
}

elementForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const newElement = {
    symbol: inputSymbol.value.trim(),
    chineseName: inputName.value.trim(),
    atomicNumber: parseInt(inputAtomicNumber.value, 10) || '',
    period: parseInt(inputPeriod.value, 10) || '',
    group: inputGroup.value.trim(),
    category: inputCategory.value.trim(),
    property: inputProperty.value.trim(),
  };

  if (!newElement.symbol || !newElement.chineseName) {
    showToast('元素符號與中文名為必填');
    return;
  }

  const existingIndex = elements.findIndex(
    (item) => item.symbol.toLowerCase() === newElement.symbol.toLowerCase()
  );

  if (existingIndex >= 0) {
    elements[existingIndex] = newElement;
    currentIndex = existingIndex;
    showToast('已更新元素資料');
  } else {
    elements.push(newElement);
    currentIndex = elements.length - 1;
    showToast('已新增元素');
  }

  saveElements();
  renderElementList();
  renderCard();
  elementForm.reset();
});

autoFillBtn.addEventListener('click', autoFill);
flashCard.addEventListener('click', () => flashCard.classList.toggle('is-flipped'));
flashCard.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    flashCard.classList.toggle('is-flipped');
  }
});
prevButton.addEventListener('click', prevElement);
nextButton.addEventListener('click', nextElement);
tabCard.addEventListener('click', () => switchPage('card'));
tabManage.addEventListener('click', () => switchPage('manage'));

loadElements();
