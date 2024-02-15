enum PriceModifier {
  AVG,
  MIN,
  MAX,
}

function convertToPriceModifierEnum(modifier: string): PriceModifier {
  const PriceModifierValue = PriceModifier[modifier as keyof typeof PriceModifier];
  return PriceModifierValue || PriceModifier.AVG;
}

export function modifyPrice(lowPrice: number, highPrice: number, modifier: string) {
  const priceModifier = convertToPriceModifierEnum(modifier);
  if (priceModifier === PriceModifier.MIN) return lowPrice
  else if (priceModifier === PriceModifier.MAX) return highPrice
  else return (lowPrice + highPrice) / 2
}