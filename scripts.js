// State variables
let baseArray = [];
let isSorting = false;

// DOM Elements
const sizeSlider = document.getElementById("array-size");
const speedSlider = document.getElementById("sort-speed");
const generateBtn = document.getElementById("generate-btn");
const raceBtn = document.getElementById("race-btn");

// Algorithms state configuration
const visualizers = [
    { name: "Bubble", container: document.getElementById("container-bubble"), array: [], func: bubbleSort },
    { name: "Selection", container: document.getElementById("container-selection"), array: [], func: selectionSort },
    { name: "Insertion", container: document.getElementById("container-insertion"), array: [], func: insertionSort },
    { name: "Merge", container: document.getElementById("container-merge"), array: [], func: mergeSortHelper },
    { name: "Quick", container: document.getElementById("container-quick"), array: [], func: quickSortHelper },
    { name: "Heap", container: document.getElementById("container-heap"), array: [], func: heapSortHelper }
];

// Colors
const COLOR_DEFAULT = "var(--bar-default)";
const COLOR_COMPARE = "var(--bar-compare)";
const COLOR_SWAP = "var(--bar-swap)";
const COLOR_SORTED = "var(--bar-sorted)";

// Event Listeners
window.onload = generateBaseArray;
sizeSlider.addEventListener("input", generateBaseArray);
generateBtn.addEventListener("click", generateBaseArray);
raceBtn.addEventListener("click", startRace);

// Utility Functions
function getDelay() {
    const speed = parseInt(speedSlider.value);
    return 510 - speed; 
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function toggleControls(disable) {
    isSorting = disable;
    sizeSlider.disabled = disable;
    generateBtn.disabled = disable;
    raceBtn.disabled = disable;
    raceBtn.style.opacity = disable ? "0.5" : "1";
}

// Ensure final green sweep animation ends correctly
async function sweepGreen(bars) {
    for (let i = 0; i < bars.length; i++) {
        bars[i].style.backgroundColor = COLOR_SORTED;
        await sleep(Math.min(20, getDelay() / 2));
    }
}

async function startRace() {
    if (isSorting) return;
    toggleControls(true);
    
    // Create promises for all algorithms
    const promises = visualizers.map(async (v) => {
        let bars = v.container.getElementsByClassName("bar");
        await v.func(v.array, bars);
        await sweepGreen(bars);
    });
    
    // Wait for all to finish
    await Promise.all(promises);
    
    toggleControls(false);
}

function renderArray(containerDOM, arrayData) {
    containerDOM.innerHTML = "";
    for (let i = 0; i < arrayData.length; i++) {
        let bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = `${arrayData[i]}%`;
        containerDOM.appendChild(bar);
    }
}

function generateBaseArray() {
    if (isSorting) return;
    baseArray = [];
    const size = parseInt(sizeSlider.value);
    
    for (let i = 0; i < size; i++) {
        baseArray.push(Math.floor(Math.random() * 96) + 5); 
    }
    
    // Copy baseArray to all visualizers and render
    visualizers.forEach(v => {
        v.array = [...baseArray];
        renderArray(v.container, v.array);
    });
}

async function swap(i, j, arr, bars) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
    
    bars[i].style.height = `${arr[i]}%`;
    bars[j].style.height = `${arr[j]}%`;
}

// ------------------------
// Sorting Algorithms
// ------------------------

async function bubbleSort(arr, bars) {
    let n = arr.length;
    
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            bars[j].style.backgroundColor = COLOR_COMPARE;
            bars[j+1].style.backgroundColor = COLOR_COMPARE;
            
            await sleep(getDelay());
            
            if (arr[j] > arr[j+1]) {
                bars[j].style.backgroundColor = COLOR_SWAP;
                bars[j+1].style.backgroundColor = COLOR_SWAP;
                await sleep(getDelay());
                await swap(j, j+1, arr, bars);
            }
            
            bars[j].style.backgroundColor = COLOR_DEFAULT;
            bars[j+1].style.backgroundColor = COLOR_DEFAULT;
        }
        bars[n - 1 - i].style.backgroundColor = COLOR_SORTED;
    }
    bars[0].style.backgroundColor = COLOR_SORTED;
}

async function selectionSort(arr, bars) {
    let n = arr.length;
    
    for (let i = 0; i < n - 1; i++) {
        let minIdx = i;
        bars[minIdx].style.backgroundColor = COLOR_COMPARE;
        
        for (let j = i + 1; j < n; j++) {
            bars[j].style.backgroundColor = COLOR_COMPARE;
            await sleep(getDelay());
            
            if (arr[j] < arr[minIdx]) {
                if (minIdx !== i) bars[minIdx].style.backgroundColor = COLOR_DEFAULT;
                minIdx = j;
                bars[minIdx].style.backgroundColor = COLOR_SWAP;
            } else {
                bars[j].style.backgroundColor = COLOR_DEFAULT;
            }
        }
        
        if (minIdx !== i) {
            bars[i].style.backgroundColor = COLOR_SWAP;
            await sleep(getDelay());
            await swap(i, minIdx, arr, bars);
        }
        
        bars[minIdx].style.backgroundColor = COLOR_DEFAULT;
        bars[i].style.backgroundColor = COLOR_SORTED;
    }
    bars[n - 1].style.backgroundColor = COLOR_SORTED;
}

async function insertionSort(arr, bars) {
    let n = arr.length;
    bars[0].style.backgroundColor = COLOR_SORTED;
    
    for (let i = 1; i < n; i++) {
        let key = arr[i];
        let j = i - 1;
        
        bars[i].style.backgroundColor = COLOR_COMPARE;
        await sleep(getDelay());
        
        while (j >= 0 && arr[j] > key) {
            bars[j].style.backgroundColor = COLOR_COMPARE;
            bars[j+1].style.backgroundColor = COLOR_SWAP;
            
            arr[j+1] = arr[j];
            bars[j+1].style.height = `${arr[j+1]}%`;
            
            await sleep(getDelay());
            
            bars[j].style.backgroundColor = COLOR_SORTED;
            bars[j+1].style.backgroundColor = COLOR_SORTED;
            j--;
        }
        
        arr[j+1] = key;
        bars[j+1].style.height = `${key}%`;
        bars[j+1].style.backgroundColor = COLOR_SORTED;
    }
}

// Merge Sort
async function mergeSortHelper(arr, bars) {
    await mergeSort(arr, bars, 0, arr.length - 1);
}

async function mergeSort(arr, bars, l, r) {
    if (l >= r) return;
    
    let m = l + Math.floor((r - l) / 2);
    await mergeSort(arr, bars, l, m);
    await mergeSort(arr, bars, m + 1, r);
    await merge(arr, bars, l, m, r);
}

async function merge(arr, bars, l, m, r) {
    let n1 = m - l + 1;
    let n2 = r - m;
    
    let left = new Array(n1);
    let right = new Array(n2);
    
    for (let i = 0; i < n1; i++) left[i] = arr[l + i];
    for (let j = 0; j < n2; j++) right[j] = arr[m + 1 + j];
    
    let i = 0, j = 0, k = l;
    
    while (i < n1 && j < n2) {
        bars[k].style.backgroundColor = COLOR_COMPARE;
        await sleep(getDelay());
        
        if (left[i] <= right[j]) {
            arr[k] = left[i];
            bars[k].style.height = `${arr[k]}%`;
            i++;
        } else {
            arr[k] = right[j];
            bars[k].style.height = `${arr[k]}%`;
            j++;
        }
        bars[k].style.backgroundColor = COLOR_DEFAULT;
        k++;
    }
    
    while (i < n1) {
        bars[k].style.backgroundColor = COLOR_COMPARE;
        await sleep(getDelay());
        arr[k] = left[i];
        bars[k].style.height = `${arr[k]}%`;
        bars[k].style.backgroundColor = COLOR_DEFAULT;
        i++;
        k++;
    }
    
    while (j < n2) {
        bars[k].style.backgroundColor = COLOR_COMPARE;
        await sleep(getDelay());
        arr[k] = right[j];
        bars[k].style.height = `${arr[k]}%`;
        bars[k].style.backgroundColor = COLOR_DEFAULT;
        j++;
        k++;
    }
}

// Quick Sort
async function quickSortHelper(arr, bars) {
    await quickSort(arr, bars, 0, arr.length - 1);
}

async function quickSort(arr, bars, low, high) {
    if (low < high) {
        let pi = await partition(arr, bars, low, high);
        await quickSort(arr, bars, low, pi - 1);
        await quickSort(arr, bars, pi + 1, high);
    } else if (low >= 0 && low < arr.length) {
        bars[low].style.backgroundColor = COLOR_SORTED;
    }
}

async function partition(arr, bars, low, high) {
    let pivot = arr[high];
    
    bars[high].style.backgroundColor = "purple"; 
    
    let i = low - 1;
    
    for (let j = low; j < high; j++) {
        bars[j].style.backgroundColor = COLOR_COMPARE;
        await sleep(getDelay());
        
        if (arr[j] < pivot) {
            i++;
            bars[i].style.backgroundColor = COLOR_SWAP;
            if(i !== j) bars[j].style.backgroundColor = COLOR_SWAP;
            
            await sleep(getDelay());
            await swap(i, j, arr, bars);
            
            bars[i].style.backgroundColor = COLOR_DEFAULT;
        }
        bars[j].style.backgroundColor = COLOR_DEFAULT;
    }
    
    i++;
    bars[i].style.backgroundColor = COLOR_SWAP;
    bars[high].style.backgroundColor = COLOR_SWAP;
    await sleep(getDelay());
    await swap(i, high, arr, bars);
    
    bars[i].style.backgroundColor = COLOR_SORTED;
    for(let k = low; k <= high; k++) {
        if(k !== i && bars[k].style.backgroundColor !== COLOR_SORTED) {
            bars[k].style.backgroundColor = COLOR_DEFAULT;
        }
    }
    
    return i;
}

// ------------------------
// Heap Sort
// ------------------------

async function heapSortHelper(arr, bars) {
    let n = arr.length;

    // Build max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        await heapify(arr, bars, n, i);
    }

    // Extract elements from heap one by one
    for (let i = n - 1; i > 0; i--) {
        bars[0].style.backgroundColor = COLOR_SWAP;
        bars[i].style.backgroundColor = COLOR_SWAP;
        await sleep(getDelay());
        
        await swap(0, i, arr, bars);
        
        bars[i].style.backgroundColor = COLOR_SORTED;
        bars[0].style.backgroundColor = COLOR_DEFAULT;
        
        await heapify(arr, bars, i, 0);
    }
    bars[0].style.backgroundColor = COLOR_SORTED;
}

async function heapify(arr, bars, n, i) {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest]) {
        largest = left;
    }

    if (right < n && arr[right] > arr[largest]) {
        largest = right;
    }

    if (largest !== i) {
        bars[i].style.backgroundColor = COLOR_COMPARE;
        bars[largest].style.backgroundColor = COLOR_COMPARE;
        await sleep(getDelay());
        
        bars[i].style.backgroundColor = COLOR_SWAP;
        bars[largest].style.backgroundColor = COLOR_SWAP;
        await sleep(getDelay());
        
        await swap(i, largest, arr, bars);
        
        bars[i].style.backgroundColor = COLOR_DEFAULT;
        bars[largest].style.backgroundColor = COLOR_DEFAULT;
        
        await heapify(arr, bars, n, largest);
    }
}