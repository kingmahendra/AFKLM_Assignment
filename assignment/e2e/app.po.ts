import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getHeaderText() {
    return element(by.css('app-root .header')).getText();
  }

  getParagraphText() {
    return element(by.css('app-root .description')).getText();
  }
}
