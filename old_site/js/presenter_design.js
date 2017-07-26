$(document).ready(function() {

  // define variables in the pageData namespace
  var pageData = {};

  // sets data on page change
  function pageSet(page) {

      // resets the step
      pageData.curPage = page;

      // stores the current page's object data from pages.json
      pageData.activePage = designPages[page];

      // sets total pages
      function count(obj) {
          var count = 0;
          for (page in obj) {
              count++;
          }
          return count;
      };

      pageData.totalPages = count(designPages);

      // sets page_title
      pageData.page_title = pageData.activePage.title;

      // sets page_summary
      pageData.page_summary = pageData.activePage.summary;

      // sets page_steps
      pageData.page_steps = pageData.activePage.steps;

      // sets page leftPane
      pageData.left_content = pageData.activePage.left_content;

      // sets page leftPane
      pageData.right_content = pageData.activePage.right_content;

      // sets body leftPane
      pageData.body_content = pageData.activePage.body_content;

      pageData.prevPage = designPages[pageData.curPage - 1];

      pageData.nextPage = designPages[pageData.curPage + 1];

    }; // end pageSet()

  function prevPage() {
      if (undefined !== pageData.prevPage) {
        return '« ' + pageData.prevPage.title;
      } else {
        return ('« ' + 'Back to Demo').link('/cyclemap.php');
      }
    };

  function nextPage() {
    if (undefined !== pageData.nextPage) {
      return pageData.nextPage.title + ' »';
    } else {
        return ('Home' + ' »').link('/index.php');
      }
  };


  // change DOM content; fade current out, change its text, fade new in
  function change(target, result) {
      $(target).fadeOut(200, function() {
          $(target).text(result);
          $(target).fadeIn(250);
      });
  } // end change()

  function fillDiv(target, result) {
    $(target).fadeOut(200, function() {
      $(target).html(result);
      $(target).fadeIn(200);
    });
  }

  // change the DOM to reflect new data
  function changePage(page) {

      pageSet(page);


      change('#title', pageData.page_title);
      change('#summary', pageData.page_summary);

      fillDiv('#prevPage', prevPage());

      change('#nextPage', nextPage());
      fillDiv('#body_content', pageData.body_content);

  } // end changePage()

  // Buttons and Interactive Elements

  // prev page button
  $('#prevPage').on('click', function() {
      changePage(pageData.curPage - 1);
      this.blur();
  }); // end prev page

  // next page button
  $('#nextPage').on('click', function() {
      changePage(pageData.curPage + 1);
      this.blur();
  }); // end nextpage

changePage(0);

});
