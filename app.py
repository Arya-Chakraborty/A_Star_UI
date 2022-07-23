import json
from flask import Flask, request, render_template, redirect
from a_star import *

app = Flask(__name__)

@app.route("/", methods=["GET", "POST"])
def viewPage():
    if request.method == "GET":
        return render_template("index.html")
    maze = request.form["maze"]
    try:
        solution = a_star(maze)
        return json.dumps({"state": True, "path":solution})
    except:
        state = False
        return json.dumps({"state":False})

