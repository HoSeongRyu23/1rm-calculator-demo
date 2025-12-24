import './styles/main.css';

// Calculator logic
function calculate1RM(weight, reps) {
    if (weight <= 0 || reps <= 0 || reps > 50) {
        throw new Error('Invalid input');
    }
    // Epley formula: 1RM = weight × (1 + reps / 30)
    return weight * (1 + reps / 30);
}

function calculatePercentage(oneRM, percentage) {
    return (oneRM * percentage) / 100;
}

function formatResult(value) {
    return value.toFixed(1);
}

function convertUnit(value, from, to) {
    const LBS_TO_KG = 0.453592;
    if (from === to) return value;
    if (from === 'lbs' && to === 'kg') return value * LBS_TO_KG;
    if (from === 'kg' && to === 'lbs') return value / LBS_TO_KG;
    return value;
}

// DOM elements
const weightInput = document.getElementById('weight-input');
const repsInput = document.getElementById('reps-input');
const calculateBtn = document.getElementById('calculate-btn');
const result1RM = document.getElementById('result-1rm');
const result90 = document.getElementById('result-90');
const result80 = document.getElementById('result-80');
const result70 = document.getElementById('result-70');
const resultUnit = document.getElementById('result-unit');
const weightUnit = document.getElementById('weight-unit');
const unitRadios = document.querySelectorAll('input[name="unit"]');

let currentUnit = 'lbs';

// Unit toggle handler
unitRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
        const newUnit = e.target.value;
        const oldUnit = currentUnit;

        // Convert existing weight input
        if (weightInput.value) {
            const converted = convertUnit(
                parseFloat(weightInput.value),
                oldUnit,
                newUnit
            );
            weightInput.value = formatResult(converted);
        }

        currentUnit = newUnit;
        weightUnit.textContent = newUnit.toUpperCase();
        resultUnit.textContent = newUnit.toUpperCase();

        // Recalculate if there are results
        if (result1RM.textContent !== '--') {
            handleCalculate();
        }
    });
});

// Calculate button handler
function handleCalculate() {
    const weight = parseFloat(weightInput.value);
    const reps = parseInt(repsInput.value);

    // Validation
    if (!weight || !reps) {
        alert('Please enter both weight and reps');
        return;
    }

    if (weight <= 0) {
        alert('Weight must be greater than 0');
        return;
    }

    if (reps <= 0 || reps > 50) {
        alert('Reps must be between 1 and 50');
        return;
    }

    try {
        // Calculate 1RM
        const oneRM = calculate1RM(weight, reps);

        // Update results
        result1RM.textContent = formatResult(oneRM);
        result90.textContent = formatResult(calculatePercentage(oneRM, 90));
        result80.textContent = formatResult(calculatePercentage(oneRM, 80));
        result70.textContent = formatResult(calculatePercentage(oneRM, 70));

        // Add animation
        result1RM.parentElement.classList.add('animate-pulse');
        setTimeout(() => {
            result1RM.parentElement.classList.remove('animate-pulse');
        }, 300);
    } catch (error) {
        alert(error.message);
    }
}

calculateBtn.addEventListener('click', handleCalculate);

// Enter key support
weightInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        repsInput.focus();
    }
});

repsInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleCalculate();
    }
});

console.log('1RM Calculator loaded successfully!');
