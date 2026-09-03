# Smart-SMS-Spam-Detection
Smart SMS Spam Detection — A scalable ML web app that classifies SMS as spam/ham using NLP (tokenization, TF-IDF) and Multinomial Naive Bayes. Achieves 95.5% accuracy with 100% spam precision. Built with Python, scikit-learn, NLTK &amp; Streamlit for real-time predictions via an interactive UI.

---

## 📌 Overview

The rapid growth of mobile communication has led to a surge in unwanted and unsolicited SMS messages, threatening user privacy and security. This project tackles that problem by building an intelligent, automated spam detection system that goes beyond simple keyword matching — using NLP to understand context and patterns in text.

To make the solution practically usable, a clean, user-friendly website was developed where users can paste any SMS message and instantly get a prediction on whether it's spam or genuine.A machine learning system that detects and classifies SMS messages as **Spam** or **Ham** (legitimate) using Natural Language Processing techniques and the Multinomial Naive Bayes algorithm — deployed as an interactive web application built with Streamlit.

---

## ✨ Features

- 🔍 **Real-time SMS classification** — instant spam/ham prediction via web interface
- 🧠 **NLP-based preprocessing** — tokenization, stopword removal, stemming/lemmatization
- 📊 **TF-IDF & Bag of Words** feature extraction for text vectorization
- 🤖 **Multinomial Naive Bayes** classifier, benchmarked against Logistic Regression and SVM
- 📈 **Transparent performance metrics** — accuracy, precision, recall & F1-score displayed on the app
- 🎨 **Exploratory Data Analysis** — class distribution, message length analysis, word clouds

---

## 🖥️ Tech Stack

| Category | Tools & Libraries |
|---|---|
| **Language** | Python |
| **ML / NLP** | scikit-learn, NLTK, spaCy |
| **Data Handling** | pandas, NumPy |
| **Visualization** | matplotlib, seaborn, WordCloud |
| **Web App** | Streamlit |
| **Frontend** | HTML, CSS, JavaScript |

---

## 📂 Dataset

- **Source:** [Kaggle SMS Spam Collection Dataset](https://www.kaggle.com/)
- **Size:** 5,572 labeled SMS messages
- **Distribution:** 4,825 Ham (86.6%) | 747 Spam (13.4%)
- **Columns:** `label` (spam/ham), `message` (SMS text)

---

## ⚙️ Methodology

```
Data Collection → Text Preprocessing → Feature Extraction (BOW/TF-IDF) 
       → Model Building → Evaluation → Prediction → Web Deployment
```

1. **Text Preprocessing** — lowercase conversion, punctuation/stopword removal, tokenization, stemming
2. **Feature Extraction** — TF-IDF vectorization to weigh word importance across the dataset
3. **Model Training** — 80/20 train-test split, trained using Multinomial Naive Bayes
4. **Evaluation** — assessed with classification reports & confusion matrices
5. **Deployment** — integrated into a Streamlit web app for real-time predictions

---

## 📊 Results

| Metric | Spam | Ham |
|---|---|---|
| Accuracy | 95.5% | 95.5% |
| Precision | 100% | 95% |
| Recall | 71% | 100% |
| F1-Score | 97% | 83% |

**Key Insight:** Longer messages (200+ characters) showed a significantly higher likelihood of being spam, validating message length as a strong predictive feature. Frequent spam indicators included words like *"free," "win," "call,"* and *"claim."*

---

## 🚀 Getting Started

### Prerequisites
```bash
Python 3.8+
pip
```

### Installation
```bash
# Clone the repository
git clone https://github.com/<your-username>/smart-sms-spam-detection.git
cd smart-sms-spam-detection

# Install dependencies
pip install -r requirements.txt
```

### Run the App
```bash
streamlit run app.py
```

The app will open in your browser — paste an SMS message and click **Analyze** to get an instant spam/ham prediction.

---

## 📁 Project Structure

```
smart-sms-spam-detection/
├── app.py                  # Streamlit web application
├── model.py                 # Core ML model (preprocessing, training, prediction)
├── notebooks/                # EDA & model development notebooks
├── data/                     # Dataset files
├── requirements.txt          # Python dependencies
└── README.md
```

---

## 🔮 Future Scope

- 🌍 Multilingual spam detection support
- ⚡ Real-time optimization for faster processing
- 🧬 Deep learning integration (LSTM, BERT/Transformer-based models)
- 🔒 Enhanced privacy-preserving analysis
- 📱 Mobile application integration

---

## 📄 License

This project was developed as part of a Bachelor of Technology final-year project. Feel free to fork and build upon it for educational purposes.

---

⭐ If you found this project useful, consider giving it a star!
