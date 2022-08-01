import fs from 'fs'

function safeDelete(fullPath: string) {
    try {
        if (!fullPath || !fs.existsSync(fullPath)) return
        fs.unlinkSync(fullPath)
        console.log('here')
    } catch (err: any) {
        //no need to display anything
    }

}

export default safeDelete 