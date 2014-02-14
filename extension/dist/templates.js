angular.module('app').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/footer.html',
    "<div class=\"container\">\n" +
    "    <hr/>\n" +
    "    <div>\n" +
    "    <p class=\"text-muted\">\n" +
    "    &copy;{{year}} <a href=\"http://wwww.txthinking.com\">TxThinking<a/> | Open Source<a href=\"https://github.com/txthinking/MailCheckerChromeExtension\">https://github.com/txthinking/MailCheckerChromeExtension</a>\n" +
    "    </p>\n" +
    "    </div>\n" +
    "</div>\n"
  );


  $templateCache.put('templates/header.html',
    "<div class=\"container\">\n" +
    "    <nav class=\"navbar navbar-default\" role=\"navigation\">\n" +
    "        <div class=\"container-fluid\">\n" +
    "            <a class=\"navbar-brand\" href=\"/\">Mail Checker</a>\n" +
    "        </div>\n" +
    "    </nav>\n" +
    "</div>\n"
  );


  $templateCache.put('templates/home.html',
    "<div class=\"container\">\n" +
    "    <ul class=\"nav nav-tabs\">\n" +
    "        <li class=\"active\"><a href=\"#manage\" data-toggle=\"tab\">Manage</a></li>\n" +
    "        <li><a href=\"#example\" data-toggle=\"tab\">Example</a></li>\n" +
    "        <li><a href=\"#error\" data-toggle=\"tab\">Error Message</a></li>\n" +
    "    </ul>\n" +
    "\n" +
    "    <div class=\"tab-content\">\n" +
    "        <div class=\"tab-pane active\" id=\"manage\">...</div>\n" +
    "        <div class=\"tab-pane\" id=\"example\">...</div>\n" +
    "        <div class=\"tab-pane\" id=\"error\">...</div>\n" +
    "    </div>\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-md-6\"></div>\n" +
    "        <div class=\"col-md-6\"></div>\n" +
    "    </div>\n" +
    "</div>\n"
  );

}]);
