import * as libvirt from "@vmngr/libvirt";

export interface IContext {

    hypervisors: libvirt.Hypervisor[];

}
