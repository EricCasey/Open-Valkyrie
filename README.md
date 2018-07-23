# The Open-Valkyrie Project

This project uses a ReactJS front end and expressJS in the back.

The React App sends formData requests to an express server which uses a computer vision library called OpenCV to map a player's location. On the client-side, small image-to-text packages are used to extract statistics from a game's HUD. All of which is stored, exported, and analyzed on the client side as well.

Keywords: 
```
opencv, node-opencv, opencv-server, react, redux, express, multer, fortnite
```

@Casey_Works NOTES [07/2018]:
> This is my first push. It currently uses a locally stored video. 
> Next steps is to get the video input working from a Twitch Stream.


## Running locally
```
git clone https://github.com/EricCasey/Open-Valkyrie.git
cd Open-Valkyrie
npm i
cd client
npm i
cd ..
cd opencv
npm i
cd ..
npm start
```

