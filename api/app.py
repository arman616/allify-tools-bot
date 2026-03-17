from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route("/")
def home():
    return "API running"

@app.route("/download", methods=["POST"])
def download():
    return jsonify({"status": "working"})
    
app.run(host="0.0.0.0", port=10000)
