#!/usr/bin/env node
import { getDb, writeToDb } from './handleDb.js'

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
    console.log(`STATUS: ${adress} ${lghNr} already got the message!! DONE`)
  } else {
    console.log(`Status: ${adress} ${lghNr} have not heard the message`)
    console.log('I\'ll add them now to the DB!')
    addToDb(adress, lghNr)
  }
}

const adress = process.argv.slice(2, process.argv.length - 1).join('') // Can handle adress with spaces
const lghNr = Number(process.argv.pop())

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
