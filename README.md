# Sorting Visualizer

**[🚀 Play the Live Demo Here!](https://aryan1196.github.io/sorting_visualizer/)**

A stunning, real-time web application that visualizes how various sorting algorithms perform concurrently. Built with a modern dark theme and glassmorphism UI, this tool serves both as a beautiful demonstration of computer science concepts and an interactive educational resource.

## Features

- **Concurrent Visualization (The "Sort Race"):** Watch all algorithms sort the exact same randomized array simultaneously to visually compare their time complexities and performance.
- **6 Supported Algorithms:**
  - Bubble Sort `O(N²)`
  - Selection Sort `O(N²)`
  - Insertion Sort `O(N²)`
  - Merge Sort `O(N log N)`
  - Quick Sort `O(N log N)`
  - Heap Sort `O(N log N)`
- **Dynamic Controls:**
  - Generate new randomized arrays on demand.
  - Adjust the array size (from 10 up to 60 elements).
  - Adjust the sorting animation speed in real-time.
- **Color Coded Insights:**
  - 🔵 **Unsorted:** Default state of the elements.
  - 🔴 **Comparing:** Elements currently being evaluated against each other.
  - 🟡 **Swapping/Pivot:** Elements being moved or used as a pivot point.
  - 🟢 **Sorted:** Elements confirmed in their final, sorted position.
- **Dedicated Educational Pages:** Click on any algorithm's name in the visualizer to navigate to a dedicated page explaining how it works step-by-step, complete with time/space complexity charts and custom infographic diagrams.

## Tech Stack

This project is a completely static frontend web application built using standard web technologies. No backend or build steps are required.

- **HTML5** (Structure and layout)
- **CSS3** (Styling, grid layout, animations, glassmorphism)
- **Vanilla JavaScript** (Algorithm logic, DOM manipulation, asynchronous `Promise`-based animations)

## Project Structure

```text
sorting-visualizer/
├── index.html                  # Main dashboard and sorting race track
├── style.css                   # Global styles and themes
├── scripts.js                  # Core sorting logic and UI controller
├── images/                     # Custom algorithm diagrams
│   ├── bubble_sort_diagram.png
│   ├── heap_sort_diagram.png
│   ├── insertion_sort_diagram.png
│   ├── merge_sort_diagram.png
│   ├── quick_sort_diagram.png
│   └── selection_sort_diagram.png
└── sorting_techniques/         # Individual algorithm explainer pages
    ├── bubble.html
    ├── heap.html
    ├── insertion.html
    ├── merge.html
    ├── quick.html
    └── selection.html
```

## How to Run Locally

Because this is a static website, you don't need to install Node.js, Python, or any web server to run it locally.

1. Clone or download this repository.
2. Navigate to the project folder.
3. Double-click on `index.html` to open it in your default web browser.

Alternatively, if you use VS Code, you can use the "Live Server" extension to run the project.


