const EXP = {};
import KFK from './console';

EXP.avatarMouseOver = (event)=>{
    let target = $(event.target);
    if(target.hasClass("avatarimg")){
        target = target.parent();
    }
    target.addClass('avatar-active');
}



EXP.avatarMouseOut = (event)=>{
    let target = $(event.target);
    if(target.hasClass("avatarimg")){
        target = target.parent();
    }
    target.removeClass('avatar-active');
}

EXP.setProfileAvatar = function (event, avatar) {
    let target = $(event.target);
    if(target.hasClass("avatarimg")){
        target = target.parent();
    }
    $('.avatar-selected').removeClass('avatar-selected');
    target.addClass('avatar-selected');
    let profile = KFK.APP.model.profileToSet;
    profile.avatar = avatar;
    KFK.setAppData("model", "profileToSet", profile);
  };

export default EXP;