## NEW PHASES
# JSON_FILE_OUTPUT=phases_new.json
JSON_FILE_OUTPUT=../public/config/phases.json
rm phases_new.json
pdftotext -f 1 -l 1 -x 300 -y 20 -W 270 -H 720 phases_new.pdf phases_race.txt
node import.js import phases_race.txt --phaseCategory races --outputJsonFile $JSON_FILE_OUTPUT --concat
# left part
pdftotext -f 2 -l 3 -x 20 -y 20 -W 270 -H 720 phases_new.pdf phases_new_culture.txt
# right part
pdftotext -f 2 -l 3 -x 300 -y 20 -W 270 -H 720 phases_new.pdf phases_culture2.txt
cat phases_new_culture.txt phases_new_culture2.txt > phases_new_culture_all.txt
node import.js import phases_new_culture_all.txt --phaseCategory cultures --outputJsonFile $JSON_FILE_OUTPUT --concat
# left part
pdftotext -f 4 -l 9 -x 20 -y 20 -W 270 -H 850 phases_new.pdf phases_new_carriere.txt
# right part
pdftotext -f 4 -l 9 -x 300 -y 20 -W 270 -H 850 phases_new.pdf phases_new_carriere2.txt
cat phases_new_carriere.txt phases_new_carriere2.txt > phases_new_carriere_all.txt
node import.js import phases_new_carriere_all.txt --phaseCategory carrieres --outputJsonFile $JSON_FILE_OUTPUT --concat

## THAUMATURGE
## there is a difference of 14 pages
## thaumaturge is on two pages
# left part
pdftotext -f 98 -l 98 -x 20 -y 20 -W 270 -H 720 phases_base.pdf phases_new_thaumaturge1.txt
# right part
pdftotext -f 98 -l 98 -x 300 -y 20 -W 270 -H 720 phases_base.pdf phases_new_thaumaturge2.txt
cat phases_new_thaumaturge1.txt phases_new_thaumaturge2.txt > phases_new_thaumaturge_all.txt
node import.js import phases_new_thaumaturge_all.txt --phaseCategory carrieres --outputJsonFile $JSON_FILE_OUTPUT --concat
