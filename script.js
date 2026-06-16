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

const elementDetails = {
  H: { symbol: 'H', chineseName: '氫', atomicNumber: 1, period: 1, group: '1', category: '非金屬、氣體', property: '最輕的元素' },
  He: { symbol: 'He', chineseName: '氦', atomicNumber: 2, period: 1, group: '18', category: '稀有氣體', property: '常溫常壓下為氣體' },
  Li: { symbol: 'Li', chineseName: '鋰', atomicNumber: 3, period: 2, group: '1', category: '鹼金屬', property: '柔軟銀白色金屬' },
  Be: { symbol: 'Be', chineseName: '鈹', atomicNumber: 4, period: 2, group: '2', category: '鹼土金屬', property: '較硬的金屬元素' },
  B: { symbol: 'B', chineseName: '硼', atomicNumber: 5, period: 2, group: '13', category: '準金屬', property: '半導體特性' },
  C: { symbol: 'C', chineseName: '碳', atomicNumber: 6, period: 2, group: '14', category: '非金屬', property: '生命有機物核心元素' },
  N: { symbol: 'N', chineseName: '氮', atomicNumber: 7, period: 2, group: '15', category: '非金屬、氣體', property: '空氣主要成分' },
  O: { symbol: 'O', chineseName: '氧', atomicNumber: 8, period: 2, group: '16', category: '非金屬、氣體', property: '維持生命燃燒與呼吸' },
  F: { symbol: 'F', chineseName: '氟', atomicNumber: 9, period: 2, group: '17', category: '鹵素', property: '活性極強的非金屬' },
  Ne: { symbol: 'Ne', chineseName: '氖', atomicNumber: 10, period: 2, group: '18', category: '稀有氣體', property: '常用於霓虹燈' },
  Na: { symbol: 'Na', chineseName: '鈉', atomicNumber: 11, period: 3, group: '1', category: '鹼金屬', property: '與水劇烈反應' },
  Mg: { symbol: 'Mg', chineseName: '镁', atomicNumber: 12, period: 3, group: '2', category: '鹼土金屬', property: '輕質結構材料' },
  Al: { symbol: 'Al', chineseName: '鋁', atomicNumber: 13, period: 3, group: '13', category: '金屬', property: '輕且抗腐蝕' },
  Si: { symbol: 'Si', chineseName: '矽', atomicNumber: 14, period: 3, group: '14', category: '準金屬', property: '半導體材料' },
  P: { symbol: 'P', chineseName: '磷', atomicNumber: 15, period: 3, group: '15', category: '非金屬', property: '常見於肥料與化合物' },
  S: { symbol: 'S', chineseName: '硫', atomicNumber: 16, period: 3, group: '16', category: '非金屬', property: '常見於火硝與硫酸' },
  Cl: { symbol: 'Cl', chineseName: '氯', atomicNumber: 17, period: 3, group: '17', category: '鹵素', property: '常用消毒劑' },
  Ar: { symbol: 'Ar', chineseName: '氬', atomicNumber: 18, period: 3, group: '18', category: '稀有氣體', property: '惰性氣體' },
  K: { symbol: 'K', chineseName: '鉀', atomicNumber: 19, period: 4, group: '1', category: '鹼金屬', property: '重要電解質' },
  Ca: { symbol: 'Ca', chineseName: '鈣', atomicNumber: 20, period: 4, group: '2', category: '鹼土金屬', property: '骨骼與貝殼成分' },
  Sc: { symbol: 'Sc', chineseName: '鈧', atomicNumber: 21, period: 4, group: '3', category: '過渡金屬', property: '稀有過渡金屬' },
  Ti: { symbol: 'Ti', chineseName: '鈦', atomicNumber: 22, period: 4, group: '4', category: '過渡金屬', property: '強度高且抗腐蝕' },
  V: { symbol: 'V', chineseName: '釩', atomicNumber: 23, period: 4, group: '5', category: '過渡金屬', property: '合金材料' },
  Cr: { symbol: 'Cr', chineseName: '鉻', atomicNumber: 24, period: 4, group: '6', category: '過渡金屬', property: '不鏽鋼成分' },
  Mn: { symbol: 'Mn', chineseName: '錳', atomicNumber: 25, period: 4, group: '7', category: '過渡金屬', property: '合金元素' },
  Fe: { symbol: 'Fe', chineseName: '鐵', atomicNumber: 26, period: 4, group: '8', category: '過渡金屬', property: '鋼鐵最重要成分' },
  Co: { symbol: 'Co', chineseName: '鈷', atomicNumber: 27, period: 4, group: '9', category: '過渡金屬', property: '磁性材料' },
  Ni: { symbol: 'Ni', chineseName: '鎳', atomicNumber: 28, period: 4, group: '10', category: '過渡金屬', property: '耐腐蝕金屬' },
  Cu: { symbol: 'Cu', chineseName: '銅', atomicNumber: 29, period: 4, group: '11', category: '過渡金屬', property: '導電導熱性強' },
  Zn: { symbol: 'Zn', chineseName: '鋅', atomicNumber: 30, period: 4, group: '12', category: '過渡金屬', property: '防腐蝕鍍層' },
  Ga: { symbol: 'Ga', chineseName: '鎵', atomicNumber: 31, period: 4, group: '13', category: '金屬', property: '半導體材料' },
  Ge: { symbol: 'Ge', chineseName: '鍺', atomicNumber: 32, period: 4, group: '14', category: '準金屬', property: '半導體元素' },
  As: { symbol: 'As', chineseName: '砷', atomicNumber: 33, period: 4, group: '15', category: '準金屬', property: '毒性元素' },
  Se: { symbol: 'Se', chineseName: '硒', atomicNumber: 34, period: 4, group: '16', category: '非金屬', property: '必需微量元素' },
  Br: { symbol: 'Br', chineseName: '溴', atomicNumber: 35, period: 4, group: '17', category: '鹵素', property: '室溫液態非金屬' },
  Kr: { symbol: 'Kr', chineseName: '氪', atomicNumber: 36, period: 4, group: '18', category: '稀有氣體', property: '惰性氣體' },
  Ag: { symbol: 'Ag', chineseName: '銀', atomicNumber: 47, period: 5, group: '11', category: '過渡金屬', property: '導電導熱最強' },
  Au: { symbol: 'Au', chineseName: '金', atomicNumber: 79, period: 6, group: '11', category: '過渡金屬', property: '貴金屬' },
  Hg: { symbol: 'Hg', chineseName: '汞', atomicNumber: 80, period: 6, group: '12', category: '過渡金屬', property: '室溫液態金屬' },
  Pb: { symbol: 'Pb', chineseName: '鉛', atomicNumber: 82, period: 6, group: '14', category: '金屬', property: '有毒重金屬' },
  U: { symbol: 'U', chineseName: '鈾', atomicNumber: 92, period: 7, group: '3', category: '放射性元素', property: '核燃料' },
};

const chineseNameToSymbol = Object.fromEntries(
  Object.values(elementDetails).map((item) => [item.chineseName, item.symbol])
);

const defaultElements = [
  elementDetails.H,
  elementDetails.He,
  elementDetails.C,
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

function findElementData(symbol, name) {
  let searchSymbol = symbol;
  if (!searchSymbol && name) {
    searchSymbol = getSymbolByChineseName(name);
  }
  if (!searchSymbol) return null;
  return elementDetails[searchSymbol] || null;
}

async function autoFill() {
  const symbol = inputSymbol.value.trim();
  const name = inputName.value.trim();

  if (!symbol && !name) {
    showToast('請先輸入元素符號或中文名稱');
    return;
  }

  const data = findElementData(symbol, name);
  if (data) {
    inputSymbol.value = data.symbol;
    inputName.value = data.chineseName;
    inputAtomicNumber.value = data.atomicNumber;
    inputPeriod.value = data.period;
    inputGroup.value = data.group;
    inputCategory.value = data.category;
    inputProperty.value = data.property;
    showToast('資料已填入');
    return;
  }

  let lookupSymbol = symbol;
  if (!lookupSymbol && name) {
    showToast('無此元素資料，請輸入符號');
    return;
  }

  autoFillBtn.disabled = true;
  autoFillBtn.textContent = '載入中…';

  try {
    const apiUrl = `https://neelpatel05.pythonanywhere.com/element/symbol?symbol=${encodeURIComponent(lookupSymbol)}`;
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error('API 回傳錯誤');

    const apiData = await response.json();
    if (!apiData || !apiData.symbol) throw new Error('查無元素資料');

    inputSymbol.value = apiData.symbol || lookupSymbol;
    inputName.value = apiData.name || inputName.value;
    inputAtomicNumber.value = apiData.atomicNumber || inputAtomicNumber.value;
    inputPeriod.value = apiData.period || inputPeriod.value;
    inputGroup.value = apiData.group || apiData.groupBlock || inputGroup.value;
    inputCategory.value = apiData.category || apiData.groupBlock || apiData.standardState || inputCategory.value;
    inputProperty.value = apiData.standardState
      ? `狀態：${apiData.standardState}`
      : apiData.bondingType
      ? `鍵結：${apiData.bondingType}`
      : inputProperty.value;

    showToast('API 資料已填入');
  } catch (error) {
    console.error(error);
    showToast('API 查詢失敗，請確認元素符號');
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
