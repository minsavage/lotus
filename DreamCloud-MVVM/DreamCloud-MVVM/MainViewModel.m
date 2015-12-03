//
//  MainViewModel.m
//  DreamCloud-MVVM
//
//  Created by danney on 15/12/3.
//  Copyright © 2015年 soundario. All rights reserved.
//

#import "MainViewModel.h"

@interface MainViewModel() {
    NSTimer *_timer;
}

@end

@implementation MainViewModel

- (void) startTimer {
    _timer = [NSTimer scheduledTimerWithTimeInterval:1 target:self selector:@selector(onTimer) userInfo:nil repeats:YES];
}

- (void) onTimer {
    NSDate *date = [NSDate date];
    NSDateFormatter  *dateFormatter=[[NSDateFormatter alloc] init];
    [dateFormatter setDateFormat:@"HH:mm"];
    self.currentTime = [dateFormatter stringFromDate: date];
}

- (void) stopTimer {
    [_timer invalidate];
    _timer = nil;
}

@end