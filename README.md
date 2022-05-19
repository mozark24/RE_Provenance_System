# How to run
## Requirements:
Three SensorRE software packages are required:
- https://github.com/mozark24/RE_Provenance_System
- https://github.com/mozark24/Binja-Plugin-Autocollect
- https://github.com/mozark24/SensorRE_Server
- node (tested on 8.12.0)
- yarn 

## Running:
Clone this repository, then:
- yarn install
- yarn start

To run the full provenance system with Binary Ninja:
1)  Open Binary Ninja
2)  Select binary to analyze
3)  Install the Binary Ninja Plugin at: https://github.com/mozark24/Binja-Plugin-Autocollect
4)  Start plugin in Binary Ninja > 'Binja Start/Stop XML Server'
5)  Modify autocollect.py for your environment (fullpath)
6)  Open Admin PowerShell window
7)  Install the SensorRE server at: https://github.com/mozark24/SensorRE_Server
8)  Navigate to the directory SensorRE server was installed:  Binja-NodeJS 
9)  In an Admin Powershell window run the command: node .\fileupdate.js
10)  Open new Powershell window
11)  Navigate to the directory: RE_Provenance_System 
12)  yarn start
13)  Open Browswer (Chrome tested)
14)  Navigate to: http://localhost:8080/
15)  Begin analyzing binary in Binary Ninja
