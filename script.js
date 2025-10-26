// ---------------- LANGUAGE TRANSLATION ----------------
const translations = {
    en: {
        weatherTitle: "Weather Forecast",
        weatherCityPlaceholder: "Enter your city",
        weatherFetching: "Fetching weather details...",
        weatherError: "Failed to fetch weather data.",
        weatherCityNotFound: "City not found. Try again.",
        cropTitle: "Crop Recommendation",
        cropProcessing: "Processing recommendation...",
        cropError: "Please fill in all fields before getting a recommendation.",
        recommendedCrop: "Recommended Crop",
        alertsLoading: "Loading government alerts...",
        learnMore: "Learn More",
        defaultAlertTitle: "Government Scheme",
        defaultAlertDesc: "Learn more at official site."
    },
    kn: {
        weatherTitle: "ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ",
        weatherCityPlaceholder: "ನಿಮ್ಮ ನಗರವನ್ನು ನಮೂದಿಸಿ",
        weatherFetching: "ಹವಾಮಾನ ವಿವರಗಳನ್ನು ಪಡೆಯಲಾಗುತ್ತಿದೆ...",
        weatherError: "ಹವಾಮಾನ ಡೇಟಾವನ್ನು ಪಡೆಯಲು ವಿಫಲವಾಗಿದೆ.",
        weatherCityNotFound: "ನಗರ ಕಂಡುಬಂದಿಲ್ಲ. ಮರುಪ್ರಯತ್ನಿಸಿ.",
        cropTitle: "ಬೆಳೆ ಶಿಫಾರಸು",
        cropProcessing: "ಶಿಫಾರಸು ಪ್ರಕ್ರಿಯೆಗೊಳಿಸಲಾಗುತ್ತಿದೆ...",
        cropError: "ಶಿಫಾರಸು ಪಡೆಯುವ ಮೊದಲು ಎಲ್ಲಾ ಕ್ಷೇತ್ರಗಳನ್ನು ತುಂಬಿ.",
        recommendedCrop: "ಶಿಫಾರಸು ಮಾಡಿದ ಬೆಳೆ",
        alertsLoading: "ಸರ್ಕಾರಿ ಪ್ರಕಟಣೆಗಳನ್ನು ಲೋಡ್ ಮಾಡಲಾಗುತ್ತಿದೆ...",
        learnMore: "ಹೆಚ್ಚು ತಿಳಿದುಕೊಳ್ಳಿ",
        defaultAlertTitle: "ಸರ್ಕಾರಿ ಯೋಜನೆ",
        defaultAlertDesc: "ಅಧಿಕೃತ ತಾಣದಲ್ಲಿ ತಿಳಿದುಕೊಳ್ಳಿ."
    }
};

function setLanguage(lang){
    localStorage.setItem("selectedLang", lang);
    applyLanguage(lang);
}

function applyLanguage(lang){
    const t = translations[lang] || translations['en'];

    // Update placeholders
    document.getElementById("city").placeholder = t.weatherCityPlaceholder;

    // Update static texts (you can add more as needed)
    if(document.getElementById("weather-result").innerHTML.includes("Fetching weather details"))
        document.getElementById("weather-result").innerHTML = t.weatherFetching;

    if(document.getElementById("crop-result").innerHTML.includes("Processing recommendation"))
        document.getElementById("crop-result").innerHTML = t.cropProcessing;

    // Update alert section if loaded
    const alertCards = document.querySelectorAll(".alert-card");
    alertCards.forEach(card=>{
        if(card.querySelector("a") && card.querySelector("a").textContent.includes("Learn More"))
            card.querySelector("a").textContent = t.learnMore;
    });
}

// Apply saved language on load
window.addEventListener("load", ()=>{
    const lang = localStorage.getItem("selectedLang") || "en";
    applyLanguage(lang);
});

// ---------------- SMOOTH SCROLL ----------------
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
        console.error("Section not found:", sectionId);
    }
}

// ---------------- WEATHER FUNCTION ----------------
async function getWeather() {
    const city = document.getElementById("city").value;
    const apiKey = "624dadc9141f719633384eca6d60a5be";
    const resultDiv = document.getElementById("weather-result");
    const lang = localStorage.getItem("selectedLang") || "en";
    const t = translations[lang];

    if (!city) {
        resultDiv.innerHTML = `<p>${t.weatherError}</p>`;
        return;
    }

    resultDiv.innerHTML = `<p>${t.weatherFetching}</p>`;

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );
        const data = await response.json();

        if (data.cod === 200) {
            resultDiv.innerHTML = `
                <div>
                    <h3>${data.name}, ${data.sys.country}</h3>
                    <p>🌡️ Temperature: ${data.main.temp}°C</p>
                    <p>💧 Humidity: ${data.main.humidity}%</p>
                    <p>☁️ Condition: ${data.weather[0].description}</p>
                    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="weather icon">
                </div>
            `;
        } else {
            resultDiv.innerHTML = `<p>${t.weatherCityNotFound}</p>`;
        }
    } catch (error) {
        console.error(error);
        resultDiv.innerHTML = `<p>${t.weatherError}</p>`;
    }
}

// ---------------- CROP RECOMMENDATION FUNCTION ----------------
async function getCropRecommendation() {
    const N = document.getElementById("N").value;
    const P = document.getElementById("P").value;
    const K = document.getElementById("K").value;
    const temperature = document.getElementById("temperature").value;
    const humidity = document.getElementById("humidity").value;
    const ph = document.getElementById("ph").value;
    const rainfall = document.getElementById("rainfall").value;
    const resultDiv = document.getElementById("crop-result");
    const lang = localStorage.getItem("selectedLang") || "en";
    const t = translations[lang];

    if (!N || !P || !K || !temperature || !humidity || !ph || !rainfall) {
        resultDiv.innerHTML = `<p>${t.cropError}</p>`;
        return;
    }

    resultDiv.innerHTML = `<p>${t.cropProcessing}</p>`;

    try {
        const response = await fetch("http://127.0.0.1:5000/predict", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ N, P, K, temperature, humidity, ph, rainfall })
        });

        const data = await response.json();
        resultDiv.innerHTML = `<p>🌾 ${t.recommendedCrop}: <strong>${data.recommended_crop}</strong></p>`;
    } catch (error) {
        console.error("Error fetching crop recommendation:", error);
        resultDiv.innerHTML = `<p>${t.cropError}</p>`;
    }
}

// ---------------- GOVERNMENT ALERTS FUNCTION ----------------
async function loadGovernmentAlerts() {
    const container = document.getElementById("alerts-list");
    const lang = localStorage.getItem("selectedLang") || "en";
    const t = translations[lang];
    container.innerHTML = `<p>${t.alertsLoading}</p>`;

    // Mock data
    const mockAlerts = [
        { title: "PM Kisan Samman Nidhi", description: "Direct income support to farmers.", link: "https://pmkisan.gov.in/" },
        { title: "Soil Health Card", description: "Get your soil tested and receive advice.", link: "https://soilhealth.dac.gov.in/" },
        { title: "Pradhan Mantri Fasal Bima Yojana", description: "Crop insurance scheme to protect against losses.", link: "https://pmfby.gov.in/" }
    ];

    container.innerHTML = "";
    mockAlerts.forEach(alert => {
        const card = document.createElement("div");
        card.className = "alert-card";
        card.innerHTML = `
            <h3>${alert.title || t.defaultAlertTitle}</h3>
            <p>${alert.description || t.defaultAlertDesc}</p>
            <a href="${alert.link}" target="_blank">${t.learnMore}</a>
        `;
        container.appendChild(card);
    });
}

// Load alerts when page loads
window.addEventListener("load", () => {
    loadGovernmentAlerts();
});
