export default class CommandCode {
    // 系统命令
    public static SYSTEM_HEART_BEAT_PING = 30000;
    public static SYSTEM_HEART_BEAT_PONG = 30001;

    public static RECONNECT_ROOM = 30002;
    public static NOTICE_RECONNECT = 30003;
    public static NOTICE_DISCONNECT = 30004;

    // 逻辑命令
    public static REQ_LOGIN = 1;
    public static RES_LOGIN = 2;
    public static REQ_LOGIN_WECHAT = 3;
    public static REQ_LOGOUT = 4;

    public static REQ_HALL_ROOM_RECORD = 11;
    public static RES_HALL_ROOM_RECORD = 12;
    public static REQ_HALL_GAME_PROGRESS = 13;
    public static RES_HALL_GAME_PROGRESS = 14;
    public static REQ_HALL_RECORD_DETAIL = 15;
    public static RES_HALL_RECORD_DETAIL = 16;
    public static REQ_HALL_EVENT = 17;
    public static RES_HALL_EVENT = 18;
    public static REQ_HALL_GAME_CONFIG = 19;
    public static RES_HALL_GAME_CONFIG = 20;

    public static REQ_HALL_MATCH = 21;
    public static RES_HALL_MATCH = 22;
    // 房间操作
    public static REQ_HALL_CREATE_ROOM = 23;
    public static RES_HALL_CREATE_ROOM = 24;
    public static REQ_HALL_JOIN_ROOM = 25;
    public static RES_HALL_JOIN_ROOM = 26;
    public static ReqCreateRoom = 1101;

    // 房主可以开始游戏
    public static RES_ROOM_OWNER_OPENING = 100;
    public static REQ_ROOM_READY = 101;
    public static RES_ROOM_READY = 102;
    public static RES_ROOM_USER_JOIN = 104;
    /// 用户离开
    public static REQ_ROOM_LEAVE = 105;
    public static RES_ROOM_USER_LEAVE = 106;
    /// 解散房间
    public static RES_ROOM_NO_START_DISMISS = 108;
    public static REQ_ROOM_MESSAGE_CHAT = 109;
    public static RES_ROOM_MESSAGE_CHAT = 110;
    public static REQ_ROOM_EMOTION_CHAT = 111;
    public static RES_ROOM_EMOTION_CHAT = 112;
    public static REQ_ROOM_QUICK_CHAT = 113;
    public static RES_ROOM_QUICK_CHAT = 114;
    public static REQ_ROOM_BILL = 115;
    public static RES_ROOM_BILL = 116;
    // 房卡消耗完了
    public static RES_ROOM_ROUND_LACK = 118;
    public static RES_ROOM_KICK_OUT = 120;
    public static REQ_ROOM_RANK = 121;
    public static RES_ROOM_RANK = 122;
    public static REQ_ROOM_COUNTDOWN_START = 123;
    public static RES_ROOM_COUNTDOWN_START = 124;
    public static REQ_ROOM_START_DISMISS = 125;
    public static RES_ROOM_START_DISMISS = 126;
    public static REQ_ROOM_DISMISS = 127;
    public static RES_ROOM_DISMISS = 128;
    public static RES_ROOM_DISMISS_OK = 130;
    public static RES_ROOM_CURRENT_ROUND = 132;
    public static REQ_NEXT_ROUND_DISMISS = 133;

    public static RES_FRIEND_ROOM_SYNC = 200;
    public static RES_COMMON_ROOM_SYNC = 201;

    public static REQ_ROOM_SYNC = 202;
    public static REQ_GAME_SYNC = 203;

}