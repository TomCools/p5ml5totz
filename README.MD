# What is this?

This is a test project to see if I could use my plushy and a camera (and some machine learning) to move a virtual Totoro.
It worked out nicely using:

- p5.js for the physics and DOM manipulation
- Teachable Machine for training the machine learning model
- ml5.js for using the model to classify images into "Open" or "Closed".

I have blogged about this project on my website:

- [A plushy controlled game (Part 1): Journey into p5.js](https://tomcools.be/post/feb-2020-plushy-game-1/)
- [A plushy controlled game (Part 2): Learning to fly with ml5.js and the Teachable Machine](https://tomcools.be/post/feb-2020-plushy-game-2/)

# Result

![](result/totz.gif)

# Change the model

It is possible to train your own model with the Teachable Machine and use this code.
Train an "Image Project" and either download the model or upload it to Google Cloud.
All you have to change is the **imageModelURL** variable in **main.js**.

The code will only work if you train a model to detect two classes:
- "Open"
- "Close"

You can use different names but then you'd need to adjust the code accordingly.

**If you make your own implementation with a custom model, please share it with me! Very curious to see what you come up with!**

# Resource list

- Totoro image from [NicePNG](https://www.nicepng.com/maxp/u2q8y3a9e6t4o0e6/)
- Background image from [Craftpix](https://craftpix.net/)

