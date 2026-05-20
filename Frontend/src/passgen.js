
export const PassGen = (chars, allowence)=>{
    const ABC = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    const Smallabc = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
    const Num = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
    const Symb = ['!', '#', '$', '%', '&', '(', ')', '*', '+', '-', '.', ':', ';', '=', '?', '@', '[', ']', '^', '_', '{', '|', '}', '~']
    let allowed_division = Number(allowence.num) + Number(allowence.alpha) + Number(allowence.sensitivity) + Number(allowence.symbol)
    let division = Math.floor(chars / allowed_division)
    let initial_allotment = allowed_division * division
    let diff = chars - initial_allotment
    let initPass = "";

    const randomPick = (max)=>{
        return Math.floor(Math.random()  * max)
    }
    const suffleString = (pass) =>{
        let finalPass = "";
        pass = pass.split('')
        while(pass.length > 0){
            finalPass += pass.splice(Math.floor(Math.random() * pass.length), 1)
        }
        return finalPass
    }

    let assigned_itr = {
        nums : Number(allowence.num) * division,
        smallAplha : (division + diff),
        bigAlpha : Number(allowence.sensitivity) * division,
        symbols : Number(allowence.symbol) * division
    }

    for(let i = 0; i < assigned_itr.bigAlpha; i++){
        initPass+=ABC[randomPick(26)]
    }
    
    for(let i = 0; i < assigned_itr.smallAplha; i++){
        initPass+=Smallabc[randomPick(26)]
    }
    
    for(let i = 0; i < assigned_itr.symbols; i++){
        initPass+=Symb[randomPick(24)]
    }
    
    for(let i = 0; i < assigned_itr.nums; i++){
        initPass+=Num[randomPick(10)]
    }

    return suffleString(initPass)
}

