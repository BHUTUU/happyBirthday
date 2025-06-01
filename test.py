import tkinter as tk
import threading
import speech_recognition as sr
def recognize_speech():
    while True:
        recognizer = sr.Recognizer()
        microphone = sr.Microphone()

        with microphone as source:
            print("Adjusting for ambient noise, please wait...")
            recognizer.adjust_for_ambient_noise(source)
            print("Listening...")
            audio = recognizer.listen(source)
        
        try:
            print("Recognizing speech...")
            text = recognizer.recognize_google(audio)
            # i want to implement worker method here to execute tasks.
            print(f"Recognized: {text}")
        except sr.UnknownValueError:
            print("Google Speech Recognition could not understand audio")
        except sr.RequestError as e:
            print(f"Could not request results from Google Speech Recognition service; {e}")

# Function to start the speech recognition thread
def start_speech_recognition():
    recognition_thread = threading.Thread(target=recognize_speech)
    recognition_thread.start()

# Function to move the icon
def move_icon():
    x, y = 10, 10
    while True:
        canvas.move(icon, x, y)
        canvas.update()
        if canvas.coords(icon)[2] >= canvas.winfo_width() or canvas.coords(icon)[0] <= 0:
            x = -x
        if canvas.coords(icon)[3] >= canvas.winfo_height() or canvas.coords(icon)[1] <= 0:
            y = -y
        canvas.after(50)

# Create the main application window
root = tk.Tk()
root.title("Voice Recognition and Moving Icon")

# Create a canvas for the icon
canvas = tk.Canvas(root, width=400, height=400)
canvas.pack()

# Create an icon (a simple rectangle for this example)
icon = canvas.create_rectangle(10, 10, 50, 50, fill="blue")

# Start the icon movement in a separate thread
icon_thread = threading.Thread(target=move_icon)
icon_thread.start()

# Start the speech recognition in a separate thread
start_speech_recognition()

# Start the Tkinter main loop
root.mainloop()
