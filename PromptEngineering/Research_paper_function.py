import google.generativeai as genai
from dotenv import load_dotenv
import os
from API_KEY import API_KEY

# Load environment variables
load_dotenv()

# Configure the API key
genai.configure(api_key=API_KEY)

model = genai.GenerativeModel(
    'gemini-1.5-flash-latest',
    generation_config=genai.GenerationConfig(
        temperature=0.7,
        top_p=1,
        max_output_tokens=100,
    ))

def generate_short_query(long_prompt):
    
    # Generate the query prompt
    query_prompt = f"""Given the following long prompt, generate a concise 5-10 word query that captures the main topic for searching on Google Scholar:

Long Prompt: {long_prompt}

Short Query (5-10 words):"""

    # Generate content using the model
    response = model.generate_content(query_prompt)
    
    # Return the generated short query
    return response.text.strip()


