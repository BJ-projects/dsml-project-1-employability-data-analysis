
import pandas as pd


def group_by_column_vs_has_dev_job(df, column_to_render):

  result = df.groupby(column_to_render).agg(
    total_students=("ct_student_id", "size"),
    has_dev_job_true=("has_dev_job", lambda x: (x == True).sum()),
    pct_found_job=("has_dev_job", lambda x: f"{round((x == True).sum() / len(x) * 100)}%"),
    has_dev_job_false=("has_dev_job", lambda x: (x == False).sum()),
    pct_not_found_job=("has_dev_job", lambda x: f"{round((x == False).sum() / len(x) * 100)}%")
  )

  # Define the correct order of the categories
  ordered_categories_dict = {
    "did_create_portfolio": [
      False,
      True,
    ],
    "new_projects_qty": [
      'No Projects', 
      '1 Project', 
      '2 to 3 Projects',
      'More than 3 Projects'
    ],
    "job_search_week_hours": [
      "Less than 5",
      "Between 5 and 10",
      "Between 10 and 20",
      "Between 20 and 30",
      "More than 30"
    ],
    "coding_week_hours": [
      "Less than 5",
      "Between 5 and 10",
      "Between 10 and 20",
      "Between 20 and 30",
      "More than 30"
    ],
    "workload_balance_diff": list(range(-4, 5)), # values between -4 and 4
    "company_interview_qty": [
      "0 companies",
      "1 company",
      "2 companies",
      "3 companies",
      "4 companies",
      "5 companies",
      "6 companies",
      "7 companies",
      "8 companies",
      "9 companies",
      "10 or more companies",
    ],
    "pre_bootcamp_coding_experience": [
      "I had zero coding knowledge",
      "I had basic coding knowledge",
      "I had medium to advanced coding knowledge",
      "I had professional coding knowledge and experience",
    ],
  }

  # for total_hours: compute all the possible combinations of workload hours & add them to the dictionary
  hours_searching = [2.5, 7.5, 15, 25, 35]
  hours_coding = [2.5, 7.5, 15, 25, 35]
  hours_all_combinations = sorted({a + b for a in hours_searching for b in hours_coding})
  ordered_categories_dict["total_hours"] = hours_all_combinations

  # Convert index to ordered categorical
  result.index = pd.CategoricalIndex(
    result.index,
    categories=ordered_categories_dict[column_to_render],
    ordered=True
  )
  
  # Return, sort by the index (which is now an ordered categorical)
  return result.sort_index()

