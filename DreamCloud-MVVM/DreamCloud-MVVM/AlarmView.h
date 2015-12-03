//
//  AlarmView.h
//  DreamCloud
//
//  Created by 张玉龙 on 15/11/14.
//  Copyright © 2015年 soundario. All rights reserved.
//

#import <UIKit/UIKit.h>

@protocol AlarmViewDelegate;

@interface AlarmView : UIView

@property (assign) id <AlarmViewDelegate> delegate;

@property (assign) CGFloat hour;

@property (assign) CGFloat minute;

@property (assign) BOOL isOpen;

- (void)updateTime;

- (void)openClock;

@end

@protocol AlarmViewDelegate <NSObject>

- (void)alarmView:(AlarmView *)aView openClock:(BOOL)isOpen;

- (void)alarmViewSetCLock:(AlarmView *)aView;

@end