from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/')
def home():
    return render_template("index.html")

@app.route('/contact', methods=['POST'])
def contact():
    name = request.form['name']
    email = request.form['email']
    message = request.form['message']

    print(f"Message: {name} | {email} | {message}")

    return "Message Sent Successfully 🚀"

@app.route('/hire')          # ✅ registered before app runs
def hire():
    return render_template('hire.html')

if __name__ == "__main__":
    app.run(debug=True)
    