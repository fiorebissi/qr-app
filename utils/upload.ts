import fs from 'fs'
import path from 'path'
const pathDocumentation = path.resolve(`./uploads/documentation`)

export const upload = async (file) => {
	try{
		console.log('file: ',file)
		const strFile = JSON.stringify(file.map(files => {
			return {
				name: files.name,
				type: files.type,
				size: files.size
			}
		}))
		console.log('strFile: ',strFile)
		const bodyParse = JSON.parse(strFile)
		var nameFile = bodyParse[0].name
		var typeFile = bodyParse[0].type
		console.log('nameFile: ',nameFile)
		console.log('typeFile: ',typeFile)
		const newDirectory = `${pathDocumentation}\\${nameFile}.${typeFile}`
		if ( !fs.existsSync( newDirectory ) ) {
			fs.mkdirSync( newDirectory )
		}
		// fs.writeFileSync(newDirectory,file)

	}catch(error){
		return error
	}
}