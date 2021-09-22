#!/usr/bin/env node
import { getDb, writeToDb } from './handleDb.js'
import color from 'colors-cli'

// Borde jobba mot en DB istället men var lazy och gör en write to file istället.
// Funkar ju som en DB  ändå ;P
const db = getDb()

const addToDb = (adress, lghNr) => {
  if (db[adress]) {
    db[adress].push(lghNr)
  } else {
    db[adress] = [lghNr]
  }
  writeToDb(db)
}

const checkIfAdded = (adress, lghNr) => {
  const adressNoSpace = adress.replace(/ /g, '')
  console.log('----')
  if (db[adressNoSpace] && db[adressNoSpace].includes(lghNr)) {
    console.log(color.blue(`STATUS: ${adress} ${lghNr} already got the message!! DONE`))
  } else {
    const processAddress = process.argv.slice(2)
    console.log(processAddress)
    console.log(color.green(`Status: ${adress} ${lghNr} have not heard the message`))
    console.log(color.green('I\'ll add them now to the DB!'))
    console.log(color.green(`**  ${processAddress.join(' ')}  **`))
    addToDb(adress, lghNr)
  }
}

const argv = [ ...process.argv ]
const adress = argv.slice(2, process.argv.length - 1).join('') // Can handle adress with spaces
const lghNr = Number(argv.pop())

console.log(adress)
console.log(lghNr)

if (adress === 'all') {
  console.log('alla adresser')
  console.log(JSON.stringify(db, null, 4))
} else if (!adress || !lghNr) {
  console.log('Add both adress and lghNr')
  console.log('Ex: dup kungsklippevägen19 1201')
} else {
  checkIfAdded(adress.toLowerCase(), lghNr)
}
