import { fileURLToPath } from "url"
import path from 'path'
import fs from 'fs/promises'

const SOURCE_DIR = 'files'
const TARGET_DIR = 'files-copy'
const currentFilename = fileURLToPath(import.meta.url)
const currentDirname = path.dirname(currentFilename)

const sourcePath = path.join(currentDirname, SOURCE_DIR)
const targetPath = path.join(currentDirname, TARGET_DIR)

try {
    // Create (if not exist) target dir
    await fs.mkdir(targetPath, {recursive: true})
    // Read source path
    const sourceFiles = await fs.readdir(sourcePath)
    console.log('Source path contains:', sourceFiles)
    // Copy files
    await copyFiles(sourcePath, targetPath, sourceFiles)

}
catch (e){
    console.log('ОШИБКА')
    throw(e)
}

async function copyFiles(sourcePath, targetPath, files) {
    for (let file of files) {
        const source = path.join(sourcePath, file)
        const target = path.join(targetPath, file)
        fs.copyFile(source, target)
    }
}




