'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const _ = require('lodash')
const basename = path.basename(__filename);
const { dbConfig} = require('../../configs');
const db = {};

let sequelize, sequelizeBMS, sequelizeMKTPRICE;
const handleChildrenAfterFindHook = async (instances, options, level = 0) => {
    if (!instances) return Promise.resolve();

    if (!_.isEmpty(instances) && !_.isNull(instances) && instances[0] != null && instances){
        if (Array.isArray(instances)) {
            return Promise.all(
                instances.map((instance) => {
                    const { options: instanceOptions } = instance.constructor;
                    return handleChildrenAfterFindHook(
                        instance,
                        instanceOptions,
                        level
                    );
                })
            );
        }

        const instance = instances;
        const { constructor } = instance;

        /**
         * Root model will have already run their "afterFind" hook.
         * Only run children "afterFind" hooks.
         */
        if (level >= 1) {
            await constructor.runHooks('afterFind', instance, options);
        }

        const { associations } = constructor;
        const associatedNames = Object.keys(instance).filter((attribute) =>
            Object.keys(associations).includes(attribute)
        );

        if (associatedNames.length) {
            const childInstances = associatedNames.map((name) => instance[name]);
            return handleChildrenAfterFindHook(childInstances, options, level + 1);
        }

        return Promise.resolve();
    }
};

if (dbConfig.use_env_variable) {
    sequelize = new Sequelize(process.env[dbConfig.use_env_variable], dbConfig);
    sequelize.addHook('afterFind', handleChildrenAfterFindHook);
} else {
    sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig, );
  sequelize.addHook('afterFind', handleChildrenAfterFindHook);
}

(async () => {
    try {
        await sequelize.authenticate();

    }
    catch (error) {
        console.error('Unable to connect to the database:', error.message);
    }
})();

db.sequelize = sequelize;

console.log('Database connection has been established succesfully');

fs.readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        db[file.split('.')[0]] = require("./" + file)(sequelize, Sequelize);
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
})
db.sequelize = sequelize;

module.exports = db;
