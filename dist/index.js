"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const public_ip_1 = __importDefault(require("public-ip"));
const mail_1 = __importDefault(require("@sendgrid/mail"));
const apiKey = process.env.SENDGRID_API_KEY;
const to = process.env.TO_EMAIL;
const from = process.env.FROM_EMAIL;
if (apiKey && to && from) {
    ;
    (() => __awaiter(void 0, void 0, void 0, function* () {
        const myIp = yield public_ip_1.default.v4();
        // Send email using Sendgrid
        mail_1.default.setApiKey(apiKey);
        const msg = {
            to: to,
            from: from,
            subject: 'Sending latest IP',
            text: `IP: ${myIp}`,
            html: `IP ${myIp}`
        };
        mail_1.default
            .send(msg)
            .then(() => {
            console.log(`Email sent with IP ${myIp}`);
        })
            .catch((error) => {
            console.error(error);
        });
    }))();
}
else {
    throw new Error('Missing variables');
}
