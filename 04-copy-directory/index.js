import { fileURLToPath } from "url"
import path from 'path'
import fs from 'fs/promises'

const SOURCE_DIR = 'files'
const TARGET_DIR = 'files-copy'
const currentFilename = fileURLToPath(import.meta.url)
const currentDirname = path.dirname(currentFilename)

const sourcePath = path.join(currentDirname, SOURCE_DIR)
const targetPath = path.join(currentDirname, TARGET_DIR)


await processDir(sourcePath, targetPath)


export default async function processDir(sourceDir, targetDir) {
    // Сначала создаем директорию targetDir куда будут записываться файлы
    await fs.mkdir(targetDir, {recursive: true})
    // Читаем всю директорию sourceDir, получаем список файлов
    const sourceFilesAndDirs = await fs.readdir(sourceDir, {withFileTypes: true})
    // Итерируемся по списку fileAndDirs:
    for (let item of  sourceFilesAndDirs) {
        if (item.isFile()) {
            // Если файл, то копируем файл в нужную директорию targetDir
            console.log('ya fail:', item.name)
            const sourceFileName = path.join(sourceDir, item.name)
            const targetFileName = path.join(targetDir, item.name)
            await fs.copyFile(sourceFileName, targetFileName)
        } 
        if (item.isDirectory()) {
            // Если директория, то:
            // newDir = создаем эту директорию используя targetDir + имядиректории
            const newTargetDir = path.join(targetDir, item.name)
            const newSourceDir = path.join(sourceDir, item.name)
            await fs.mkdir(newTargetDir, {recursive: true})
            // Вызываем функцию processDir(fileAndDirs, targetDir+fileAndDirs)
            await processDir(newSourceDir, newTargetDir)
        }
    }
}

