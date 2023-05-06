import {fileURLToPath} from 'url'
import path from  'path'
import fs from 'fs/promises'

const taskDirname = path.dirname(fileURLToPath(import.meta.url))

const sourceHtmlPath = path.join(taskDirname, 'template.html')
const sourceComponentPath = path.join(taskDirname, 'components') 

const bundlePath = path.join(taskDirname, 'project-dist')
const bundleHtmlPath = path.join(bundlePath, 'index.html')
const bundleCssPath = path.join(bundlePath, 'style.css')
const bundleAssetsPath = path.join(bundlePath, 'assets')


try {
    // prepare bundl directory
    await prepareBundlDirectory()
    // build html
    await buildHTML()
    // build css
    // copy assets
} catch (e) {
    console.log('ОШИБКА')
    console.log(e)
    process.exit()
}

async function prepareBundlDirectory() {
    await fs.mkdir(bundlePath, {recursive: true})
}

async function buildHTML() {
    const regexp = /{{\s*[\w.]+\s*}}/g
    // загружаем шаблон
    const template = await fs.readFile(sourceHtmlPath, 'utf-8')
    // получить список компонетов которые нужно подменить
    const componentsNames = getComponentsNames(template)
    // загружаем компоненты
    let components = await loadComponents(componentsNames) 
    // подменяем в шаблоне компоненты
    let result = injectTemplate(template, components)
    // записываем в бандл html файл
    await fs.writeFile(bundleHtmlPath, result)

    function getComponentsNames(template) {
    // Получить список компонентов, которые нужно подменить
        let matches = []
        let match
        while ((match = regexp.exec(template))) {
            matches.push(match[0])
        }
        matches = matches.map(v => v.slice(2, -2))
        return matches
    }

    async function loadComponents(componentNames) {
    // загружаем компоненты
        let components = {}
        for (let componentName of componentNames) {
            const componentPath = path.join(sourceComponentPath,  componentName+'.html')
            try {
                const component = await fs.readFile(componentPath, 'utf-8')
                components[componentName] = component
            } catch (e) {
                trow `Component file ${componentPath} not found`
            }
        }
        return components
    }

    function injectTemplate(template, components) {
        const result =  template.replace(regexp, (v) => {
            const key = v.slice(2, -2).trim()
            const replacement = getReplacementHtml(key)
            //console.log(replacement)
            return replacement
        })
        function getReplacementHtml(componentName) {
            return components[componentName]
        }
        return result
    }
}


function buildCSS() {
}

function copyAssets() {
}


