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

// Calculate weight for specific RM (reverse Epley formula)
// If 1RM = weight × (1 + reps / 30), then weight = 1RM / (1 + reps / 30)
function calculateWeightForReps(oneRM, reps) {
    return oneRM / (1 + reps / 30);
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
const result2RM = document.getElementById('result-2rm');
const result3RM = document.getElementById('result-3rm');
const result4RM = document.getElementById('result-4rm');
const result5RM = document.getElementById('result-5rm');
const result6RM = document.getElementById('result-6rm');
const result7RM = document.getElementById('result-7rm');
const result8RM = document.getElementById('result-8rm');
const result9RM = document.getElementById('result-9rm');
const result10RM = document.getElementById('result-10rm');
const resultUnit = document.getElementById('result-unit');
const weightUnit = document.getElementById('weight-unit');
const unitRadios = document.querySelectorAll('input[name="unit"]');
const exerciseSelect = document.getElementById('exercise-select');
const exerciseCards = document.querySelectorAll('.exercise-card');

let currentUnit = 'lbs';

// Exercise dropdown handler
exerciseSelect.addEventListener('change', (e) => {
    const selectedExercise = e.target.value;

    // Hide all cards
    exerciseCards.forEach(card => {
        card.classList.remove('active');
    });

    // Show selected card
    const selectedCard = document.querySelector(`.exercise-card[data-exercise="${selectedExercise}"]`);
    if (selectedCard) {
        selectedCard.classList.add('active');
    }
});

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

        // Update 1RM result
        result1RM.textContent = formatResult(oneRM);

        // Calculate and update 2RM through 10RM
        result2RM.textContent = formatResult(calculateWeightForReps(oneRM, 2));
        result3RM.textContent = formatResult(calculateWeightForReps(oneRM, 3));
        result4RM.textContent = formatResult(calculateWeightForReps(oneRM, 4));
        result5RM.textContent = formatResult(calculateWeightForReps(oneRM, 5));
        result6RM.textContent = formatResult(calculateWeightForReps(oneRM, 6));
        result7RM.textContent = formatResult(calculateWeightForReps(oneRM, 7));
        result8RM.textContent = formatResult(calculateWeightForReps(oneRM, 8));
        result9RM.textContent = formatResult(calculateWeightForReps(oneRM, 9));
        result10RM.textContent = formatResult(calculateWeightForReps(oneRM, 10));

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
