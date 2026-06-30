import { supplyChainSupplierOperationsBrief } from "./two-pagers/supply-chain-supplier-operations";
import { twoPagerTemplate } from "./two-pagers/two-pager-template";
import { facilityServicesManagementBrief } from "./two-pagers/commercial-cleaning-facility-services-execution";

export const onePagers = {
  [supplyChainSupplierOperationsBrief.slug]: supplyChainSupplierOperationsBrief,
  [twoPagerTemplate.slug]: twoPagerTemplate,
  [facilityServicesManagementBrief.slug]: facilityServicesManagementBrief,
};

export function getOnePagerBySlug(slug: string) {
  return onePagers[slug as keyof typeof onePagers];
}
