# How to run
## Requirements:
- node (tested on 8.12.0)
- yarn 
## Running:
Clone this repository, then:
- yarn install
- yarn start

To run the full provenance system with Binary Ninja:
1)  Open Binary Ninja
2)  Select binary to analyze
3)  Start plugin in Binary Ninja 'Binja Start/Stop XML Server'
4)  Open Admin PowerShell window
5)  Navigate to Directory:  Binja-NodeJS 
6)  node .\fileupdate.js
7)  Open new Powershell window
8)  Navigate to Directory: RE_Provenance_System 
9)  yarn start

9)  Open Chrome

10) Navigate to: http://localhost:8080/

11)  Begin analyzing binary in Binary Ninja
