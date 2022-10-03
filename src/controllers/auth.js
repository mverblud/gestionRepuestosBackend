import ApiAuth from '../api/auth.js';

export default class ControllerAuth {

    constructor() {
        this.apiAuth = new ApiAuth();
    }

    registrarUsuario = async (req, res) => {
        try {
            const { nombre, password, email, telefono } = req.body;
            const usuario = await this.apiAuth.registrarUsuario(nombre, password, email, telefono);
            res.json(usuario);

        } catch (error) {
            console.log('error registrarUsuario', error);
        }
    };

    confirmarUsuario = async (req, res) => {
        try {
            const { token } = req.params;
            const usuario = await this.apiAuth.confirmarUsuario(token);
            if (usuario.status !== 201) {
                const { msg, status } = usuario;
                res.status(status).json({ msg })
            } else {
                const msg = usuario.msg
                res.status(201).json({ msg });
            }

        } catch (error) {
            console.log('error confirmarUsuario', error);
        }
    };

    autenticar = async (req, res) => {
        try {
            const { email, password } = req.body;
            const usuario = await this.apiAuth.autenticar(email, password);
            if (usuario.status !== 200) {
                const { msg, status } = usuario;
                res.status(status).json({ msg })
            } else {
                const msg = usuario.msg
                res.status(200).json({ msg });
            }
        } catch (error) {
            console.log('error autenticar', error);
        }
    };

    olvidePassword = async (req, res) => {
        try {
            const { email } = req.body;
            const usuario = await this.apiAuth.olvidePassword(email);
            if (usuario.status !== 200) {
                const { msg, status } = usuario;
                res.status(status).json({ msg })
            } else {
                const msg = usuario.msg
                res.status(200).json({ msg });
            }
        } catch (error) {
            console.log('error olvidePassword', error);
        }
    };

    comprobarPassword = async (req, res) => {
        try {
            const { token } = req.params;
            const usuario = await this.apiAuth.comprobarPassword(token);
            if (usuario.status !== 200) {
                const { msg, status } = usuario;
                res.status(status).json({ msg })
            } else {
                const msg = usuario.msg
                res.status(200).json({ msg });
            }
        } catch (error) {
            console.log('error comprobarPassword', error);
        }
    };

    nuevoPassword = async (req, res) => {
        try {
            const { token } = req.params;
            const { password } = req.body;
            const usuario = await this.apiAuth.nuevoPassword(token, password);
            if (usuario.status !== 200) {
                const { msg, status } = usuario;
                res.status(status).json({ msg })
            } else {
                const msg = usuario.msg
                res.status(200).json({ msg });
            }
        } catch (error) {
            console.log('error nuevoPassword', error);
        }
    };

}