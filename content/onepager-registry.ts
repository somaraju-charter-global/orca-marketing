import { supplyChainSupplierOperationsBrief } from "./onepagers/supply-chain-supplier-operations";

export const onePagers = {
  [supplyChainSupplierOperationsBrief.slug]: supplyChainSupplierOperationsBrief,
};

export function getOnePagerBySlug(slug: string) {
  return onePagers[slug as keyof typeof onePagers];
}
