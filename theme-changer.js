//! This script ihas the following files companions:
//!  - theme.changer.css
//!  - light-icon.svg
//!  - dark-icon.svg
//!
//!
//! In the head add the css file or include it on another css
//! (replace '_html' with the proper path):
//!  - <link rel="stylesheet" href="_html/theme-changer.css" />
//!  - @import url('theme-changer.css');
//!
//! To use add the following into the body
//! (replace '_html' with the proper path):
//!
//!   <div class="theme-toggle"></div>
//!   <script src="_html/theme-changer.js"></script>
//!
//! @author: Paulo Dias
//! (c) 2022 Paulo Dias
//! https://opensource.org/licenses/MIT

(() => {
  const insertThemeToggleElementsIntoThemeTogleElement = (() => {
    const containerDiv = document.getElementsByClassName('theme-toggle')[0];

    var labelElem = document.createElement('label');
    labelElem.classList.add('theme-toggle-switch');
    labelElem.setAttribute('for', 'theme-toggle-input');

    var checkboxElem = document.createElement('input');
    checkboxElem.setAttribute('type', 'checkbox');
    checkboxElem.id = 'theme-toggle-input';
    checkboxElem.setAttribute('checked', '');

    var toggleCtlElem = document.createElement('div');
    toggleCtlElem.classList.add('theme-toggle-switch__control');

    labelElem.appendChild(checkboxElem);
    labelElem.appendChild(toggleCtlElem);

    containerDiv.appendChild(labelElem);
  })

  insertThemeToggleElementsIntoThemeTogleElement();
  const btn = document.getElementById('theme-toggle-input');

  const osPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  const preferredTheme = localStorage.getItem('theme') || osPreference;

  var currentTheme = preferredTheme;

  const setTheme =
      (theme, persist = true) => {
        const htmlElem = document.documentElement;
        if (theme == 'dark') {
          htmlElem.classList.add('dark');
          htmlElem.classList.remove('light');
          btn.checked = true;
        } else {
          htmlElem.classList.remove('dark');
          htmlElem.classList.add('light');
          btn.checked = false;
        }
        currentTheme = theme;

        if (persist) {
          localStorage.setItem('theme', theme);
        }
      }

  const updateUI = (theme) => {}

  btn.addEventListener('click', function() {
    const htmlElem = document.documentElement;
    if (currentTheme == 'dark') {
      htmlElem.classList.remove('dark');
      htmlElem.classList.add('light');
    } else {
      htmlElem.classList.add('dark');
      htmlElem.classList.remove('light');
    }
    var theme = currentTheme == 'dark' ? 'light' : 'dark';
    currentTheme = theme;
    localStorage.setItem('theme', theme);

    updateUI(theme);
  });

  setTheme(preferredTheme, false);
  updateUI(preferredTheme);
})();
