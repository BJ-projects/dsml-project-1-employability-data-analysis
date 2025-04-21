# for changing the column names in spanish data

def rename_columns_es(df):
    es_column_dict = {
        "Por favor, introduce tu nombre completo": "name", 
        "Antes de que empezaras el bootcamp, ¿cual de las siguientes describía mejor tu experiencia previa?": "pre_bootcamp_coding_experience",
        "¿Cuál de las siguientes opciones describe mejor tu situación después del bootcamp?": "post_bootcamp_situation",
        "¿En qué país encontraste trabajo?": "job_country",
        "¿Cuánto tiempo te llevó encontrar trabajo?": "time_to_job",
        "¿Sientes que el bootcamp te ayudó a conseguir este trabajo?": "did_bootcamp_helped",
        "¿Cuáles dirías que fueron los principales factores que te ayudaron a conseguir ese trabajo? Puedes seleccionar varios.": "job_success_factors",
        "En este momento, ¿estás buscando activamente un trabajo como desarrollador web (o puesto similar)?": "is_job_hunting",
        "Si no estás buscando trabajo o sientes que te esfuerzas poco o nada, ¿cuáles crees que son las principales razones? Puedes elegir varias.": "job_hunt_blockers",
        "¿En qué país estas (o estuviste) principalmente buscando trabajo?": "search_country",
        "¿Con cuántas empresas tuviste procesos de entrevistas que implicaban entrevistas en profundidad? (sin contar breves llamadas iniciales)": "company_interview_qty",
        "Durante tu búsqueda de empleo, ¿cuántas horas POR SEMANA dedicaste habitualmente a buscar empleo? (solicitudes de empleo, entrevistas, mejorar linkedin, cv, etc...)": "job_search_week_hours",
        "Durante tu búsqueda de trabajo, ¿cuántas horas POR SEMANA solías dedicar a programar? (proyectos, katas, cursos, tutoriales, etc...)": "coding_week_hours",
        "¿Cuál de las siguientes opciones describe tu enfoque principal durante la búsqueda de empleo?": "job_search_focus",
        "¿Aprendiste alguna nueva tecnología durante tu búsqueda de empleo? De ser así, menciona las principales": "new_learned_techs",
        "Durante la búsqueda de empleo, ¿creaste algún proyecto adicional o proyecto paralelo que agregarías a un portafolio?": "new_projects_qty",
        "Durante la búsqueda de empleo, ¿creaste un sitio web de portafolio?": "did_create_portfolio",
        "¿Quieres añadir algún comentario, recomendaciones para nosotros (profesores), o recomendaciones para otros estudiantes?": "final_comments",
        }

    new_df = df.rename(columns=es_column_dict)
    return new_df

