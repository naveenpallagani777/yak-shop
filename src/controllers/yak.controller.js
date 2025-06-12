const Yak = require('../models/yak.model');
const APIFeatures = require('../utils/apiFeatures');
const APPError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const SimulateHerd = require('../utils/simulateHerd');

exports.stockYak = catchAsync(async (req, res, next) => {
    const days = req.params.days;
    if (!days || isNaN(days) || days <= 0) {
        return next(new APPError('Invalid or missing days parameter', 400));
    }
    const yaks = await Yak.find();
    if (yaks.length === 0) {
        return next(new APPError('No yaks found in the database', 404));
    }
    const simulateHerd = new SimulateHerd(yaks);
    const stock = simulateHerd.getStock(parseInt(days, 10));

    res.status(200).json({
        status: 'success',
        ...stock,
    });
});

exports.herdYak = catchAsync(async (req, res, next) => {
    const days = req.params.days;
    if (!days || isNaN(days) || days <= 0) {
        return next(new APPError('Invalid or missing days parameter', 400));
    }
    const yaks = await Yak.find();
    if (yaks.length === 0) {
        return next(new APPError('No yaks found in the database', 404));
    }
    const simulateHerd = new SimulateHerd(yaks);
    const herd = simulateHerd.getHerd(parseInt(days, 10));

    res.status(200).json({
        status: 'success',
        ...herd,

    });
});

exports.getALLYaks = catchAsync(async (req, res, next) => {
    const yaks = new APIFeatures(Yak.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();

    const totalDocs = await yaks.query;
    
    res.status(200).json({
        status: 'success',
        results: totalDocs.length,
        data: {
            yaks: totalDocs
        }
    });
});

exports.getYakById = catchAsync(async (req, res, next) => {
    const yakId = req.params.id;
    const yak = await Yak.findById(yakId);
    if (!yak) {
        return next(new APPError(`Yak with ID ${yakId} not found`, 404));
    }
    
    res.status(200).json({
        status: 'success',
        data: {
            yak
        }
    });
});

exports.createYak = catchAsync(async (req, res, next) => {
    const { name, age, gender } = req.body;
    if (!name || !age || !gender) {
        return next(new APPError('Name, age, and gerder are required', 400));
    }
    const newYak = await Yak.create(req.body);
    res.status(201).json({
        status: 'success',
        data: {
            yak: newYak
        }
    });
});

exports.updateYak = catchAsync(async (req, res, next) => {
    const yakId = req.params.id;
    const updateYak = await Yak.findByIdAndUpdate(
        yakId,
        req.body,
        {
            new: true,
            runValidators: true
        }
    );
    if (!updateYak) {
        return next(new APPError(`Yak with ID ${yakId} not found`, 404));
    }
    res.status(200).json({
        status: 'success',
        data: {
            yak: updateYak
        }
    });
});

exports.deleteYak = catchAsync(async (req, res, next) => {
    const yakId = req.params.id;
    const yak = await Yak.findByIdAndDelete(yakId);
    if (!yak) {
        return next(new APPError(`Yak with ID ${yakId} not found`, 404));
    }
    res.status(204).json({
        status: 'success',
        data: null
    });
});