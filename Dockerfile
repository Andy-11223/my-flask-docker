# 1. Start from an official Python image
FROM python:3.11-slim

# 2. Set working directory inside container
WORKDIR /app

# 3. Copy dependencies first (better caching)
COPY requirements.txt .

# 4. Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# 5. Copy the rest of the app
COPY . .

# 6. Expose port (documentation only)
EXPOSE 5000

# 7. Command to run when container starts
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "app:app"]