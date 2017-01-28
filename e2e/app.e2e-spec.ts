import { RecipeBox2Page } from './app.po';

describe('recipe-box2 App', function() {
  let page: RecipeBox2Page;

  beforeEach(() => {
    page = new RecipeBox2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
