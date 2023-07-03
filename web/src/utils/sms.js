export function sendSms(phone, message, successCallback, failCallback) {
  if (!window.sms) {
    return;
  }
  const sms = window.sms;
  const device = window.device;

  if (device.platform === 'Android') {
    sms.hasPermission(
      hasPermission => {
        console.log(123, '123');
        if (hasPermission) {
          send(phone, message, successCallback, failCallback);
        } else {
          sms.requestPermission(
            function () {
              console.log('[OK] Permission accepted');
              send(phone, message, successCallback, failCallback);
            },
            function (error) {
              failCallback();
              console.info('[WARN] Permission not accepted', error);
              // Handle permission not accepted
            }
          );
        }
      },
      e => {
        console.log('Something went wrong:' + e);
      }
    );
  }
  if (device.platform === 'iOS') {
    send(phone, message, successCallback, failCallback);
  }
}

export function send(phone, message, successCallback, failCallback) {
  //CONFIGURATION
  var options = {
    replaceLineBreaks: false, // true to replace \n by a new line, false by default
    // android: {
    //   intent: 'INTENT', // send SMS with the native android SMS messaging
    //   //intent: '' // send SMS without opening any other app, require : android.permission.SEND_SMS and android.permission.READ_PHONE_STATE
    // },
  };

  var success = function () {
    successCallback();
  };
  var error = function (e) {
    failCallback();
  };

  window.sms.send(phone, message, options, success, error);
}
