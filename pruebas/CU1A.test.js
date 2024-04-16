const { post_login } = require('../controllers/login.controller');
const Usuario = require('../models/usuario.model'); 

describe('Pruebas de inicio de sesión', () => {
    let req, res, next;

    beforeEach(() => {
        req = { body: {} };
        res = {
            statusCode: 200,
            data: {},
            status(code) {
                this.statusCode = code;
                return this;
            },
            send(data) {
                this.data = data;
                return this;
            },
            redirect(url) {
                this.redirectUrl = url;
                return this;
            }
        };
        next = jest.fn();
    });

    it('Debería iniciar sesión con credenciales válidas', async () => {
        req.body.username = 'Julian2';
        req.body.password = '4dm1n';

        Usuario.fetchUser = jest.fn().mockResolvedValueOnce([[{ username: 'Julian2', Contrasena: '4dm1n' }], []]);

        await post_login(req, res, next);

        expect(res.statusCode).toEqual(200);
        expect(res.redirectUrl).toEqual('/homepage');
        expect(req.session.isLoggedIn).toBe(true);
    });

    it('Debería mostrar un mensaje de error con credenciales inválidas', async () => {
        req.body.username = 'lulu';
        req.body.password = '47845';

        Usuario.fetchUser = jest.fn().mockResolvedValueOnce([[], []]);

        await post_login(req, res, next);

        expect(res.statusCode).toEqual(401);
        expect(res.redirectUrl).toEqual('/login');
        expect(req.session.error).toEqual('El usuario y/o contraseña son incorrectos');
    });
});
