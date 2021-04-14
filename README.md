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
2)  Enable Plugin 'Binja Start/Stop XML Server'

3)  Open Admin PowerShell window
3a) Navigate to Directory:  Binja-NodeJS 
3b) node .\fileupdate.js

4)  Open Powershell window
4a) Navigate to Directory: RE_Provenance_System 
4b) yarn start

5)  Open Chrome
5a) Navigate to: http://localhost:8080/

6)  Begin analyzing binary in Binary Ninja
