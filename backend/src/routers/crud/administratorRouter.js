const router = require('express').Router();
const bcrypt = require('bcrypt');
const Administrator = require('../../models/administratorModel.js');

router.get('/:id?', async (req, res, next) => {
    const requestedId = req.params.id;
    let dbResult;

    try {
        if (requestedId)
            [dbResult] = await Administrator.getById(requestedId);
        else
            dbResult = await Administrator.getAll();
    }
    catch (error) {
        error.name = 'DatabaseError';
        return next(error);
    }

    res.json(dbResult[0]);
});

router.post('/', async (req, res, next) => {
    const passwordHash = await bcrypt.hash(req.body.passwordHash, 10);
    const administrator = {login: req.body.login, passwordHash};

    let dbResult;

    try {
        [dbResult] = await Administrator.add(administrator);
    }
    catch (error) {
        error.name = 'DatabaseError';
        return next(error);
    }

    res.json(dbResult);
});

router.put('/:id', async (req, res, next) => {
    const login = req.body.login;
    const password = req.body.passwordHash;
    let administrator = {};
    const passwordHash = password ? await bcrypt.hash(password, 10) : undefined;

    if (login)
        administrator.login = login;
    if (passwordHash)
        administrator.passwordHash = passwordHash;

    let dbResult;

    try {
        [dbResult] = await Administrator.update(req.params.id, administrator);
    }
    catch (error) {
        error.name = 'DatabaseError';
        return next(error);
    }

    res.json(dbResult);
});

router.delete('/:id', async (req, res, next) => {
    let dbResult;

    try {
        [dbResult] = await Administrator.delete(req.params.id);
    }
    catch (error) {
        error.name = 'DatabaseError';
        return next(error);
    }

    res.json(dbResult);
});

module.exports = router;
