import ReactOnRails from 'react-on-rails';

import Tasks from '../bundles/app/components/startup/Tasks';
import Projects from '../bundles/app/components/startup/Projects';
import NewProject from '../bundles/app/components/startup/NewProject';

// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
  Tasks,
  Projects,
  NewProject
});
