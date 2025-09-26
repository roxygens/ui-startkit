import fs from 'fs-extra'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const src = path.resolve(__dirname, '../../../ui/src/index.css')
const dest = path.resolve(__dirname, '../../../cli/dist/index.css')

async function copyCSS() {
  try {
    await fs.copy(src, dest)
    console.log('✔ index.css copiado de UI para CLI/dist')
  } catch (err) {
    console.error('Erro ao copiar index.css:', err)
    process.exit(1)
  }
}

copyCSS()
