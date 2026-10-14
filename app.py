from flask import Flask, render_template, request, redirect, url_for, flash

app = Flask(__name__)
app.secret_key = 'dev-secret-change-in-production'

@app.route('/')
def index():
    return render_template('index.html', name='Docker Beginner')

@app.route('/features')
def features():
    return render_template('features.html')

@app.route('/deploy')
def deploy():
    return render_template('deploy.html')

@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        # Process the form data
        name = request.form.get('name', '').strip()
        message = request.form.get('message', '').strip()
        if name and message:
            flash(f'Thank you {name}, your message has been received!', 'success')
        else:
            flash('Please fill out both fields.', 'error')
        return redirect(url_for('contact'))
    return render_template('contact.html')

@app.route('/about')
def about():
    return render_template('about.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)