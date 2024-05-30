"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var Books = [
    'ge', 'exo', 'lev', 'deu', 'josh', 'jdgs', 'ruth',
    '1sm', '2sm', '1ki', '2ki', '1chr', '2chr', 'ezra',
    'neh', 'est', 'job', 'psa', 'prv', 'eccl', 'ssol',
    'isa', 'jer', 'lam', 'eze', 'dan', ' hos', 'joel',
    'amos', 'obad', 'jonah', 'mic', 'nahum', 'hab', 'zeb',
    'hag', 'zep', 'mal', 'mat', 'mark', 'luke', 'john',
    'acts', 'rom', '1cor', '2cor', 'gal', 'eph', 'phi',
    'col', '1th', '2th', '1tim', '2tim', 'titus', 'phnm',
    'heb', 'jas', '1pet', '2pet', '1jn', '2jn', '3jn', 'jude', 'rev'
];
var bibleVerseSchema = new mongoose_1.default.Schema({
    language: {
        type: String,
        required: true,
        enum: Books
    },
    startChapter: {
        type: Number,
        required: true
    },
    endChapter: {
        type: Number,
        required: true
    },
    startVerse: {
        type: Number,
        required: true
    },
    endVerse: {
        type: Number,
        required: true
    },
}, {
    _id: false // Prevent creation of an _id field for this subdocument
});
var postSchema = new mongoose_1.default.Schema({
    user: {
        required: true,
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        required: true,
        type: String
    },
    bibleVerse: {
        required: true,
        type: bibleVerseSchema
    },
    content: {
        required: true,
        type: String
    },
    comments: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
}, {
    timestamps: true
});
exports.default = mongoose_1.default.model('Post', postSchema);
