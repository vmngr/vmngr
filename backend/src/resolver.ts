import * as libvirt from "@vmngr/libvirt";

import { IConfig } from "./config";
import { IContext } from "./context";

interface IResolverOptions {
    config: IConfig;
    context: IContext;
}

export class Resolver {

    private config: IConfig;
    private context: IContext;

    public resolvers = {

        /**
         * DomainInfo
         */
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

        /**
         * Domain
         */
        Domain: {

            id: (args: {
                hypervisor: libvirt.Hypervisor,
                domain: libvirt.Domain,
            }) => args.hypervisor.domainGetID(args.domain),

            name: (args: {
                hypervisor: libvirt.Hypervisor,
                domain: libvirt.Domain,
            }) => args.hypervisor.domainGetName(args.domain),

            uuid: (args: {
                hypervisor: libvirt.Hypervisor,
                domain: libvirt.Domain,
            }) => args.hypervisor.domainGetUUIDString(args.domain),

            info: (args: {
                hypervisor: libvirt.Hypervisor,
                domain: libvirt.Domain,
            }) => args.hypervisor.domainGetInfo(args.domain),

        },

        /**
         * Hypervisor
         */
        Hypervisor: {

            hostname: (hypervisor: libvirt.Hypervisor) =>
                hypervisor.connectGetHostname(),

            domains: async (hypervisor: libvirt.Hypervisor) =>
                (await hypervisor.connectListAllDomains())
                    .map((domain) => ({ hypervisor, domain })),

        },

        /**
         * Query
         */
        Query: {

            hypervisors: () => this.context.hypervisors,

        }

    };

    constructor(options: IResolverOptions) {
        this.config = options.config;
        this.context = options.context;
    }

}
