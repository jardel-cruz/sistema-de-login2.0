import passport from "passport";

async function loginMiddleware (req, res, next) {
    passport.authenticate(

        "local",
        {session: false},
        async (erro, usuario, info) => {
            
            if (erro) return res.status(400).json({ msg: erro });
            
            req.user = usuario
            return next()
        }


    )(req, res, next)
}

export { loginMiddleware };