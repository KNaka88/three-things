import { ThreeThingsPage } from './app.po';

describe('three-things App', () => {
  let page: ThreeThingsPage;

  beforeEach(() => {
    page = new ThreeThingsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
