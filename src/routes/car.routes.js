const express = require('express');
const router = express.Router();

const {
    createCar,
    getcars,
    getCarById,
    updateCar,
    deleteCar,
} = require('../controllers/car.controller');

const {protect} = require('../middlewares/auth.middleware');

router.get('/',getcars);
router.get('/:id',getCarById);

router.post('/',protect,createCar);
router.put('/:id',protect,updateCar);
router.delete('/:id',deleteCar);

module.exports = router;