import { SMSInbox1Page } from './app.po';

describe('smsinbox1 App', function() {
  let page: SMSInbox1Page;

  beforeEach(() => {
    page = new SMSInbox1Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
