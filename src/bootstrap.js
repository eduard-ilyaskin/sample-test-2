import { Hunting } from './lib/hunter';
import { FormHuntingPlugin } from './lib/hunter/plugins';

export function bootstrap(fn) {
  const hunting = new Hunting({ excludes: ['/result'] });
  hunting.registerPlugin(FormHuntingPlugin);
  hunting.start(window.location);

  window.addEventListener('load', () => {
    fn(hunting);
  });
}
