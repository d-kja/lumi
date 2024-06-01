/*
 * KEEPING THE BUSINESS RULES SEPARATE FROM THE OTHER FILES
 */

export const electricalEnergyConsumption = ({
	energyScee,
	electricalEnergy,
}: ElectricalEnergyConsumptionRequest) => energyScee + electricalEnergy;
export const totalPriceWithoutGD = ({
	energySceePrice,
	electricalEnergyPrice,
}: TotalPriceWithoutGDRequest) => energySceePrice + electricalEnergyPrice;

type ElectricalEnergyConsumptionRequest = {
	energyScee: number;
	electricalEnergy: number;
};

type TotalPriceWithoutGDRequest = {
	electricalEnergyPrice: number;
	energySceePrice: number;
};
