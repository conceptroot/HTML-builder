import {fileURLToPath} from 'url'
import path from 'path'
import fs from 'fs/promises'

const TARGET_PATH = 'project-dist'
const SOURCE_PATH = 'styles'
const CSS_FILE_NAME = 'bundle.css'
const CSS_EXTENTION = '.css'

const filename = fileURLToPath(import.meta.url)
let dirname = path.dirname(filename)
// For TESTS: dirname = path.join(dirname, 'test-files')
const targetPath = path.join(dirname, TARGET_PATH)
const sourcePath = path.join(dirname, SOURCE_PATH)



export default async function packCss(sourcePath, targetPath, bundleFileName) {
    // Read all styles in 'styles' folder
    let sourceFiles = await fs.readdir(sourcePath)
    sourceFiles = sourceFiles.filter(e => { return path.extname(e) === CSS_EXTENTION }) 

    // Load css files
    let cssArray = [] 
    for (let file of sourceFiles) {
        const style = await fs.readFile(path.join(sourcePath, file), 'utf-8')
        cssArray.push(style)
    }

    // Create bundle dir if not exist. Join bundle and write to file
    await fs.mkdir(targetPath, {recursive: true})
    const cssBundle = cssArray.join('\n')
    await fs.writeFile(path.join(targetPath, bundleFileName), cssBundle)
}

await packCss(sourcePath, targetPath, CSS_FILE_NAME) 


