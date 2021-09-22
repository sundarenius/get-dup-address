#!/usr/bin/env node
import fs from 'fs';
import color from 'colors-cli';

export const getDb = () => {
  const content = fs.readFileSync("./db.json");
  return JSON.parse(JSON.parse(JSON.stringify(content.toString())))
}

export const writeToDb = (newData) => {
  fs.writeFile('db.json', JSON.stringify(newData, null, 2), err => {
    if (err) {
      console.error(err)
      return
    }
    console.log(color.green(`File updated succesfully`))
  })
}
