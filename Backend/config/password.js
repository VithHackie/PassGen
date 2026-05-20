const bcrypt = require('bcrypt')

const genPassword = async (pass)=>{
    try{
        const hash = await bcrypt.hash(pass, 10)
        return hash
    }catch(err){
        console.error(err)
    }
}

const verifyPassword = async (pass1, pass2)=>{
    try{
        const hash = await bcrypt.hash(pass1, 10)
        const match = await bcrypt.compare(hash, pass2)
        return match
    }catch(err){
        console.error(err)
    }
}
module.exports = {
    genPassword,
    verifyPassword
}