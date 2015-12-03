//
//  MainViewModel.h
//  DreamCloud-MVVM
//
//  Created by danney on 15/12/3.
//  Copyright © 2015年 soundario. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "Audio.h"

typedef NS_ENUM(NSUInteger, PlayerStatus) {
    PlayerStatusStopped = 0,
    PlayerStatusPlaying = 1
};

@interface MainViewModel : NSObject

@property (strong, nonatomic) Audio *audio;

@property (strong, nonatomic) NSString *currentTime;

@property (nonatomic) BOOL isAlarmEnabled;

@property (nonatomic) NSInteger alarmHour;

@property (nonatomic) NSInteger alarmMinute;

@property (nonatomic) BOOL lastAlarmTimeExist;

@property (nonatomic) PlayerStatus playerStatus;

@property (nonatomic) BOOL localAudioFileExist;


- (void) startTimer;

- (void) stopTimer;

@end