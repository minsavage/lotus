package com.soundario.dreamcloud.viewModel;


public class MainViewModel {
    private Audio audio;public Audio getAudio() {
    return audio;
}public void setAudio(Audio audio) {
    this.audio = audio;
}private String currentTime;public String getCurrentTime() {
    return currentTime;
}public void setCurrentTime(String currentTime) {
    this.currentTime = currentTime;
}private Boolean alarmEnabled;public Boolean isAlarmEnabled() {
    return alarmEnabled;
}public void setAlarmEnabled(Boolean alarmEnabled) {
    this.alarmEnabled = alarmEnabled;
}private Integer alarmHour;public Integer getAlarmHour() {
    return alarmHour;
}public void setAlarmHour(Integer alarmHour) {
    this.alarmHour = alarmHour;
}private Integer alarmMinute;public Integer getAlarmMinute() {
    return alarmMinute;
}public void setAlarmMinute(Integer alarmMinute) {
    this.alarmMinute = alarmMinute;
}private Boolean lastAlarmTimeExist;public Boolean isLastAlarmTimeExist() {
    return lastAlarmTimeExist;
}public void setLastAlarmTimeExist(Boolean lastAlarmTimeExist) {
    this.lastAlarmTimeExist = lastAlarmTimeExist;
}private Integer playerStatus;public Integer getPlayerStatus() {
    return playerStatus;
}public void setPlayerStatus(Integer playerStatus) {
    this.playerStatus = playerStatus;
}private Boolean localAudioFileExist;public Boolean isLocalAudioFileExist() {
    return localAudioFileExist;
}public void setLocalAudioFileExist(Boolean localAudioFileExist) {
    this.localAudioFileExist = localAudioFileExist;
}
}