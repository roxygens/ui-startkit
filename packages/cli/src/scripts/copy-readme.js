import fs from 'fs-extra'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const src = path.resolve(__dirname, '../../../../README.md')
const dest = path.resolve(__dirname, '../../../cli/dist/README.md')

const srcPt = path.resolve(__dirname, '../../../../README.pt-br.md')
const destPt = path.resolve(__dirname, '../../../cli/dist/README.pt-br.md')

async function copyREADME() {
  try {
    await fs.copy(src, dest)
    await fs.copy(srcPt, destPt)
    console.log('✔ README copiado para CLI/dist')
  } catch (err) {
    console.error('Erro ao copiar README:', err)
    process.exit(1)
  }
}

copyREADME()
