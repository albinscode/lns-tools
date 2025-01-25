"use strict"
import * as fs from 'fs'
import { Command } from 'commander'

let globalJsonOutput = []

const PHASE_CULTURE = 'Culture,'
const PHASE_RACE = 'Race,'
const PHASE_CARRIERE = 'Carrière,'
const PHASE_CASTE = 'Caste,'

const SYNOPSIS = 'Synopsis'
const PHASES_CONSEILLEES = 'Phases conseillées'
const CARACTERISTIQUES = 'Caractéristiques'
const COMPETENCES = 'Compétences'
const LANGAGES = 'Langages'
const COMBAT = 'Combat'
const TRAITS = 'Traits'
const AVANTAGES = 'Avantages'
const MATERIEL = 'Matériel'
const NIVEAU_DE_VIE = 'Niveau de vie'

// we parse the file by paragraph i.e. when we have two carriage returns
function parseFileByParagraph(data) {

    // array of the given cast type
    let jsonObject = {}
    const lines = data.split(/\r?\n\r?\n/)
    let index = 0
    while(index < lines.length)  {
        const line = lines[index]
        index = index + 1
        let cleanLine = line.trim()
        console.log(`Processing ${index} - ${cleanLine} `)

        if (cleanLine.length > 0) {
            // we search the start of the phase
            if (!jsonObject['titre']) {
                jsonObject['titre'] = cleanLine
                // we build id from titre in snake case
                jsonObject['id'] = snake_case_string(cleanLine)
                continue
            }
            if (!jsonObject['soustitre']) {
                cleanLine = cleanCarriageReturns(cleanLine)
                jsonObject['soustitre'] = cleanLine
                continue
            }
            if (!jsonObject['synopsis']) {
                cleanLine = cleanHeader(cleanLine, SYNOPSIS)
                jsonObject['synopsis'] = cleanCarriageReturns(cleanLine)
                continue
            }
            if (!jsonObject['phases_conseillees']) {
                cleanLine = cleanHeader(cleanLine, PHASES_CONSEILLEES)
                jsonObject['phases_conseillees'] = cleanList(cleanLine)
                continue
            }
            if (!jsonObject['caracteristiques']) {
                cleanLine = cleanHeader(cleanLine, CARACTERISTIQUES)
                jsonObject['caracteristiques'] = cleanList(cleanLine)
                continue
            }
            if (!jsonObject['competences']) {
                cleanLine = cleanHeader(cleanLine, COMPETENCES)
                jsonObject['competences'] = cleanList(cleanLine)
                continue
            }
            if (!jsonObject['langages']) {
                cleanLine = cleanHeader(cleanLine, LANGAGES)
                jsonObject['langages'] = cleanList(cleanLine)
                continue
            }
            if (!jsonObject['combat']) {
                cleanLine = cleanHeader(cleanLine, COMBAT)
                jsonObject['combat'] = cleanList(cleanLine)
                continue
            }
            if (!jsonObject['traits']) {
                cleanLine = cleanHeader(cleanLine, TRAITS)
                jsonObject['traits'] = cleanList(cleanLine)
                continue
            }
            if (!jsonObject['avantages']) {
                cleanLine = cleanHeader(cleanLine, AVANTAGES)
                jsonObject['avantages'] = cleanList(cleanLine)
                continue
            }
            if (!jsonObject['materiel']) {
                cleanLine = cleanHeader(cleanLine, MATERIEL)
                cleanLine = cleanCarriageReturns(cleanLine)
                jsonObject['materiel'] = cleanLine
                continue
            }
            if (!jsonObject['niveau_de_vie']) {
                cleanLine = cleanLine.replace(`${NIVEAU_DE_VIE} : `, '')
                jsonObject['niveau_de_vie'] = cleanLine
                // we can now push phase
                console.log('Pushing phase')
                globalJsonOutput.push(jsonObject)
                jsonObject = {}
                // break
                continue
            }
        }
        else {
            console.log("Ignoring")
        }

    }
}

function snake_case_string(str) {
    return str && str.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
        .map(s => s.toLowerCase())
        .join('_');
}

// the aim is to fix file before processing to fit the awaited structure in
// input
function fixFile(data) {

    // remove all ^L caracters
    data = data.replace(/\x0C/g, '');
    // we replace any additionnal line between "header" and "content" check that lines
    data = data.replaceAll(`${SYNOPSIS}\n\n`, `${SYNOPSIS}\n`)
    data = data.replaceAll(`${PHASES_CONSEILLEES}\n\n`, `${PHASES_CONSEILLEES}\n`)
    data = data.replaceAll(`${CARACTERISTIQUES}\n\n`, `${CARACTERISTIQUES}\n`)
    data = data.replaceAll(`${COMPETENCES}\n\n`, `${COMPETENCES}\n`)
    data = data.replaceAll(`${LANGAGES}\n\n`, `${LANGAGES}\n`)
    data = data.replaceAll(`${COMBAT}\n\n`, `${COMBAT}\n`)
    data = data.replaceAll(`${TRAITS}\n\n`, `${TRAITS}\n`)
    data = data.replaceAll(`${AVANTAGES}\n\n`, `${AVANTAGES}\n`)
    data = data.replaceAll(`${MATERIEL}\n\n`, `${MATERIEL}\n`)

    // we force an empty line (even if already exists) between titre en soustitre
    data = data.replaceAll(`\n${PHASE_RACE}`, `\n\n${PHASE_RACE}\n`)
    data = data.replaceAll(`\n${PHASE_CULTURE}`, `\n\n${PHASE_CULTURE}\n`)
    data = data.replaceAll(`\n${PHASE_CASTE}`, `\n\n${PHASE_CASTE}\n`)
    data = data.replaceAll(`\n${PHASE_CARRIERE}`, `\n\n${PHASE_CARRIERE}\n`)

    // fix for thaumaturge
    data = data.replaceAll(`\nAdæmoniteur\n\n`, `<br/><u>Adæmoniteur</u>\n`)
    data = data.replaceAll(`\nArquémiste\n\n`, `<br/><u>Arquémiste</u>\n`)
    data = data.replaceAll(`\nBioscientifique\n\n`, `<br/><u>Bioscientifique</u>\n`)
    data = data.replaceAll(`\nChimériste\n\n`, `<br/><u>Chimériste</u>\n`)
    data = data.replaceAll(`\nInfiniticien\n\n`, `<br/><u>Infiniticien</u>\n`)
    data = data.replaceAll(`\nOcculteur\n\n`, `<br/><u>Occulteur</u>\n`)
    data = data.replaceAll(`\nMédecin\n\n`, `<br/><u>Médecin</u>\n`)
    data = data.replaceAll(`\nMécanurge\n\n`, `<br/><u>Mécanurge</u>\n`)
    data = data.replaceAll(`\nTechnologue\n\n`, `<br/><u>Technologue</u>\n`)
    data = data.replaceAll(`\nXénologue\n\n`, `<br/><u>Xénologue</u>\n`)
    data = data.replaceAll(`Compétences communes à tous :`, `<br/>Compétences communes à tous :`)


    // we put all "ndp" in upper case
    data = data.replaceAll('ndp', "NDP")

    // we remove page numbers if any (a standalone number in the line)
    data = data.replace(/^\d+$/gm, '')

    // hard fix for Charlatan (too much data)
    data = data.replace('et Séduction\n\nIlluminé : Histoire et Théologie', 'et Séduction\nIlluminé : Histoire et Théologie')
    data = data.replace('Combat\nTraits', 'Combat\nPB_IMPORT\n\nTraits')

    // hard fix for Explorateur (too much data)
    data = data.replace('Combat\nTraits', 'Combat\nPB_IMPORT\n\nTraits')

    // hard fix for "à paraitre"
    data = data.replace('Guide d’Athara, à paraître', '')
    data = data.replace('Guide du Thaumaturge, à paraître', '')

    // hard fix for langues of sauride
    data = data.replace('\nLangue dérivée de la langue originelle des Danseurs de guerre\n', 'Langue dérivée de la langue originelle des Danseurs de guerre')

    console.log(data);

    return data
}

function cleanHeader(headerLine, headerName) {
    const headerLineReplaced = headerLine.replace(`${headerName}\n`, '')
    // the header line is mandatory
    if (headerLineReplaced == headerLine) {
        throw new Error(`${headerName} not found!`)
    }
    return headerLineReplaced
}


function cleanCarriageReturns(line) {
    //  we replace all \n by spaces
    return line.replaceAll('\n', ' ')
}

// a list is a string with \n separators and can have bullets
function cleanList(listLine) {
    //  we replace all \n by spaces to only have the bullet separator
    listLine = cleanCarriageReturns(listLine)

    return listLine.split('• ')
                   .filter( line => line.trim().length !== 0)
                   .map(line => line.trim())
}

function generateJson(jsonOutputFileName, phaseCategory, ifConcat) {
    let json = {}
    if (fs.existsSync(jsonOutputFileName)) {
        console.log(`Fichier ${jsonOutputFileName} déjà existant on le réutilise`)
        const content = fs.readFileSync(jsonOutputFileName, { encoding: 'utf8', flag: 'r' })
        json = JSON.parse(content)
    }
    // we want to concat to existing phases
    if (ifConcat && json[phaseCategory]) {
        console.log('On ajoute les phases extraites dans le texte fourni')
        console.log('Attention, il peut y avoir des doublons !')
        json[phaseCategory] = json[phaseCategory].concat(globalJsonOutput)
    }
    else {
        console.log('On écrit les phases extraites dans le texte fourni')
        json[phaseCategory] = globalJsonOutput
    }
    // we're sorting by id

    json[phaseCategory] = json[phaseCategory].sort((p1, p2) => p1.id.localeCompare(p2.id))

    // reformat json string with a tab space of 2
    const jsonString = JSON.stringify(json, null, 2)
    fs.writeFileSync(jsonOutputFileName, jsonString, { encoding: 'utf8' })
}

function processArguments() {

    const program = new Command()

    program
        .name('lns-tools')
        .description('CLI to import text raw data extracted from PDF')
        .version('1.0.0');

    program.command('import')
        .description('Import phases text file')
        .argument('<textFile>', 'input text file with cultures, castes, etc...')
        .requiredOption('-o, --outputJsonFile <outputJsonFile>', 'fills the json file with given phase type')
        .requiredOption('-p, --phaseCategory <phaseCategory>', 'phase category to import: races, cultures, carrieres or castes')
        .option('-c, --concat', 'concat new phases to existing (otherwise, we override)')
        .action((textFile, options) => {
            importTextFileCommand(textFile, options.outputJsonFile, options.phaseCategory, options.concat ? true : false)
    });

    program.command('fix')
        .description('Fix the text file to be parsed properly')
        .argument('<textFile>', 'input text file with cultures, castes, etc...')
        .action((textFile, options) => {
            fixTextFileCommand(textFile)
        })
    program.parse();
}

async function importTextFileCommand(filename, outputJsonFile, phaseCategory, ifConcat) {

    fs.createReadStream(filename, {
        encoding: 'UTF-8'
    })
    .on('error', error => console.error(error))
    .on('data', data => parseFileByParagraph(fixFile(data)))
    .on('end', () => generateJson(outputJsonFile, phaseCategory, ifConcat))
}
async function fixTextFileCommand(filename) {

    fs.createReadStream(filename, {
        encoding: 'UTF-8'
    })
    .on('error', error => console.error(error))
    .on('data', data => fixFile(data))
    .on('end', () => console.log('Fix finished'))
}

processArguments()
