'use strict';

describe('myApp.ecommerce module', function() {

  beforeEach(module('myApp.ecommerce'));

  describe('ecommerce controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var view1Ctrl = $controller('View1Ctrl');
      expect(view1Ctrl).toBeDefined();
    }));

  });
});