angular.module('app').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/add.html',
    "<div class=\"container\">\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-md-4\"></div>\n" +
    "        <div class=\"col-md-4\">\n" +
    "            <br/>\n" +
    "            <h4>Add One</h4>\n" +
    "            <form role=\"form\">\n" +
    "                <div class=\"form-group\">\n" +
    "                    <input ng-model=\"email\" type=\"email\" class=\"form-control\" placeholder=\"Email\">\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <input ng-model=\"password\" type=\"password\" class=\"form-control\" placeholder=\"Password\">\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <input ng-model=\"imapServer\" type=\"text\" class=\"form-control\" placeholder=\"IMAP Server\">\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <input ng-model=\"imapPort\" type=\"text\" class=\"form-control\" placeholder=\"IMAP Port\">\n" +
    "                </div>\n" +
    "            </form>\n" +
    "            <button ng-disabled=\"db\" class=\"btn btn-default\" ng-click=\"add()\">{{button}}</button>\n" +
    "        </div>\n" +
    "        <div class=\"col-md-4\"></div>\n" +
    "    </div>\n" +
    "</div>\n"
  );


  $templateCache.put('templates/error.html',
    "<div class=\"container\">\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-md-2\"></div>\n" +
    "        <div class=\"col-md-8\">\n" +
    "            <br/>\n" +
    "            <p class=\"bg-danger\" ng-repeat=\"m in message\">[{{m.time}}] {{m.email}} : {{m.message}}</p>\n" +
    "            <p ng-if=\"ok\" class=\"bg-success\">Great!</p>\n" +
    "        </div>\n" +
    "        <div class=\"col-md-2\"></div>\n" +
    "    </div>\n" +
    "</div>\n"
  );


  $templateCache.put('templates/example.html',
    "<div class=\"container\">\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-md-4\"></div>\n" +
    "        <div class=\"col-md-4\">\n" +
    "            <br/>\n" +
    "            <h4>Gmail</h4>\n" +
    "            <form role=\"form\">\n" +
    "                <div class=\"form-group\">\n" +
    "                    <input disabled=\"disabled\" type=\"email\" class=\"form-control\" value=\"example@gmail.com\">\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <input disabled=\"disabled\" type=\"text\" class=\"form-control\" value=\"Your Password\">\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <input disabled=\"disabled\" type=\"text\" class=\"form-control\" value=\"imap.gmail.com\">\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <input disabled=\"disabled\" type=\"text\" class=\"form-control\" value=\"993\">\n" +
    "                </div>\n" +
    "            </form>\n" +
    "            <hr/>\n" +
    "            <h4>Yahoo Mail</h4>\n" +
    "            <form role=\"form\">\n" +
    "                <div class=\"form-group\">\n" +
    "                    <input disabled=\"disabled\" type=\"email\" class=\"form-control\" value=\"example@yahoo.com\">\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <input disabled=\"disabled\" type=\"text\" class=\"form-control\" value=\"Your Password\">\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <input disabled=\"disabled\" type=\"text\" class=\"form-control\" value=\"imap.mail.yahoo.com\">\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <input disabled=\"disabled\" type=\"text\" class=\"form-control\" value=\"993\">\n" +
    "                </div>\n" +
    "            </form>\n" +
    "            <hr/>\n" +
    "            <h4>163</h4>\n" +
    "            <form role=\"form\">\n" +
    "                <div class=\"form-group\">\n" +
    "                    <input disabled=\"disabled\" type=\"email\" class=\"form-control\" value=\"example@163.com\">\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <input disabled=\"disabled\" type=\"text\" class=\"form-control\" value=\"Your Password\">\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <input disabled=\"disabled\" type=\"text\" class=\"form-control\" value=\"imap.163.com\">\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <input disabled=\"disabled\" type=\"text\" class=\"form-control\" value=\"993 or 143\">\n" +
    "                </div>\n" +
    "            </form>\n" +
    "        </div>\n" +
    "        <div class=\"col-md-4\"></div>\n" +
    "    </div>\n" +
    "</div>\n"
  );


  $templateCache.put('templates/footer.html',
    "<div class=\"container\">\n" +
    "    <hr/>\n" +
    "    <div>\n" +
    "    <p class=\"text-muted\">\n" +
    "        &copy;{{year}} <a href=\"http://wwww.txthinking.com\">TxThinking<a/>\n" +
    "        <a class=\"pull-right\" href=\"https://github.com/txthinking/mail-checker\">Open Source</a>\n" +
    "    </p>\n" +
    "    </div>\n" +
    "</div>\n"
  );


  $templateCache.put('templates/header.html',
    "<div class=\"container\">\n" +
    "    <ul class=\"nav nav-tabs nav-justified\">\n" +
    "        <li class=\"{{onManage}}\"><a href=\"/manage\" ><strong>Manage</strong></a></li>\n" +
    "        <li class=\"{{onAdd}}\"><a href=\"/add\" ><strong>Add One</strong></a></li>\n" +
    "        <li class=\"{{onExample}}\"><a href=\"/example\"><strong>Example</strong></a></li>\n" +
    "        <li class=\"{{onError}}\"><a href=\"/error\"><strong>Error Message</strong></a></li>\n" +
    "    </ul>\n" +
    "</div>\n"
  );


  $templateCache.put('templates/manage.html',
    "<div class=\"container\">\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-md-4\"></div>\n" +
    "        <div class=\"col-md-4\">\n" +
    "            <br/>\n" +
    "            <div ng-repeat=\"a in accounts\">\n" +
    "                <h4>[{{a.email}}] <a href=\"javascript:void(0);\" ng-click=\"remove(a.email)\"><small class=\"pull-right\">Remove</small></a></h4>\n" +
    "                <form role=\"form\">\n" +
    "                    <div class=\"form-group\">\n" +
    "                        <input disabled ng-model=\"a.email\" type=\"email\" class=\"form-control\" placeholder=\"Email\">\n" +
    "                    </div>\n" +
    "                    <div class=\"form-group\">\n" +
    "                        <input disabled ng-model=\"a.password\" type=\"password\" class=\"form-control\" placeholder=\"Password\">\n" +
    "                    </div>\n" +
    "                    <div class=\"form-group\">\n" +
    "                        <input disabled ng-model=\"a.imapServer\" type=\"text\" class=\"form-control\" placeholder=\"IMAP Server\">\n" +
    "                    </div>\n" +
    "                    <div class=\"form-group\">\n" +
    "                        <input disabled ng-model=\"a.imapPort\" type=\"text\" class=\"form-control\" placeholder=\"IMAP Port\">\n" +
    "                    </div>\n" +
    "                </form>\n" +
    "                <hr/>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"col-md-4\"></div>\n" +
    "    </div>\n" +
    "</div>\n"
  );

}]);
