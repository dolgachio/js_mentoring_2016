'use strict';

var proxyquire = require('proxyquireify')(require);

var typeCheckerMock = {
   isFunction: sinon.stub().returns(true),
   isString: sinon.stub().returns(true)
};

var Dispatcher = proxyquire('../modules/dispatcher.factory.js', {
   '../utils/typeChecker.js' : typeCheckerMock
});

var sut;
var testCallback;

describe('Dispatcher', function () {
   it('constructor should be a function', function () {
      var contructorType = typeof Dispatcher;

      contructorType.should.equal('function');
   });

   describe('constructor instance', function () {
      beforeEach(function () {
         sut = new Dispatcher();
         testCallback = sinon.stub();
      });

      it('should be able to register actions listeners', function () {
         var registerType = typeof sut.register;

         registerType.should.equal('function');
      });

      it('should be able to dispatch', function () {
         var dispatchType = typeof sut.dispatch;

         dispatchType.should.equal('function');
      });

      it('should be able to handle action', function () {
         var handleActionType = typeof sut.dispatch;

         handleActionType.should.equal('function');
      });

      it('should have property with callbacks set', function () {
         var isCallbacksSet = Array.isArray(sut._storesCallbacks);

         isCallbacksSet.should.be.true;
      });

      describe('will register callbacks', function () {
         context('when call register with "function" type parameter', function () {
            it('should add callback to callbacks set', function () {
               typeCheckerMock.isFunction.returns(true);
               sut.register(testCallback);

               var callbacks = sut._storesCallbacks || [];
               var isCallbackAdded = callbacks.some(function (cb) {
                  return cb === testCallback;
               });

               isCallbackAdded.should.be.true;
            });
         });

         context('when call register with not function type parameter', function () {
            var expectedErrorMsg;

            it('should throw expected error', function () {
               typeCheckerMock.isFunction.returns(false);

               expectedErrorMsg = '[dispatcher:register] You should provide a store that has an `update` method.';

               expect(sut.register.bind(sut, 'test')).to.throw(Error, expectedErrorMsg);
            });
         });
      });

      describe('will dispatch actions', function () {
         beforeEach(function () {
            typeCheckerMock.isFunction.returns(true);
            sut.register(testCallback);
         });

         it('should call all callbacks with expected value', function () {
            var payload = {};

            sut.dispatch(payload);

            testCallback.calledWith(payload).should.be.ok;
         });
      });

      describe('will handle actions', function () {
         context('when try to handle with not string type parameter', function () {
            var expectedErrorMsg;

            beforeEach(function () {
               typeCheckerMock.isString.returns(false);
               expectedErrorMsg = '[dispatcher:register] cannot create handler for action';
            });

            it('should throw error with expected error', function () {
               expect(sut.handleAction.bind(sut, undefined)).to.throw(Error, expectedErrorMsg);
            });
         });

         context('when try to handle with string type parameter', function () {
            var expectedActionHandler;
            var actionType;

            beforeEach(function () {
               actionType = 'test';
               typeCheckerMock.isString.returns(true);
               sut.dispatch = testCallback;

               expectedActionHandler = sut.handleAction(actionType);
            });

            it('handler should be a function', function () {
               (typeof expectedActionHandler).should.equal('function');
            });

            it('should dispatch proper action', function () {
               var payload = {};

               expectedActionHandler(payload);
               testCallback.calledWith({action: actionType, payload: payload})
                   .should.be.ok;
            });
         });
      });
   });
});