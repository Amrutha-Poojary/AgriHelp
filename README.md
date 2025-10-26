# AgriHelp - Smart Farmer Support System

AgriHelp is a web-based platform designed to empower farmers with data-driven insights and real-time agricultural support. The platform provides weather forecasts, crop recommendations, government scheme alerts, and multilingual support (English and Kannada), helping farmers make informed decisions for improved productivity and profitability.

## Features

- *Weather Forecast:* Get accurate, location-based weather updates to plan farming activities effectively.
- *Crop Recommendation:* Receive personalized crop suggestions based on soil nutrients, weather, and environmental factors.
- *Government Alerts:* Stay informed about the latest agricultural schemes, subsidies, and support programs.
- *Multilingual Support:* Easily switch between English and Kannada for better accessibility.
- *Secure Login & Registration:* User authentication to save preferences and track recommendations.


## 🛠️ Tech Stack

| Layer        | Technology / Tool                         |
|-------------|-------------------------------------------|
| Frontend    | HTML, CSS, JavaScript                      |
| Backend     | Python, Flask                              |
| Machine Learning | Scikit-learn (Gradient Boosting Classifier) |
| Database    | LocalStorage (for user data)               |
| APIs        | OpenWeatherMap API, Government Scheme API |


## Setup Instructions

1. *Clone the repository*

        git clone https://github.com/Amrutha-Poojary/AgriHelp.git

2. *Navigate to the project folder*

        cd FarmerSupportApp

3. *Install Python dependencies*

        pip install flask flask-cors numpy scikit-learn


4. *Run the Flask backend*

        python app.py


5. Open home.html in a web browser and start using the platform.