'use strict'

const fs = require('fs');
const path = require('path');
const basename = path.basename(module.filename);

class Loader {

    static loadAll(app) {
        Loader.loadModels();
        Loader.loadRoutes(app);
    }

    static loadRoutes(app) {
        let baseDir = (__dirname + '/src/main/router');
        fs
            .readdirSync(path.join(baseDir))
            .filter(function (file) {
                return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
            })
            .forEach(function (file) {
                global.logger.info(`Loading router: ${file}`)
                let route = require((path.join(baseDir, file)));
                new route(app);
            });
    }

    static loadModels() {
        let baseDir = (__dirname + '/src/main/model');
        fs
            .readdirSync(baseDir)
            .filter(function (file) {
                return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
            })
            .forEach(function (file) {
                global.logger.info(`Loadding model: ${file}`);
                let model = require((path.join(baseDir, file)));
                new model();
            });
    }

}

module.exports = Loader;