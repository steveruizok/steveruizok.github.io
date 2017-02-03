$(document).ready(function() {

  // Defines current steps

  var pageData = {};

  pageData.curPage = 0;
  pageData.curStep = 0;
  pageData.tempPageName = 'page_1';
  pageData.steps = 0;

  pageData.activePage = function() {
    return pages[pageData.curPage];
  };

  pageData.totalPages = function() {
    var count = 0;
    for (page in pages) { count++; }
    return count;
  };

  pageData.project_title = function() {
    return project.name;
  };

  pageData.page_title = function() {
    return pageData.activePage().title;
  };

  pageData.page_summary = function() {
    return pageData.activePage().summary;
  };

  pageData.page_steps = function() {
    return pageData.activePage().steps;
  };

  pageData.page_step_video = function() {
    return eval('pageData.activePage().steps.a' + pageData.curStep + '.v');
  };

  pageData.prev_page_title = function() {
    if (pageData.curPage > 0) {
      return '« ' + pages[pageData.curPage - 1].title;
    } else {
      return '';
    }
  };

  pageData.next_page_title = function() {
    if (pageData.curPage < (pageData.totalPages() - 1)) {
      return pages[pageData.curPage + 1].title + ' »';
      } else {
      return '';
    }
  };

  console.log(pageData.page_step_video());

  // change page and reset all values
  function changePage(page) {

    pageData.curPage = page;
    pageData.curStep = 0;
    console.log('Current Page: ' + pageData.curPage);
    change('#title', pageData.page_title());
    change('#summary', pageData.page_summary());
    change('#nextPage', pageData.next_page_title());
    change('#prevPage', pageData.prev_page_title());

    // fades out existing steps
    $('#steps0').children().each(function() {
      $(this).fadeOut(200, function() {
        $(this).remove();
      });
    });

    // fades in new steps
    setTimeout(function() {
      pageData.steps = 0;
      showNewSteps();
      setUp();
      setStep();
    }, 250);

  }

  // shows steps for new page
  function showNewSteps() {
     $.each(pageData.page_steps(), function(index, step) {
     $('#steps0').append('<p class="userFlowStep">' + step.p + '</p>');
    }
  )};

  // fades element out, changes its text content, and returns the element
  function change(target, result) {
    $(target).fadeOut(200, function() {
      $(target).text(result);
      $(target).fadeIn(250);
    });
  }

  // next page button
  $('#nextPage').on('click', function() {
    var nextPage = pageData.curPage + 1;
    if (nextPage < pageData.totalPages()) {
      console.log('changing page to ' + nextPage);
      changePage(nextPage);
    } else {
      console.log('we are on the last page');
    }
    this.blur();
  });

  // next page button
  $('#prevPage').on('click', function() {
    var prevPage = pageData.curPage - 1;
    if (prevPage >= 0) {
      console.log('changing page to ' + prevPage);
      changePage(prevPage);
    } else {
      console.log('We are on the first page');
    }
    this.blur();
  });

  // Set links and effects for all steps
  function setUp() {
    // Loop for all paragraphs with class .userFlowStep
    $('.userFlowStep').each(function() {
      curBlock = $(this);
      var s = $(this);
      var c = this.className;

      // Change class names to .userFlowStep0
      this.className = this.className + pageData.steps;
      this.step = pageData.steps;
      // Create variable "target" for related video
      this.target = 'videos/' + pageData.curPage + '_' + pageData.steps +
       '.mp4';
      // Create variable for buttons class name
      this.buttons = '.buttons' + pageData.steps;
      this.playButton = '.play' + pageData.steps;

      // makes the paragraph cause the pointer on hover
      $(this).css('cursor', 'pointer');

      // add a replay button
      s.append(`
        <img class='icon play` + pageData.steps + `' src="images/replay_1.png"
         href='#'/>
        `);

      $(this).click(function() {
        if (pageData.curStep == this.step) {
        } else {
        pageData.curStep = this.step;
        setStep();
        }
      });
      $('.play' + pageData.steps).each(function(index, element) {
        $(this).click(function() {
          video = document.getElementById('prototype');
          video.load();
        });
      });
      // prev button
      $('.prev' + pageData.steps).each(function(index, element) {
        $(this).click(function() {
          if (curStep > 0) {
            curStep--;
            setStep();
          }
        });
      });
      // next button
      $('.next' + pageData.steps).each(function(index, element) {
        $(this).click(function() {
          if (curStep < pageData.steps - 1) {
            curStep++;
            setStep();
          }
        });
      });
      // checks if the step matches the current step
      if (pageData.steps == pageData.curStep) {
        $(this).css('opacity', 1); // sets the current step to opacity 1
        $(this.buttons).css('opacity', 1); // sets the buttons to opacity 1
        $(this.playButton).css('opacity', 1); // hides the other buttons
      } else {
        $(this).css('opacity', 0.3); // dims the other steps
        $(this.playButton).css('opacity', 0); // hides the other buttons
        $(this.buttons).css('opacity', 0); // hides the other buttons

      }

      // Iterate over steps, ending with total number of steps
      pageData.steps++;
    }); // end loop

  } // end setUp()

  // Plays current video
  function playVideo() {
    var video = $('#prototype');
    var newVideo = pageData.page_step_video();
    $(video).attr('src', newVideo);
    video[0].load();
    video[0].play();
  }

  //gets videos height and sets it to prevent resizing on video change


  // Sets the current step opacity
  function setStep() {
    $("[class^='userFlowStep']").each(function() {
      step = $(this);
      b = $(this.buttons);
      c = $(this.playButton);
      if (this.step == pageData.curStep) {
        step.animate({ // fades in the paragraphs
          opacity: 1
        }, 400);
        step.off('mouseenter mouseleave');
        b.animate({ // fades in the buttons
          opacity: 1
        }, 400);
        c.animate({ // fades in the replay button
          opacity: 1
        }, 400);
      } else {
        step.animate({ // fades out the paragraphs
          opacity: 0.25
        }, 400);
        $(this).hover(function() {
          $(this).animate({opacity: .6}, 150);
        }, function() {
          $(this).stop(true, true).animate({opacity: .3}, 250);
        });
        c.animate({ // hides the replay button
          opacity: 0
        }, 400);
        b.animate({ // hides the buttons
          opacity: 0
        }, 250);
      }
    }); // end loop

    playVideo(); // update and play video

  } // end setStep()

  $('#steps0').fadeTo('fast' , 1, function() {
    // Animation complete.
  });

  $('#videos').height($('#prototype').height());


  changePage(0);
});
