from flask import Flask, request, jsonify
from datetime import datetime, timedelta
import re
import openai
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
openai.api_key = os.getenv('OPENAI_API_KEY')

app = Flask(__name__)

def parse_date_with_llm(date_text):
    try:
        # Use OpenAI GPT-4 to extract and convert date expressions
        response = openai.Completion.create(
            model="gpt-4",
            prompt=f"Extract and convert this date expression to a complete date format (YYYY-MM-DD): {date_text}",
            max_tokens=50
        )
        date_str = response.choices[0].text.strip()

        # Convert the date string to a datetime object
        date_obj = datetime.strptime(date_str, "%Y-%m-%d")
        return {
            "year": str(date_obj.year),
            "month": str(date_obj.month),
            "day": str(date_obj.day)
        }
    except Exception as e:
        print(f"Error parsing date with LLM: {e}")
        return None

def parse_relative_dates(date_text):
    today = datetime.today()

    if re.search(r"พรุ่งนี้", date_text):
        return today + timedelta(days=1)
    elif re.search(r"มะรืน", date_text):
        return today + timedelta(days=2)
    elif re.search(r"เมื่อวาน", date_text):
        return today - timedelta(days=1)
    elif re.search(r"ปีที่แล้ว", date_text):
        return today.replace(year=today.year - 1)
    elif re.search(r"สิ้นเดือนนี้", date_text):
        next_month = today.replace(day=28) + timedelta(days=4)
        return next_month - timedelta(days=next_month.day)
    elif re.search(r"ต้นเดือนหน้า", date_text):
        return (today.replace(day=28) + timedelta(days=4)).replace(day=1)
    elif re.search(r"สิ้นปีนี้", date_text):
        return today.replace(month=12, day=31)
    return None

@app.route('/parse-date', methods=['POST'])
def parse_date():
    data = request.json
    date_text = data.get('date', '')

    if not date_text:
        return jsonify({"error": "Missing date input"}), 400

    # Try to parse relative dates first
    relative_date = parse_relative_dates(date_text)
    if relative_date:
        return jsonify({
            "year": str(relative_date.year),
            "month": str(relative_date.month),
            "day": str(relative_date.day)
        }), 200

    # Use OpenAI to parse the date
    parsed_date = parse_date_with_llm(date_text)
    if parsed_date:
        return jsonify(parsed_date), 200
    else:
        return jsonify({"year": "-", "month": "-", "day": "-"}), 422

if __name__ == '__main__':
    app.run(debug=True)
