// // // 当你的 module.exports 没有任何定义时，Creator 会自动优先将 exports 设置为脚本中定义的 Component。
// 如果脚本没定义 Component 但是定义了别的类型的 CCClass，则自动把 exports 设为定义的 CCClass。
var common = {
    REQ_Login: 1,
    RES_Login: 2,
    // REQ_LOGIN_WECHAT = 3;
    // REQ_LOGOUT = 4;

    // REQ_HALL_ROOM_RECORD = 11;
    // RES_HALL_ROOM_RECORD = 12;
    // REQ_HALL_GAME_PROGRESS = 13;
    // RES_HALL_GAME_PROGRESS = 14;
    // REQ_HALL_RECORD_DETAIL = 15;
    // RES_HALL_RECORD_DETAIL = 16;
    // REQ_HALL_EVENT = 17;
    // RES_HALL_EVENT = 18;
    // REQ_HALL_GAME_CONFIG = 19;
    // RES_HALL_GAME_CONFIG = 20;

    // REQ_HALL_MATCH = 21;
    // RES_HALL_MATCH = 22;
    // // 房间操作
    // REQ_HALL_CREATE_ROOM = 23;
    // RES_HALL_CREATE_ROOM = 24;
    // REQ_HALL_JOIN_ROOM = 25;
    // RES_HALL_JOIN_ROOM = 26;
    // ReqCreateRoom = 1101;

    // // 房主可以开始游戏
    // public static RES_ROOM_OWNER_OPENING = 100;
    // public static REQ_ROOM_READY = 101;
    // public static RES_ROOM_READY = 102;
    // public static RES_ROOM_USER_JOIN = 104;
    // /// 用户离开
    // public static REQ_ROOM_LEAVE = 105;
    // public static RES_ROOM_USER_LEAVE = 106;
    // /// 解散房间
    // public static RES_ROOM_NO_START_DISMISS = 108;
    // public static REQ_ROOM_MESSAGE_CHAT = 109;
    // public static RES_ROOM_MESSAGE_CHAT = 110;
    // public static REQ_ROOM_EMOTION_CHAT = 111;
    // public static RES_ROOM_EMOTION_CHAT = 112;
    // public static REQ_ROOM_QUICK_CHAT = 113;
    // public static RES_ROOM_QUICK_CHAT = 114;
    // public static REQ_ROOM_BILL = 115;
    // public static RES_ROOM_BILL = 116;
    // // 房卡消耗完了
    // public static RES_ROOM_ROUND_LACK = 118;
    // public static RES_ROOM_KICK_OUT = 120;
    // public static REQ_ROOM_RANK = 121;
    // public static RES_ROOM_RANK = 122;
    // public static REQ_ROOM_COUNTDOWN_START = 123;
    // public static RES_ROOM_COUNTDOWN_START = 124;
    // public static REQ_ROOM_START_DISMISS = 125;
    // public static RES_ROOM_START_DISMISS = 126;
    // public static REQ_ROOM_DISMISS = 127;
    // public static RES_ROOM_DISMISS = 128;
    // public static RES_ROOM_DISMISS_OK = 130;
    // public static RES_ROOM_CURRENT_ROUND = 132;
    // public static REQ_NEXT_ROUND_DISMISS = 133;

    // public static RES_FRIEND_ROOM_SYNC = 200;
    // public static RES_COMMON_ROOM_SYNC = 201;

    // public static REQ_ROOM_SYNC = 202;
    // public static REQ_GAME_SYNC = 203;
    load: function () {
        // ...
    }
};
common.load();

module.exports = common;