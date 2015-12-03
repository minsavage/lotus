//
//  ClockView.h
//  DreamCloud
//
//  Created by 张玉龙 on 15/11/14.
//  Copyright © 2015年 soundario. All rights reserved.
//

#import <UIKit/UIKit.h>

@protocol ClockViewDelegate;
@interface ClockView : UIView

+ (CGFloat)getClockAngle:(CGFloat)hour minute:(CGFloat)min;

+ (NSDateComponents *)getNowDate;
+ (int)getNowHour;
+ (int)getNowMinute;

@property (assign) id <ClockViewDelegate> delegate;

@property (assign) CGFloat startAngle;

@property (assign) CGFloat stopAngle;

@property (assign) BOOL showTimer;

- (void)clockAppear;

- (void)startAnimation;

- (void)stopAnimation;


@end

@protocol ClockViewDelegate <NSObject>

- (void)clockView:(ClockView *)aView click:(BOOL)isAnimation;

@end