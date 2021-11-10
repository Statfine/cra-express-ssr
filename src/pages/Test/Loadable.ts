/**
 *
 * Asynchronously loads the component for Test
 *
 */

import { lazyLoad } from 'utils/loadable';

export const Test = lazyLoad(
  () => import('./index'),
  module => module.Test,
);
