# 📊 Students Job Success Analysis

## Overview
This project analyzes data from bootcamp students to explore factors influencing their chances of landing a developer job. It focuses on how workload balance between coding practice and job searching impacts employment outcomes.

## Goals
- Investigate whether balancing coding and job search efforts increases the chances of finding a job.
- Compare success rates across students who focus more on coding, job searching, or maintain a balance.
- Explore additional factors like prior coding knowledge, project creation, and post-bootcamp dedication.

## Hypotheses
- **Initial Hypothesis:**  
  Students who balance coding and job searching have a higher chance of getting a developer job than those who focus more heavily on one area.
  
## Methods

- **Data Gathering**
  We received 115 survey responses from Web Dev Students doing a FT bootcamp between 2022 and 2024.

- **Data Cleaning:**  
  - Converted weekly hour ranges to numerical midpoints for coding and job search activities.
  - Translations from Spanish survey questions to english
  - Data merge between different survey results
  
- **Classification:**  
  For the main analysis, students were classified into:
  - **Balanced**
  - **Coding-focused**
  - **Job-search-focused**
  
- **Statistical Tests:**
  - **Independent T-tests** for exploratory purposes (binary outcome).
  - **Multiple comparison corrections** considered.

## Key Findings
- Students tha focused on balancing weekly hours in coding and job search had generally more changes to getting a job.

## Notes and Limitations
- Students who responded to the survey may be more likely to have found jobs, introducing a potential response bias.
- Only students who have either found a developer job or are still actively searching were considered.

## Folders
- `notebooks`: Jupyter notebooks for data translation, cleaning, EDA and statistical testing.
- `private_data`: Folder with private data gathered from students. Note: since this folder contains private student details it is currently not shared.
- `scripts`: helper functions used for the analysis

## How to Set Up and Run
1. **Clone the repository** (or download the project files).
2. **Activate the environment:**
   ```bash
   pip install -r requirements.txt
   ```
3. Run the jupyter notebook files inside the `notebooks` folder in order.

## Future Work
- Explore the impact of technologies learned, portfolio.
- Analyze the relation between projects created and time it took to get a job.
- Add more data received from new survey results or even add new cohorts to the data.
- Analysis based on country and cohort dates.

## Presentation with Results and Insights

- [Link](https://www.canva.com/design/DAGlqiRxxjg/g7iHQW6AVmda5iFw43W6jw/edit?utm_content=DAGlqiRxxjg&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)

## Authors

- [Luis Junco](https://github.com/luisjunco)
- [Jorge Berrizbeitia](https://github.com/jorgeberrizbeitia)