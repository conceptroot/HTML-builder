import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const FILE_NAME = 'epic-text-created-ever.txt'
const GREATING_TEXT = [
    'Привет друг, печатай умные мысли.', 
    'Чтобы закончить, набери exit или нажми ctrl+c'
].join('\n')
const FAREWELL_TEXT = `Пока, все мысли можно прочитать в файле ${FILE_NAME}`

const filename = (fileURLToPath(import.meta.url))
const dirname = path.dirname(filename)
const writeStream = fs.createWriteStream(
    path.join(dirname, FILE_NAME)
)

console.log(GREATING_TEXT)

process.stdin.on('data', (data) => {
    if (data.toString().trim() === "exit") {
        exitApp()
    }
    writeStream.write(data)
})

process.on('SIGINT', () => exitApp())


function exitApp() {
    console.log('\n', FAREWELL_TEXT)
    process.exit()
}

