// preset before starting RTC
const PreSetting = {};
import rtcCommon from './common';
PreSetting.init = () =>{
    // populate userId/roomId
    $('#userId').val('user_' + parseInt(Math.random() * 100000000));
    $('#roomId').val(parseInt(Math.random() * 100000));
    const roomId = PreSetting.query('roomId');
    const userId = PreSetting.query('userId');
    if (roomId) {
      $('#roomId').val(roomId);
    }
    if (userId) {
      $('#userId').val(userId);
    }

    $('.main-video-btns').addClass('noshow');
    $('.mask_video').addClass('noshow');
    rtcCommon.setBtnClickFuc();
  };

PreSetting.query = (name)=> {
    const match = window.location.search.match(new RegExp('(\\?|&)' + name + '=([^&]*)(&|$)'));
    return !match ? '' : decodeURIComponent(match[2]);
  };

PreSetting.login = (share, callback) => {
    let userId = $('#userId').val();
    if (share) {
      userId = 'share_' + userId;
    }
    const config = genTestUserSig(userId);
    const sdkAppId = config.sdkAppId;
    const userSig = config.userSig;
    const roomId = $('#roomId').val();

    callback({
      sdkAppId,
      userId,
      userSig,
      roomId
    });
  };
export default PreSetting;