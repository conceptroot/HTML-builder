// 1. Импорт всех требуемых модулей
import path from 'path'
import fs from 'fs/promises'
import {fileURLToPath} from 'url'


const DIR_NAME = 'secret-folder'

const filename = (fileURLToPath(import.meta.url))
const current_dirname = path.dirname(filename)
const target_dirname = path.join(current_dirname, DIR_NAME)

try {
    // 2. Чтение содержимого папки secret-folder
    const dirContent = await fs.readdir(target_dirname, {withFileTypes: true})
    // 3. Получение данных о каждом объекте который содержит папка secret-folder
    for (let file of dirContent) {
        await printFileInfo(file)
    }
} catch (e) {
    console.log('Дирректория не найдена', path.join(current_dirname, DIR_NAME))
    console.log(e)
    process.exit()
}


async function printFileInfo(dirent) {
    // 4. Проверка объекта на то, что он является файлом
    const isFile = dirent.isFile() ? 'файл' : 'не файл'

    const file = path.join(target_dirname, dirent.name)
    const filePath = path.parse(file)
    const name = filePath.name
    const extention = filePath.ext
    const fileProps = await fs.stat(file)
    const size = (100*fileProps.size/1024)/100

    // 5. Вывод данных о файле в консоль
    console.log(`${name} - ${extention.slice(1)} - ${size}kB ➡ ${isFile}`)
}

