import { supplyChainSupplierOperationsBrief } from "./two-pagers/supply-chain-supplier-operations";
import { twoPagerTemplate } from "./two-pagers/two-pager-template";

export const onePagers = {
  [supplyChainSupplierOperationsBrief.slug]: supplyChainSupplierOperationsBrief,
  [twoPagerTemplate.slug]: twoPagerTemplate,
};

export function getOnePagerBySlug(slug: string) {
  return onePagers[slug as keyof typeof onePagers];
}
