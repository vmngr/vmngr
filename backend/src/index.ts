import { ApolloServer } from "apollo-server";

import * as libvirt from "@vmngr/libvirt";

import { typeDefs } from "./schema";

const uri = process.env.URI || "qemu:///system";
const hypervisor = new libvirt.Hypervisor({ uri });

(async function() {

    await hypervisor.connectOpen();

    const resolvers = {

        DomainInfo: {
            async state(info: libvirt.DomainInfo) {
                switch (info.state) {
                    case libvirt.DomainState.NOSTATE: return "NOSTATE";
                    case libvirt.DomainState.RUNNING: return "RUNNING";
                    case libvirt.DomainState.BLOCKED: return "BLOCKED";
                    case libvirt.DomainState.PAUSED: return "PAUSED";
                    case libvirt.DomainState.SHUTDOWN: return "SHUTDOWN";
                    case libvirt.DomainState.SHUTOFF: return "SHUTOFF";
                    case libvirt.DomainState.CRASHED: return "CRASHED";
                    case libvirt.DomainState.PMSUSPENDED: return "PMSUSPENDED";
                }
            },
            cpuTime: (info: libvirt.DomainInfo) =>
                info.cpuTime * Math.pow(10, -9),
        },

        Domain: {
            id: async (domain: libvirt.Domain) =>
                await hypervisor.domainGetID(domain),
            name: async (domain: libvirt.Domain) =>
                await hypervisor.domainGetName(domain),
            uuid: async (domain: libvirt.Domain) =>
                await hypervisor.domainGetUUIDString(domain),
            info: async (domain: libvirt.Domain) =>
                await hypervisor.domainGetInfo(domain),
        },

        Query: {
            allDomains: async() => await hypervisor
                .connectListAllDomains(),
        },

    };

    const server = new ApolloServer({ typeDefs, resolvers });
    await server.listen();

    console.log("server started ✅")

})();
