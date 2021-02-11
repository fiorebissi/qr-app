"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const next_1 = __importDefault(require("next"));
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("./config"));
const port = config_1.default.port || 3000;
const dev = config_1.default.nodeEnv !== `production`;
const app = next_1.default({ dev });
const handle = app.getRequestHandler();
app.prepare().then(() => {
    const server = express_1.default();
    server.use(cors_1.default({
        origin: true,
        credentials: true
    }));
    server.all(`*`, (req, res) => {
        return handle(req, res);
    });
    server.listen(port, () => {
        console.log(`> Ready on http://localhost:${port}`);
    });
});
