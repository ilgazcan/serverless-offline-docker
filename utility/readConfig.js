const fs = require("fs");
const parser = require("yaml");

const reader = yml => parser.parse(yml, 'utf-8');

module.exports = pathToYml => {
    const readYml = () => fs.readFileSync(pathToYml, 'utf-8');
    const ymlFile = readYml();
    const parsedYml = reader(ymlFile);
    const fns = [];

    Object.values(parsedYml.functions).forEach(val => {
        fns.push({
            name: val.handler,
            endpoint: val.events[0].http.path
        })
    });
    return fns;
};

