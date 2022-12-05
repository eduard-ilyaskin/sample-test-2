import { getBrowserInfo, getUserGeolocation } from './utils';

export class Hunting {
  _startTime = null;
  _excludes = [];

  _currentLocation = null;
  _locationTimer = null;

  _metadata = {
    browser: null,
    device: null,
    user: null,
    pages: {},
  };

  constructor({ excludes = [] }) {
    this._excludes = excludes;

    if (localStorage.getItem('hunting-data')) {
      this._metadata = JSON.parse(localStorage.getItem('hunting-data'));
    }

    this._metadata.browser = getBrowserInfo();
    this._metadata.device = navigator.platform;

    getUserGeolocation((data) => {
      this._setMetaData('user', data);
    });
  }

  registerPlugin(Plugin) {
    const plugin = new Plugin({ context: this });
    this[Plugin.name] = plugin;
  }

  start(location) {
    this._startTime = new Date();
    this.setPage(location);
  }

  setPage(location) {
    if (this._locationTimer) {
      clearInterval(this._locationTimer);
    }

    if (this._excludes.includes(location.pathname)) {
      return;
    }

    this._currentLocation = location;
    this._setPageParams(location.pathname, { lastVisit: new Date(), timeSpend: 0 });

    this._locationTimer = setInterval(() => {
      this._onPageTimerChange();
    }, 200);
  }

  getAllMetaData() {
    const browser = this._metadata.browser;
    const device = this._metadata.device;
    const user = this._metadata.user;
    const pages = Object.keys(this._metadata.pages).map((key) => ({
      page: key,
      ...this._metadata.pages[key],
    }));
    return { browser, device, pages, user };
  }

  getLocation() {
    return this._currentLocation;
  }

  getPageData() {
    return this._metadata.pages[this._currentLocation.pathname]?.data ?? {};
  }

  setPageData(data = {}) {
    this._setPageParams(this._currentLocation.pathname, { data });
  }

  _onPageTimerChange() {
    if (!this._currentLocation) {
      return;
    }
    const pathname = this._currentLocation.pathname;
    const time = this._metadata.pages[pathname].timeSpend;
    this._setPageParams(pathname, { timeSpend: time + 200 });
  }

  _setPageParams(pathname, data = {}) {
    const pages = this._metadata.pages;
    const currentParams = pages[pathname] || {};
    this._setMetaData('pages', { ...pages, [pathname]: { ...currentParams, ...data } });
  }

  _setMetaData(key, data) {
    this._metadata[key] = data;
    localStorage.setItem('hunting-data', JSON.stringify(this._metadata));
  }
}
