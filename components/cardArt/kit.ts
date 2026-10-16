import type { ReactElement } from "react";

/**
 * A card motif is a small line illustration drawn in a 100 × 100 box.
 * Use only these classes so every motif follows the theme and the card's accent:
 *   a-ln  ink line         a-ac  accent line       a-gd  gold line
 *   a-sf  soft accent fill a-sg  soft gold fill    a-si  soft ink fill
 *   a-fa  solid accent     a-fg  solid gold        a-fi  solid ink
 *   a-bg  card background (to mask lines behind a shape)
 *   thin  thinner stroke   dash  dashed stroke
 */
export type Motif = () => ReactElement;
