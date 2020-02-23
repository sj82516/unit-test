
function UserController({
    userManager
}){
    this.handleUserLogin = async function(req, res){
        const {
            account, 
            password
        } = req.body;

        try {
            const user = await userManager.findUser({
                account, 
                password
            })

            res.json(200, {
                user
            })
        }catch(error){
            if(error === 'ParamMissing'){
                return res.json(400, {
                    message: "ParamMissing"
                })
            }
            if(error === 'InvalidAccount'){
                return res.json(400, {
                    message: "InvalidAccount"
                })
            }
            if(error === 'UserNotFound'){
                return res.json(404, {
                    message: "UserNotFound"
                })
            }

            return res.json(500, {
                message: "DBError"
            })
        }
    }
}

module.exports = UserController;