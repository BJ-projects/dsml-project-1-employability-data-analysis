# for changing the column names in english data

def rename_columns_en(df):
    en_column_dict = {
        "Please enter your full name": "name",
        "Before you started the bootcamp, what best described your previous experience?": "pre_bootcamp_coding_experience",
        "Which of the following best describes your situation after the bootcamp": "post_bootcamp_situation",
        "In which country did you find a job?": "job_country",
        "How long did it take you to find a job ?": "time_to_job",
        "Do you feel the bootcamp helped you to get this job?": "did_bootcamp_helped",
        "What would you say were main factors that helped you get that job? You can select multiple.": "job_success_factors",
        "At the moment, are you actively looking for a job as a Web Developer (or similar roles) ?": "is_job_hunting",
        "If you are not looking for a job, or If you feel you're putting little to no effort, what do you think are the main reasons for that? You can select multiple.": "job_hunt_blockers",
        "In which country you are or you were mainly searching for a job?": "search_country",
        "With how many companies did you have an interview processes that involved in-depth interviews (not just short screening calls)?  ": "company_interview_qty",
        "During your job search, how many hours PER WEEK did you usually spend applying for jobs (job applications, interviews, improve linkedin, cv,....) ?": "job_search_week_hours",
        "During your job search, how many hours PER WEEK did you usually spend coding (projects, katas, courses, tutorials,...) ?": "coding_week_hours",
        "Which of the following describes your main focus during the job search.": "job_search_focus",
        "Did you learn any new technologies during your job search? If so, please list the main ones.": "new_learned_techs",
        "During your job search, did you create any additional projects or side projects that you would add to your Portfolio ?": "new_projects_qty",
        "During your job search, did you create a Portfolio Website?": "did_create_portfolio",
        "Do you want to add any comments, recommendations for us (teachers), or recommendations for other students ?": "final_comments",
    }

    new_df = df.rename(columns=en_column_dict)
    return new_df

