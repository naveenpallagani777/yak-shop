const { Schema, model } = require('mongoose');

const yakSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        age: {
            type: Number,
            required: true,
            min: 0,
        },
        gender: {
            type: String,
            required: true,
            enum: ['Male', 'Female'],
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        toJSON: {
            virtuals: true,
            versionKey: false,
            transform: function (doc, ret) {
                delete ret.id;
                return ret;
            },
        },
        toObject: { virtuals: true },
    },
);

yakSchema.virtual('ageInDays').get(function () {
    return Math.round(this.age * 100);
});

const Yak = model('Yak', yakSchema);
module.exports = Yak;