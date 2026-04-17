# Employee Performance Predictor using Data Analytics

## 1. Project Explanation
- **Simple Explanation**: This project uses past data (like attendance, project scores, and training) to predict how an employee will perform in the next appraisal cycle. It helps HR managers identify who needs help and who is ready for a promotion.
- **Technical Explanation**: A supervised machine learning classification task that predicts a categorical performance band (High, Medium, Low). We use a **Random Forest Classifier** trained on synthetic HR features to handle non-linear relationships and provide feature importance (interpretability).

### Workflow:
1. **Data**: Synthetic HR records representing 12 months of activity.
2. **Preprocessing**: Missing value imputation, One-Hot encoding for departments, Scaling for experience.
3. **EDA**: Correlation heatmaps to see how 'Training Hours' relate to 'Performance'.
4. **Model**: Random Forest with 5-fold cross-validation.
5. **Insights**: Identification of key drivers (e.g., On-time delivery rate is the strongest predictor).

---

## 2. Tech Stack Selection (Option B - Intermediate)
- **Language**: Python 3.9+
- **Data Handling**: Pandas, NumPy
- **Machine Learning**: Scikit-Learn (Random Forest)
- **Visualization**: Matplotlib, Seaborn
- **Deployment**: Streamlit / PowerBI

---

## 3. Project Architecture
```text
[Employee Data (CSV)] -> [Cleaning/Imputation] -> [Feature Selection]
                                                        |
                                            [Random Forest Model]
                                                        |
                                [Prediction: H/M/L] <---'---> [Feature Importance]
                                        |                         |
                                [HR Recommendations] <---- [Visual Dashboard]
```

---

## 4. Folder Structure
```text
Employee-Performance-Predictor/
├── data/               # Raw and processed datasets
├── notebooks/          # Jupyter Notebooks for EDA and Modeling
├── src/                # Python scripts for training/prediction
├── app/                # Streamlit/React code for dashboard
├── README.md           # Documentation
└── requirements.txt    # List of libraries (pandas, sklearn, etc.)
```

---

## 5. Interview Prep (Top 3 Questions)
1. **Q: Why use Random Forest instead of Linear Regression?**
   - *A: Performance isn't always linear. A small increase in training might help a lot, but too much might not add value. RF handles these complex patterns better.*
2. **Q: How did you handle the lack of real data?**
   - *A: Used Python's NumPy and Pandas to simulate distributions based on industry benchmarks (e.g., sales teams have different KPIs than engineering).*
3. **Q: How can HR use this ethically?**
   - *A: It should be a decision-support tool, never a decision-maker. It flags "Performance at Risk" so managers can provide support early.*
