import fastify from "fastify";
import fastifyExpress from "fastify-express";
import express from "express";
// import { router } from '@/src/infrastructures/routers'
const server = fastify();
export const router = express.Router();
router.get('/ping', (req, res) => {
    console.log('get ping');
    const jsonObj = {
        a: 'test',
        n: null
    };
    res.send(jsonObj);
});
async function build() {
    await server.register(fastifyExpress).after(() => { server.use(router); });
    return server;
}
;
build()
    .then(server => server.listen(3030, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
}))
    .catch(console.log);
