import passport from "passport";

async function loginMiddleware (req, res, next) {
    passport.authenticate(

        "local",
        { session: false },
        async (erro, usuario, info) => {
            
            if (erro) return res.status(400).json({ msg: erro });
            if(!usuario) return res.status(400).json({ msg: "Erro de login" })
            
            req.user = usuario
            return next()
        }


    )(req, res, next)
};

async function accessMiddleware (req, res, next) {
    try {
        
        passport.authenticate(

            "bearer",
            { session: false },
            (erro, usuario, info) => {
                if (erro) return res.status(400).json({ msg: erro }); 
                if(!usuario) return res.status(400).json({ msg: "Erro de login" })

                req.user = usuario;
                req.accessToken = info.token;
                req.autenticado = true;
                return next();
            }
    
        )(req, res, next)
        
    } catch (error) {
        return res.status(400).json(error);
    }
}

export { loginMiddleware, accessMiddleware };