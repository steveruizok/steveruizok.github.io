$(document).ready(function() {

  // define variables in the pageData namespace
  var pageData = {};

  pageData.curPage = 0; // the current page
  pageData.curStep = 0; // the current step
  pageData.steps = 0; // the number of steps on this page


  // sets data on page change
  function pageSet(page) {

      // resets the step
      pageData.curPage = page;
      pageData.curStep = 0;

      // stores the current page's object data from pages.json
      pageData.activePage = pages[page];

      pageData.curStepObj = function() {
          return eval('pages[page].steps.a' + pageData.curStep);
      };

      // sets total pages
      pageData.totalPages = function() {
          var count = 0;
          for (page in pages) {
              count++;
          }
          return count;
      };

      // sets project_title
      pageData.project_title = project.name;

      // sets page_title
      pageData.page_title = pageData.activePage.title;

      // sets page_summary
      pageData.page_summary = pageData.activePage.summary;

      // sets page_steps
      pageData.page_steps = pageData.activePage.steps;

      // sets prev_page_title
      pageData.prev_page_title = function() {
          if (pageData.curPage > 0) {
              return '« ' + pages[pageData.curPage - 1].title;
          } else {
              return ('« ' + 'Home').link('/index.php');
          }
      };

      // sets next_page_title
      pageData.next_page_title = function() {
          if (pageData.curPage < (pageData.totalPages() - 1)) {
              return pages[pageData.curPage + 1].title + ' »';
          } else {
              return ('Design Process' + ' »').link('/cyclemapdesign.php');
          }
      };

      change('#prevPage', pageData.prev_page_title());
      change('#nextPage', pageData.next_page_title());

  } // end pageSet()


  // plays current video
  function playVideo() {
      $('.bottom-fixer').css('opacity', 0);
      var video = $('#prototype');
      var newVideo = eval('pages[pageData.curPage].steps.a' + pageData.curStep +
          '.v');
      $(video).attr('src', newVideo);
      video[0].load();
      $('.left-fixer').height($('.main').height());
      $('.bottom-fixer').css('opacity', 1);
  }



  // change the DOM to reflect new data
  function changePage(page) {

      pageSet(page);

      change('#title', pageData.page_title);
      change('#summary', pageData.page_summary);
      fillDiv('#prevPage', pageData.prev_page_title());
      fillDiv('#nextPage', pageData.next_page_title());
      // change('#nextPage', pageData.next_page_title());

      // fades out body
      $('#body').fadeOut(200, function() {
        $(this).remove();
          });

      // fades out existing steps
      $('#steps').children().each(function() {
          $(this).fadeOut(200, function() {
              $(this).remove();
          });
      });

       setTimeout(function() {
      // fades in new body
        $('#body').append(designPages[0].body);

      // fades in new steps
          pageData.steps = 0;
          $.each(pageData.page_steps, function(index, step) {
              $('#steps').append('<p class="userFlowStep">' + step.p + '</p>');
          });
          setSteps();
          setStep();
      }, 250);

  } // end changePage()


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

  // sets steps and click events for steps
  function setSteps() {

      // Loop for all paragraphs with class .userFlowStep and adds to array
      $('.userFlowStep').each(function(index, element) {
          this.step = pageData.steps;
          thiss = $(this);
          thiss.css('cursor', 'pointer');

          // paragraph click function
          thiss.click(function() {
              if (pageData.curStep == this.step) {} else {
                  pageData.curStep = this.step;
                  setStep();
              }
          });

          // add replay button
          thiss.append(icons.replay);

          // replay button click event
          $(thiss.children('.play')).click(function() {
              video = document.getElementById('prototype');
              video.pause();
              video.currentTime = 0;
              video.play();

          }); // end click

          pageData.steps++;

      }); // end each .userFlowStep
      var $demo = $('.demo');
      var $steps = $('.steps');
      $demo.height($steps.height());
      sizer();
  } // end setSteps()



  // changes the appearance of steps depending on current step
  function setStep() {
      $('.userFlowStep').each(function() {
          step = $(this);
          play = $(this).children('.play');
          if (this.step == pageData.curStep) {
              step.animate({ // fades in the paragraphs
                  opacity: 1
              }, 400);
              step.off('mouseenter mouseleave');
              play.animate({ // fades in the replay button
                  opacity: 1
              }, 400);
          } else {
              step.animate({ // fades out the paragraphs
                  opacity: 0.25
              }, 400);
              step.hover(function() {
                  $(this).animate({ opacity: .6 }, 150);
              }, function() {
                  $(this).stop(true, true).animate({ opacity: .3 }, 250);
              });
              play.animate({ // hides the replay button
                  opacity: 0
              }, 400);
          }
      }); // end loop


      playVideo();
  }



  // Buttons and Interactive Elements

  // prev page button
  $('#prevPage').on('click', function() {
      var prevPage = pageData.curPage - 1;
      if (prevPage >= 0) {
          changePage(prevPage);
      } else {}
      this.blur();
  }); // end prev page

  // next page button
  $('#nextPage').on('click', function() {
      var nextPage = pageData.curPage + 1;
      if (nextPage < pageData.totalPages()) {
          changePage(nextPage);
      } else {

      }
      this.blur();
  }); // end nextpage

  $('#steps').fadeTo('fast', 1, function() {});

  changePage(0);

  // sizer

  function sizer() {
      $('.left-fixer').height($('#steps').height());
  }

  $window = $(window);
  $window.resize(function() {
      leftFixer = $('.left-fixer');
      main = $('.main');
      leftFixer.height(main.height());
  });

  $window.trigger('resize');
});
