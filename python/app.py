from . import createApp

app = createApp()
def main():
    app.run("127.0.0.1", port=5885)

if __name__ == "__main__":
    main()
