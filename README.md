# **📘 ATISHA - Student-Counselor Matching Platform**

**Empowering Students, Guiding Futures 🌟**

Welcome to **ATISHA**, a cutting-edge platform designed to provide personalized career recommendations and connect students with expert counselors. Leveraging AI/ML and psychological frameworks, ATISHA ensures students receive tailored guidance for a bright future.

---

## **🌟 Key Features**

- 🧑‍💻 **AI-Powered Career Recommendations**  
  Matches students' interests and personality traits to career options using:

  - **Holland Code**
  - **Big Five Personality Traits**
  - **Aptitude Tests**
  - **IQ Tests**

- 🤝 **Student-Counselor Matching**  
  Tailored quizzes enable optimal matches between students and counselors.

- 📊 **Comprehensive Assessment System**  
  A personalized 30-question quiz designed for grades 6–12 students.

- 🔒 **Secure Organizational Emails**  
  Auto-generated student emails in the format:  
  `2024greenwoodhigh12345johndoe@atisha.org`

---

## **📖 Table of Contents**

1. [About the Project](#about-the-project)
2. [Tech Stack](#tech-stack)
3. [Installation](#installation)
4. [Usage](#usage)
5. [UI Highlights](#ui-highlights)
6. [APIs](#apis)
7. [Project Structure](#project-structure)
8. [Contributing](#contributing)
9. [Future Enhancements](#future-enhancements)
10. [License](#license)

---

## **📚 About the Project**

ATISHA aims to bridge the gap in personalized student guidance by combining AI-based career predictions with counselor support.

### **How It Works**

1. **Student Signs Up**: Students provide basic details and preferences.
2. **Personalized Quiz**: AI-curated quiz evaluates the student's traits and aptitudes.
3. **Recommendations**: Tailored career paths are suggested based on results.
4. **Counselor Matching**: Students are paired with experts for career advice.

---

## **🛠️ Tech Stack**

| **Category**       | **Technology**                         |
| ------------------ | -------------------------------------- |
| **Frontend**       | React.js with TypeScript               |
| **Backend**        | Flask (Python)                         |
| **Database**       | PostgreSQL                             |
| **AI Models**      | Hugging Face Transformers, Cohere API  |
| **Hosting**        | GCP / AWS                              |
| **Email Services** | Freenom + Improvmx or Gmail automation |

---

## **🚀 Installation**

### Prerequisites

Ensure you have the following installed:

- Python 3.9+
- Node.js and npm
- PostgreSQL

### Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/atisha.git
   cd atisha
   ```

2. **Set Up Backend**

   - Install Python dependencies:
     ```bash
     pip install -r requirements.txt
     ```
   - Configure `.env` file for API keys and database credentials.

3. **Set Up Frontend**

   - Navigate to the frontend folder:
     ```bash
     cd client
     ```
   - Install dependencies:
     ```bash
     npm install
     ```

4. **Run the Application**
   - Start the backend server:
     ```bash
     python app.py
     ```
   - Start the frontend:
     ```bash
     npm start
     ```

---

## **🎨 UI Highlights**

### **1. Student Dashboard**

Manage profile, view quizzes, and access recommendations.  
📸 _(Include a screenshot of the dashboard)_

### **2. Quiz Interface**

Interactive quiz with progress tracking.  
📸 _(Include a screenshot of the quiz)_

### **3. Recommendations Page**

Detailed insights into suggested careers and matching counselors.  
📸 _(Include a screenshot of the recommendations page)_

---

## **🔌 APIs**

| **Endpoint**           | **Description**                                    |
| ---------------------- | -------------------------------------------------- |
| `/generate_questions`  | Generates quiz questions based on AI models.       |
| `/submit_quiz`         | Stores quiz answers and calculates traits.         |
| `/get_recommendations` | Fetches career recommendations based on quiz data. |
| `/match_counselor`     | Matches a student with a counselor.                |

---

## **📁 Project Structure**

```plaintext
📂 ATISHA
├── 📂 client         # Frontend React code
├── 📂 server         # Flask APIs and ML models
├── 📂 models         # AI/ML model configurations
├── 📂 static         # Static assets (images, CSS)
├── 📄 README.md      # Project documentation
└── 📄 .env           # Environment variables
```

---

## **📈 Future Enhancements**

- **🔗 Integration with Social Media**: Allow students to share results.
- **📱 Mobile App**: Expand accessibility with native apps.
- **🧠 Advanced ML Models**: Incorporate fine-tuned models for better accuracy.
- **🎓 Alumni Network**: Connect students with alumni for mentoring.

---

## **🤝 Contributing**

We welcome contributions to ATISHA! 🚀

1. Fork the repository.
2. Create a new feature branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes.
4. Submit a pull request.

---

## **📜 License**

This project is licensed under the MIT License. See `LICENSE` for more details.

---

## **📞 Contact**

**Project Lead**: Your Name  
📧 Email: support@atisha.org

---
