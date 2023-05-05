import path from 'path';
import fs from 'fs'
import { fileURLToPath } from 'url'

// 1. Импортировать необходимые для выполнения задания модули:
// fs + path

// В ES module не доступны переменные __dirname. Получаем их таким способом
const filename = (fileURLToPath(import.meta.url))
const dirname = path.dirname(filename)

//2. Создать новый **ReadStream** из файла **text.txt**. 
// Установил размер буфера 8 байт, чтобы продемострировать что загрузка идет порциями
const readableStream = 
    fs.createReadStream(path.join(dirname, 'text.txt'), { highWaterMark: 8 })

readableStream.on('error', error => console.log('Error', error.message))

// Собираем все Buffer в массив
let chunks = []
readableStream.on('data', chunk => {
    chunks.push(chunk)
})

//3. Направить поток чтения в стандартный поток вывода.  
readableStream.on('end', () => {
    // Собираем массив в  один Buffer
    const data = Buffer.concat(chunks)
    process.stdout.write(data)
})

