//
//  ViewController.m
//  DreamCloud-MVVM
//
//  Created by danney on 15/12/3.
//  Copyright © 2015年 soundario. All rights reserved.
//

#import <ReactiveCocoa/ReactiveCocoa.h>
#import "ViewController.h"
#import "MainViewModel.h"


@interface ViewController () {
    MainViewModel *_mainViewModel;
}

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    _mainViewModel = [[MainViewModel alloc] init];
    
    [self initEvent];
    
    
    [self bindViewModel];
}

- (void)viewDidAppear:(BOOL)animated {
    [_mainViewModel startTimer];
}

- (void)viewDidDisappear:(BOOL)animated {
    [_mainViewModel stopTimer];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
}

- (void) bindViewModel {
    RAC(self.timeLabel, text) = RACObserve(_mainViewModel, currentTime);
    //RAC(self.alarmSwitcher, hidden) = RACObserve(_mainViewModel, playerStatus);
    
    [RACObserve(_mainViewModel, playerStatus) subscribeNext:^(NSNumber *playerStatus) {
        PlayerStatus status = playerStatus.intValue;
        if(status == PlayerStatusPlaying) {
            [UIView animateWithDuration:.5 animations:^{
                self.alarmSwitcher.alpha = 0;
            }];
        }
        else {
            [UIView animateWithDuration:.5 animations:^{
                self.alarmSwitcher.alpha = 1;
            }];
        }
    }];
}

- (void) initEvent {
    RACSignal *clockViewTouchSignal = [[[self.clockView rac_signalForSelector:@selector(touchesBegan:withEvent:)]
                                        reduceEach:^(NSSet *touchs, UIEvent *event){
                                            return [touchs anyObject];
                                        }] distinctUntilChanged];
    
    
    [clockViewTouchSignal subscribeNext:^(id x) {
        NSLog(@"clock view on touch began, current player status = %lu", _mainViewModel.playerStatus);
        
        if (_mainViewModel.playerStatus == PlayerStatusPlaying) {
            _mainViewModel.playerStatus = PlayerStatusStopped;
        }
        else if (_mainViewModel.playerStatus == PlayerStatusStopped) {
            _mainViewModel.playerStatus = PlayerStatusPlaying;
        }
    }];
}

@end