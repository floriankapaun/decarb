import DomainHostingEmissionService from './DomainHostingEmissionService';
import PrismaService from './PrismaService';

class EmissionService {
    // TODO: Move somewhere else and have a look inside DomainService.aggregateDomainEmissions
    // which could potentially be moved as well.
    async getEmissionKilograms(domainId, from, until) {
        let sqlFrom;
        let sqlUntil;

        if (from) sqlFrom = getTimestampString(from);
        if (until) sqlUntil = getTimestampString(until);

        const domainEmissionMilligrams = await DomainService.aggregateDomainEmissions(
            domainId,
            sqlFrom,
            sqlUntil
        );
        if (!domainEmissionMilligrams) return 0;
        return Math.ceil(domainEmissionMilligrams / 1000000);
    }

    getTransferredBytes(bytes, uncached = true) {
        // TODO: Refactor. Var from Website Carbon Calculator
        const PERCENTAGE_OF_DATA_LOADED_ON_SUBSEQUENT_LOAD = 0.02;
        if (!uncached) return bytes * PERCENTAGE_OF_DATA_LOADED_ON_SUBSEQUENT_LOAD
        return bytes;
    }

    getEnergyByBytes(bytes, connectionType, windowWidth, windowHeight) {
        // TODO: Refactor. Var from Website Carbon Calculator
        const KWH_PER_GB = 1.805; // Article suggests its 0.015 (https://www.datacenterknowledge.com/energy/how-much-netflix-really-contributing-climate-change)
        const energy = bytes * (KWH_PER_GB / 1073741274); // GB to Byte (https://www.flightpedia.org/convert/1073741274-bytes-to-gigabytes.html)
        // TODO: Multiply by connectionType and windowWidth
        return energy;
    }

    getCo2e(energy, renewable) {
        // TODO: Refactor. Var from Website Carbon Calculator
        const CARBON_PER_KWH_GRID = 475;
        if (!renewable) return energy * CARBON_PER_KWH_GRID

        const CARBON_PER_KWH_RENEWABLE = 33.4;
        const PERCENTAGE_OF_ENERGY_IN_DATACENTER = 0.1008;
        const PERCENTAGE_OF_ENERGY_IN_TRANSMISSION_AND_END_USER = 0.8992;
        return (($energy * PERCENTAGE_OF_ENERGY_IN_DATACENTER) * CARBON_PER_KWH_RENEWABLE) + (($energy * PERCENTAGE_OF_ENERGY_IN_TRANSMISSION_AND_END_USER) * CARBON_PER_KWH_GRID);
    }

    async getAggregatedEmissions(domainId, timeStart, timeEnd) {

        const hostingEmissions = await DomainHostingEmissionService.getCurrent(domainId);

        const pageViews = await PrismaService.findMany('pageView', {
            select: {
                windowWidth: true,
                windowHeight: true,
                connectionType: true,
                uncachedVisit: true,
                pageViewEmission: {
                    select: {
                        byte: true,
                    },
                },
            },
            where: {
                page: {
                    domainId: { equals: domainId },
                },
                createdAt: {
                    gte: new Date(timeStart),
                    lt: new Date(timeEnd),
                },
            },
        });

        let aggregatedEnergy = 0;
        for (const pageView of pageViews) {
            const {
                uncachedVisit,
                windowWidth,
                windowHeight,
                connectionType,
                pageViewEmission,
            } = pageView;
            const { byte } = pageViewEmission;
            // TODO: Sollte mit abgespeichert werden im PageView, weil sich die Konfig Werte vielleicht mit der Zeit und mit neuen Erkenntnisen verändern könnten und das dann rückwirkend alle daten zerstören würde...
            const transferredBytes = this.getTransferredBytes(byte, uncachedVisit);
            const energyByBytes = this.getEnergyByBytes(transferredBytes, connectionType, windowWidth, windowHeight);
            aggregatedEnergy += energyByBytes;
        }
        const co2eGrams = this.getCo2e(aggregatedEnergy, hostingEmissions.renewableEnergy)

        // TODO: Fix unit and adapt Client side (currently mg)
        return co2eGrams
    }

    // For PageViewEmissions
    // 1. Hit Pagespeed API
    // 2. Calculate transferred bytes
    // For loop on $results['pagespeedapi']->lighthouseResult->audits->{'network-requests'}->details->items   
    // $item->transferSize
    // 3. Calculate Stats by transferred bytes

}

export default new EmissionService();
