// Welcome screen slide-up
document.addEventListener("DOMContentLoaded", () => {
    const welcomeScreen = document.getElementById("welcome-screen");
    const getStartedButton = document.getElementById("get-started-button");

    getStartedButton.addEventListener("click", () => {
        welcomeScreen.classList.add("slide-up");

        welcomeScreen.addEventListener(
            "transitionend",
            () => {
                welcomeScreen.style.display = "none";
                document.body.style.overflow = "auto";
            },
            { once: true }
        );
    });
});

// Age calculation logic
const dayInput = document.getElementById("day");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");
const calculateBtn = document.getElementById("calculateBtn");
const resultDiv = document.getElementById("result");
const errorMessageDiv = document.getElementById("errorMessage");


// input focus automatically shifts to the next input field
dayInput.addEventListener('input', function () {
    if (this.value.length >= this.maxLength) {
        monthInput.focus();
    }
});
monthInput.addEventListener('input', function () {
    if (this.value.length >= this.maxLength) {
        yearInput.focus();
    }
});


function displayError(message) {
    errorMessageDiv.textContent = message;
    errorMessageDiv.classList.remove("hidden");
    resultDiv.textContent = "";
    resultDiv.classList.remove("result-box");
    resultDiv.classList.add("error-message");
}

function clearError() {
    errorMessageDiv.textContent = "";
    errorMessageDiv.classList.add("hidden");
    resultDiv.classList.remove("error-message");
    resultDiv.classList.add("result-box");
}

function calculateAge() {
    clearError();

    const day = parseInt(dayInput.value, 10);
    const month = parseInt(monthInput.value, 10);
    const year = parseInt(yearInput.value, 10);

    if (isNaN(day) || isNaN(month) || isNaN(year)) {
        displayError("Please enter valid numbers for all fields.");
        return;
    }
    if (day < 1 || day > 31) {
        displayError("Day must be between 1 and 31.");
        return;
    }
    if (month < 1 || month > 12) {
        displayError("Month must be between 1 and 12.");
        return;
    }
    const currentYear = new Date().getFullYear();
    if (year < 1900 || year > currentYear) {
        displayError(`Year must be between 1900 and ${currentYear}.`);
        return;
    }

    const birthDate = new Date(year, month - 1, day);
    const today = new Date();

    if (
        birthDate.getMonth() !== month - 1 ||
        birthDate.getDate() !== day ||
        birthDate.getFullYear() !== year
    ) {
        displayError("Invalid date. Please check day and month for the given year.");
        return;
    }

    if (birthDate > today) {
        displayError("Date of birth cannot be in the future.");
        return;
    }

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
        months--;
        const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        days += prevMonth.getDate();
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    resultDiv.textContent = `You are ${years} years, ${months} months, and ${days} days old.`;
}

// Add event listener to the button
calculateBtn.addEventListener("click", calculateAge);

// Allowing pressing Enter key in input fields to trigger calculation
[dayInput, monthInput, yearInput].forEach((input) => {
    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") calculateAge();
    });
});

// Set max year for the year input dynamically
yearInput.max = new Date().getFullYear();



// logic for Share Button to Trigger Capture and Share:
document.getElementById('shareButton').addEventListener('click', async () => {
  const mainDiv = document.getElementById('main-content');

  try {
    const canvas = await html2canvas(mainDiv);
    
    canvas.toBlob(async (blob) => {
      if (navigator.canShare && navigator.canShare({ files: [new File([blob], 'age-calculator.png', { type: blob.type })] })) {
        // Use Web Share API to share the image
        await navigator.share({
          files: [new File([blob], 'age-calculator.png', { type: blob.type })],
          title: 'Age Calculator Result',
          text: 'Check out my age calculation result!'
        });
      } 
      else {
        // Fallback: download the image
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'age-calculator.png';
        link.click();
        URL.revokeObjectURL(link.href);
        alert('Image downloaded. Sharing is not supported on this browser.');
      }
    });
  } catch (error) {
    console.error('Error capturing div:', error);
  }
});


// Theme toggle logic
const themeToggle = document.getElementById("theme");
const body = document.body;

window.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("theme") === "dark") {
        body.classList.add("dark-mode");
        themeToggle.checked = true;
    } else {
        body.classList.remove("dark-mode");
        themeToggle.checked = false;
    }
});

themeToggle.addEventListener("change", () => {
    if (themeToggle.checked) {
        body.classList.add("dark-mode");
        localStorage.setItem("theme", "dark");
    } else {
        body.classList.remove("dark-mode");
        localStorage.setItem("theme", "light");
    }
});


