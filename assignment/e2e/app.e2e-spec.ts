import { AppPage } from './app.po';

describe('assignment App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateTo();
  });

  it('should display header text', () => {
    expect(page.getHeaderText()).toEqual('CHECK-IN');
  });

  it('should display paragraph text', () => {
    expect(page.getParagraphText()).toContain('You can find your booking');
  });
});
