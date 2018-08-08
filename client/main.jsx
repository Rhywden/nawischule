import { Meteor } from "meteor/meteor";
import React from "react";
import { render } from "react-dom";
import moment from 'moment';
import moment_locale from 'moment/locale/de';

import App from "./UI/App";
import '../common/collections';

moment.updateLocale('de', moment_locale);

Meteor.startup(() => {
  render(<App />,document.getElementById("render-target"));
});