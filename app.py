from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello():
    return "Hello, World!", 200

if __name__ == '__main__':
    app.run()
