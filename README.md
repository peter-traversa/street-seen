![screen shot 2018-11-15 at 8 43 27 pm](https://user-images.githubusercontent.com/19625309/48592782-00666e80-e918-11e8-9c19-9e5659fd44c8.png)

# Street-Seen
Street-seen is an image aggregator for photographers and street art aficionados. Photographs of street sculpture, graffiti, posters, etc. can be added to a map and viewed by anyone using the application. A user account is only needed to add art to the application.
## Motivation
Watching city blocks evolve made me interested in cataloging the changes and how and when they happen. Street art has always been one of my barometers of an areas's politics, style, and general aesthetic.
## Technology Used
React.js, Redux, Open Street Map, react-leaflet, Semantic UI, Auth with JWT
## Features
* Map tiles from Stamen design
* Custom map markers for existing street art locations and to add photographs to the map
* Detail pages for artwork with username, location, and identifying tags
* AWS S3 image hosting
* Login modal for login possibility on any page of the application
* Filter for artwork drawer on detail page to sort all artwork by identifying tag
## Setup
1. First, ensure that you've cloned down the [Street-Seen backend](https://github.com/peter-traversa/street-seen-api) and followed the setup instructions there.
2. Clone down this repo and and make sure you have both node and npm installed globally on your machine.
3. Run npm i && npm start from the main client directory.
4. Select "Yes" when prompted to run the client on a different port.
## Contribute
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.
## License
[MIT](https://choosealicense.com/licenses/mit/)
