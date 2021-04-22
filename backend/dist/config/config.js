"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORT = exports.mongoURL = void 0;
function mongoURL() {
    return "mongodb://localhost/pho-gallery-db";
}
exports.mongoURL = mongoURL;
;
function PORT() {
    return process.env.PORT || 3000;
}
exports.PORT = PORT;
;
