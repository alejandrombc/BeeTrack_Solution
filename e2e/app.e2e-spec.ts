import { BeetrackTestPage } from './app.po';

describe('beetrack-test App', function() {
  let page: BeetrackTestPage;

  beforeEach(() => {
    page = new BeetrackTestPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
