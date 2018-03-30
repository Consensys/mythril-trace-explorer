# MythrilTraceExplorer

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.8.
It is intended to be a tool that can do symbolic debugging of smart contracts by using the `statespace` JSON files produced by [Mythril](https://github.com/ConsenSys/mythril)

## Preliminary Requirements
 Install [Mythril](https://github.com/ConsenSys/mythril)
```bash
$ pip3 install mythril
```
This will be used to produce the `statespace` JSON files. Eg:
```bash
$ myth -ij ./state.json -a 0x5c436ff914c458983414019195e0f4ecbef9e6dd --max-depth 8
```
Once you have the JSON dump, you can proceed to use this GUI to analyze it

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files. 

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.


## Usage
Please use Google Chrome.

Drag and drop the JSON file on the landing page of the Web Tool. The tool will validate the object to make sure if it is compatible, and will then allow you to save it to `localStorage` and take you to the main workspace

Click on any Node in the resulting graph, to show a debugging panel on the right hand side. You can `step forward` and `step backward` through all the instructions in the selceted node, and examine the state variables as you go. The graph is zoomable and pannable.

To load a new JSON file, click the `file` icon on the navbar
