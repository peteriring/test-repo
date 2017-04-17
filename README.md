# Demo application (Peter Iring)

## features

- simple demo chat
- carousel gallery
- settings page 

## demo

You may see a live demo by clicking [here](https://peteriring.github.io/test-repo/).

#### NOTE:

Because the resource urls were given with protocol `HTTP`, and as the github site for pages states:
```
HTTPS enforcement is required for GitHub Pages sites created after June 15, 2016 and using a github.io domain.
If you created your GitHub Pages site before June 15, 2016, you can manually enable HTTPS enforcement.
HTTPS is not supported for GitHub Pages using custom domains.
```

For the demo to run smoothly:
- please make sure to allow "mixed-content" loading in your browser
- in case you are using FireFox, please enable websockets at `about:config`

## run

use `npm start` to run the application in development mode

use `npm build` to build the application for deployment


Optionally you may define a `.env` file in the root folder, of pass environment variables according to the following options
```
NODE_ENV=local
VIRTUAL_HOST=https://peteriring.github.io/test-repo/
SOCKET_IO_URL=http://185.13.90.140:8081/
IMAGE_URL=http://lorempixel.com/
```

## build

You may see the built files by clicking [here](https://github.com/peteriring/test-repo/tree/gh-pages).
