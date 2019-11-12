import fs from "fs";

import yargs from "yargs";
import { ApolloServer } from "apollo-server";

import * as libvirt from "@vmngr/libvirt";

import { IConfig } from "./config";
import { IContext } from "./context";
import { typeDefs } from "./schema";
import { Resolver } from "./resolver";

function parseArgv() {
    return yargs.options({
        configFile: { type: "string", default: "vmngr.json" },
    }).argv;
}

function readConfig(configFile: string) {
    if (!fs.existsSync(configFile))
        throw new Error(`Config file "${configFile} not found.`);
    return JSON.parse(fs.readFileSync(configFile, { encoding: "utf8" }));
}

(async function() {

    const argv = parseArgv();
    const config: IConfig = readConfig(argv.configFile);

    const context: IContext = {
        hypervisors: config.hypervisors.map((uri) =>
            new libvirt.Hypervisor({ uri }))
    };

    await Promise.all(context.hypervisors.map(
        (hypervisor) => hypervisor.connectOpen()));

    const resolvers = new Resolver({ config, context }).resolvers;
    const server = new ApolloServer({ typeDefs, resolvers });
    await server.listen();

    console.log("server started ✅")

})();
